import React, { useState, useEffect } from "react";
import API from "../api";
import AdminLayout from "../pages/AdminDashboard";
import { useNavigate } from "react-router-dom";

interface ServiceItem {
  _id: string;
  title: string;
  description: string;
  type: "main" | "advanced";
  images?: string[]; // URLs stored in DB
}

// Cloudinary config
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload";
const UPLOAD_PRESET = "YOUR_UPLOAD_PRESET";

const AdminServicesCMS: React.FC = () => {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"main" | "advanced">("main");
  const [images, setImages] = useState<File[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);

  // ---------------- Fetch Services ----------------
  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await API.get("/services", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ---------------- Logout ----------------
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  // ---------------- Upload to Cloudinary ----------------
  const uploadToCloudinary = (file: File, idx: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", CLOUDINARY_URL);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setUploadProgress((prev) => {
            const copy = [...prev];
            copy[idx] = Math.round((e.loaded / e.total) * 100);
            return copy;
          });
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const res = JSON.parse(xhr.responseText);
          resolve(res.secure_url);
        } else {
          reject(xhr.statusText);
        }
      };

      xhr.onerror = () => reject("Upload failed");
      xhr.send(formData);
    });
  };

  // ---------------- Add / Update Service ----------------
  const saveService = async () => {
    if (!title || !description) return alert("Fill all fields");

    try {
      let uploadedUrls: string[] = [];

      if (images.length) {
        setUploadProgress(Array(images.length).fill(0));
        uploadedUrls = await Promise.all(images.map(uploadToCloudinary));
      }

      const payload = {
        title,
        description,
        type,
        images: uploadedUrls,
      };

      if (editId) {
        await API.post(`/services/edit/${editId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Service updated!");
      } else {
        await API.post("/services/add", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Service added!");
      }

      // Reset form
      setTitle("");
      setDescription("");
      setType("main");
      setImages([]);
      setEditId(null);
      setUploadProgress([]);
      fetchServices();
    } catch (err) {
      console.error(err);
      alert("Failed to save service");
    }
  };

  // ---------------- Delete ----------------
  const deleteService = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await API.delete(`/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchServices();
    } catch (err) {
      console.error(err);
      alert("Failed to delete service");
    }
  };

  // ---------------- Edit ----------------
  const editService = (s: ServiceItem) => {
    setTitle(s.title);
    setDescription(s.description);
    setType(s.type);
    setEditId(s._id);
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="flex min-h-screen">
      <AdminLayout />
      <div className="p-6 flex-1 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Services CMS</h1>
          <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
        </div>

        {/* ---------------- FORM ---------------- */}
        <section className="mb-8 bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-3 text-lg">{editId ? "Edit Service" : "Add Service"}</h2>

          <input className="w-full mb-3 p-2 border rounded" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
          <textarea className="w-full mb-3 p-2 border rounded" rows={4} value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
          <select className="w-full mb-3 p-2 border rounded" value={type} onChange={e => setType(e.target.value as "main" | "advanced")}>
            <option value="main">Main Service</option>
            <option value="advanced">Advanced Service</option>
          </select>

          <input type="file" multiple onChange={e => e.target.files && setImages(Array.from(e.target.files))} className="mb-3" />

          {/* Preview + Progress */}
          {images.map((img, idx) => (
            <div key={idx} className="flex flex-col mb-2">
              <img src={URL.createObjectURL(img)} alt="preview" className="w-20 h-20 object-cover rounded" />
              {uploadProgress[idx] !== undefined && <progress value={uploadProgress[idx]} max={100} />}
            </div>
          ))}

          <button onClick={saveService} className="px-4 py-2 bg-blue-500 text-white rounded">{editId ? "Update" : "Add"}</button>
        </section>

        {/* ---------------- LIST ---------------- */}
        <section className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-4 text-lg">All Services</h2>
          <div className="space-y-5">
            {services.map(s => (
              <div key={s._id} className="border-b pb-4">
                <div className="flex flex-wrap gap-3 items-center">
                  {s.images?.map((img, i) => (
                    <img key={i} src={img} alt={s.title} className="w-20 h-20 object-cover rounded" />
                  ))}
                </div>
                <div className="mt-2">
                  <h3 className="font-semibold">{s.title} ({s.type})</h3>
                  <p className="text-sm text-gray-600">{s.description}</p>
                </div>
                <div className="flex gap-3 mt-2">
                  <button onClick={() => editService(s)} className="px-3 py-1 bg-yellow-400 text-white rounded">Edit</button>
                  <button onClick={() => deleteService(s._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminServicesCMS;