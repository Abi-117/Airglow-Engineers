// pages/admin/about/AdminAddEditAboutItem.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

const AdminAddEditAboutItem: React.FC = () => {
  const { section, id } = useParams<{ section: string; id?: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  // Common fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [label, setLabel] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  /** If editing, fetch existing item */
  useEffect(() => {
    if (!id) return;
    const fetchItem = async () => {
      try {
        const res = await API.get(`/about/${section}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        if (section === "story") {
          setTitle(data.title || "");
          setDescription(data.description || "");
        } else {
          setValue(data.value || "");
          setLabel(data.label || "");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load item.");
      }
    };
    fetchItem();
  }, [id, section, token]);

  /** Save handler */
  const handleSave = async () => {
    if (!section) return;

    const formData = new FormData();
    if (section === "story") {
      formData.append("title", title);
      formData.append("description", description);
    } else {
      formData.append("value", value);
      formData.append("label", label);
      if (image) formData.append("image", image);
    }

    try {
      setLoading(true);
      if (id) {
        // Edit
        await API.put(`/about/${section}/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
        alert("Item updated successfully!");
      } else {
        // Add
        await API.post(`/about/${section}/add`, formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
        alert("Item added successfully!");
      }
      navigate("/admin/about");
    } catch (err: any) {
      console.error(err.response || err);
      alert("Failed to save item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit" : "Add"} {section === "story" ? "Story" : "Achievement"}
      </h1>

      {section === "story" ? (
        <>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            rows={6}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            onChange={(e) => e.target.files && setImage(e.target.files[0])}
            className="mb-4"
          />
        </>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {loading ? "Saving..." : id ? "Update" : "Add"}
        </button>
        <button
          onClick={() => navigate("/admin/about")}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AdminAddEditAboutItem;
