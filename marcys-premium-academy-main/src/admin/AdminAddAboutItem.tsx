// pages/admin/about/AdminAddAboutItem.tsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

const AdminAddAboutItem: React.FC = () => {
  const { section } = useParams<{ section: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [label, setLabel] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const token = localStorage.getItem("adminToken");

  const handleSave = async () => {
    if (!section) return;

    const formData = new FormData();
    if (title) formData.append("title", title);
    if (description) formData.append("description", description);
    if (value) formData.append("value", value);
    if (label) formData.append("label", label);
    if (image) formData.append("image", image);

    try {
      await API.post(`/about/${section}/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert(`${section} item added successfully!`);
      navigate("/admin/about");
    } catch (err: any) {
      console.error(err.response || err);
      alert("Failed to add item");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New {section}</h1>

      {section === "story" && (
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
      )}

      {section === "achievements" && (
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
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Save
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

export default AdminAddAboutItem;
