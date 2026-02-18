// pages/admin/AdminAboutCMS.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import AdminLayout from "../pages/AdminDashboard";

interface StoryItem { _id: string; title: string; description: string; }
interface AchievementItem { _id: string; value: string; label: string; image?: string; }
interface HeroData { title: string; subtitle: string; bannerImage?: string; }
interface CTAData { heading: string; subtext: string; contactNumber: string; }

const AdminAboutCMS: React.FC = () => {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  /** Hero Section */
  const [hero, setHero] = useState<HeroData>({ title: "", subtitle: "" });
  const [heroImage, setHeroImage] = useState<File | null>(null);

  /** Story Section */
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [storyTitle, setStoryTitle] = useState("");
  const [storyDesc, setStoryDesc] = useState("");

  /** Achievements Section */
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [achValue, setAchValue] = useState("");
  const [achLabel, setAchLabel] = useState("");
  const [achImage, setAchImage] = useState<File | null>(null);

  /** CTA Section */
  const [cta, setCta] = useState<CTAData>({ heading: "", subtext: "", contactNumber: "" });
  const [loading, setLoading] = useState(false);

  /** Fetch all data */
  const fetchData = async () => {
    setLoading(true);
    try {
      const [heroRes, storyRes, achRes, ctaRes] = await Promise.all([
        API.get("/about/hero", { headers: { Authorization: `Bearer ${token}` } }),
        API.get("/about/story", { headers: { Authorization: `Bearer ${token}` } }),
        API.get("/about/achievements", { headers: { Authorization: `Bearer ${token}` } }),
        API.get("/about/cta", { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setHero(heroRes.data);
      setStories(storyRes.data);
      setAchievements(achRes.data);
      setCta(ctaRes.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch About page data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  /** Logout */
  const logout = () => { localStorage.removeItem("adminToken"); navigate("/login"); };

  /** Save Hero */
  const saveHero = async () => {
    try {
      const formData = new FormData();
      formData.append("title", hero.title);
      formData.append("subtitle", hero.subtitle);
      if (heroImage) formData.append("bannerImage", heroImage);

      await API.post("/about/hero", formData, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } });
      alert("Hero section updated!");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to save hero section.");
    }
  };

  /** Add Story */
  const addStory = async () => {
    if (!storyTitle || !storyDesc) return alert("Fill all fields");
    try {
      await API.post("/about/story/add", { title: storyTitle, description: storyDesc }, { headers: { Authorization: `Bearer ${token}` } });
      alert("Story added!");
      setStoryTitle(""); setStoryDesc("");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to add story.");
    }
  };

  /** Add Achievement */
  const addAchievement = async () => {
    if (!achValue || !achLabel) return alert("Fill all fields");
    try {
      const formData = new FormData();
      formData.append("value", achValue);
      formData.append("label", achLabel);
      if (achImage) formData.append("image", achImage);

      await API.post("/about/achievements/add", formData, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } });
      alert("Achievement added!");
      setAchValue(""); setAchLabel(""); setAchImage(null);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to add achievement.");
    }
  };

  /** Save CTA */
  const saveCTA = async () => {
    try {
      await API.post("/about/cta", cta, { headers: { Authorization: `Bearer ${token}` } });
      alert("CTA section updated!");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to save CTA section.");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="flex min-h-screen">
      <AdminLayout />
      <div className="p-6 min-h-screen bg-gray-100">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin About CMS</h1>
          <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
        </div>

        {/* Hero */}
        <section className="mb-8 bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2 text-lg">Hero Section</h2>
          <input className="w-full mb-2 p-2 border rounded" value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} placeholder="Hero Title" />
          <input className="w-full mb-2 p-2 border rounded" value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} placeholder="Hero Subtitle" />
          <input type="file" onChange={(e) => e.target.files && setHeroImage(e.target.files[0])} className="mb-2" />
          <button onClick={saveHero} className="px-4 py-2 bg-blue-500 text-white rounded">Save Hero</button>
        </section>

        {/* Story */}
        <section className="mb-8 bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2 text-lg">Our Story</h2>
          <input className="w-full mb-2 p-2 border rounded" value={storyTitle} onChange={(e) => setStoryTitle(e.target.value)} placeholder="Story Title" />
          <textarea className="w-full mb-2 p-2 border rounded" rows={4} value={storyDesc} onChange={(e) => setStoryDesc(e.target.value)} placeholder="Story Description"></textarea>
          <button onClick={addStory} className="px-4 py-2 bg-green-500 text-white rounded mb-2">Add Story</button>

          <ul>
            {stories.map((s) => (
              <li key={s._id} className="flex justify-between items-center border-b py-1">
                <span>{s.title}</span>
                <button onClick={async () => { await API.delete(`/about/story/${s._id}`, { headers: { Authorization: `Bearer ${token}` } }); fetchData(); }} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </li>
            ))}
          </ul>
        </section>

        {/* Achievements */}
        <section className="mb-8 bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2 text-lg">Achievements</h2>
          <input className="w-full mb-2 p-2 border rounded" value={achValue} onChange={(e) => setAchValue(e.target.value)} placeholder="Value" />
          <input className="w-full mb-2 p-2 border rounded" value={achLabel} onChange={(e) => setAchLabel(e.target.value)} placeholder="Label" />
          <input type="file" onChange={(e) => e.target.files && setAchImage(e.target.files[0])} className="mb-2" />
          <button onClick={addAchievement} className="px-4 py-2 bg-green-500 text-white rounded mb-2">Add Achievement</button>

          <ul>
            {achievements.map((a) => (
              <li key={a._id} className="flex justify-between items-center border-b py-1">
                <span>{a.value} - {a.label}</span>
                <button onClick={async () => { await API.delete(`/about/achievements/${a._id}`, { headers: { Authorization: `Bearer ${token}` } }); fetchData(); }} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="mb-8 bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2 text-lg">CTA Section</h2>
          <input className="w-full mb-2 p-2 border rounded" value={cta.heading} onChange={(e) => setCta({ ...cta, heading: e.target.value })} placeholder="CTA Heading" />
          <input className="w-full mb-2 p-2 border rounded" value={cta.subtext} onChange={(e) => setCta({ ...cta, subtext: e.target.value })} placeholder="CTA Subtext" />
          <input className="w-full mb-2 p-2 border rounded" value={cta.contactNumber} onChange={(e) => setCta({ ...cta, contactNumber: e.target.value })} placeholder="Contact Number" />
          <button onClick={saveCTA} className="px-4 py-2 bg-blue-500 text-white rounded">Save CTA</button>
        </section>

      </div>
    </div>
  );
};

export default AdminAboutCMS;
