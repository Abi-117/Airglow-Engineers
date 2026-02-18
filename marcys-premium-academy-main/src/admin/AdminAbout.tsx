// pages/admin/AdminAboutPage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

interface StoryItem {
  _id: string;
  title: string;
  description: string;
}

interface AchievementItem {
  _id: string;
  value: string;
  label: string;
  image?: string;
}

const AdminAboutPage: React.FC = () => {
  const [section, setSection] = useState<"story" | "achievements">("story");
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  /** Fetch stories or achievements */
  const fetchItems = async () => {
    setLoading(true);
    try {
      if (section === "story") {
        const res = await API.get("/about/story", { headers: { Authorization: `Bearer ${token}` } });
        setStories(res.data);
      } else {
        const res = await API.get("/about/achievements", { headers: { Authorization: `Bearer ${token}` } });
        setAchievements(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /** Delete item */
  const deleteItem = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await API.delete(`/about/${section}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  /** Logout */
  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchItems();
  }, [section]);

  /** Navigate to Add/Edit page */
  const handleAdd = () => navigate(`/admin/about/${section}/add`);
  const handleEdit = (id: string) => navigate(`/admin/about/${section}/edit/${id}`);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin About Page</h1>
        <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setSection("story")}
          className={`px-4 py-2 rounded ${section === "story" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Story
        </button>
        <button
          onClick={() => setSection("achievements")}
          className={`px-4 py-2 rounded ${section === "achievements" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Achievements
        </button>
      </div>

      {/* Add Button */}
      <button onClick={handleAdd} className="mb-4 px-4 py-2 bg-green-500 text-white rounded">
        + Add New
      </button>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : section === "story" ? (
        <table className="w-full border bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Title</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((item) => (
              <tr key={item._id}>
                <td className="border p-2">{item.title}</td>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2 flex gap-2">
                  <button onClick={() => handleEdit(item._id)} className="px-2 py-1 bg-yellow-400 text-white rounded">Edit</button>
                  <button onClick={() => deleteItem(item._id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="w-full border bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Value</th>
              <th className="border p-2">Label</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {achievements.map((item) => (
              <tr key={item._id}>
                <td className="border p-2">{item.value}</td>
                <td className="border p-2">{item.label}</td>
                <td className="border p-2">{item.image && <img src={item.image} alt={item.label} className="w-20 h-12 object-cover" />}</td>
                <td className="border p-2 flex gap-2">
                  <button onClick={() => handleEdit(item._id)} className="px-2 py-1 bg-yellow-400 text-white rounded">Edit</button>
                  <button onClick={() => deleteItem(item._id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminAboutPage;
