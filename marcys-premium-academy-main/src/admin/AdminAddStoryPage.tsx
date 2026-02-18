// AdminAddStoryPage.tsx
import React, { useState } from "react";
import API from "../api"; // your axios instance

const AdminAddStoryPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title || !content) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const res = await API.post(
        "/admin/about/story/add",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Story added successfully!");
      setTitle("");
      setContent("");
    } catch (err: any) {
      console.error(err.response || err);
      alert("Failed to add story");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add New Story</h1>

      <input
        type="text"
        placeholder="Story Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        rows={8}
        placeholder="Story Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-4 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSave}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        {loading ? "Saving..." : "Save Story"}
      </button>
    </div>
  );
};

export default AdminAddStoryPage;
