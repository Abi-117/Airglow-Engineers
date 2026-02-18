// AboutForm.tsx
import { useState, FormEvent, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

const AboutForm: React.FC<{ mode: "add" | "edit" }> = ({ mode }) => {
  const { section, id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [label, setLabel] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (mode === "edit" && id) {
      API.get(`/about/${section}/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          const data = res.data;
          setTitle(data.title || "");
          setDescription(data.description || "");
          setValue(data.value || "");
          setLabel(data.label || "");
          setImage(data.image || "");
        })
        .catch(console.error);
    }
  }, [mode, id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload: any = { title, description, value, label, image };

    try {
      if (mode === "add") {
        await API.post(`/about/${section}`, payload, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await API.put(`/about/${section}/${id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
      }
      navigate("/admin/about");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{mode === "add" ? "Add" : "Edit"} About Content</h2>

      {section === "story" && <>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full mb-3 p-2 border rounded" required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full mb-3 p-2 border rounded" required />
        <input type="text" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} className="w-full mb-3 p-2 border rounded" />
      </>}

      {section === "achievements" && <>
        <input type="text" placeholder="Value (e.g., 5000+)" value={value} onChange={e => setValue(e.target.value)} className="w-full mb-3 p-2 border rounded" required />
        <input type="text" placeholder="Label (e.g., Customers Served)" value={label} onChange={e => setLabel(e.target.value)} className="w-full mb-3 p-2 border rounded" required />
      </>}

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">{mode === "add" ? "Add" : "Update"} Content</button>
    </form>
  );
};

export default AboutForm;
