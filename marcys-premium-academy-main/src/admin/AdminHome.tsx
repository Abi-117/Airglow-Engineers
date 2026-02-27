"use client";

import { useEffect, useState } from "react";
import { Save, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "../pages/AdminDashboard";
import API from "../api";

interface Stat { value: string; label: string; }
interface Service { title: string; description: string; images: string[]; }
interface HomeData {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  whatsappNumber: string;
  phoneNumber: string;
  stats: Stat[];
  aboutTitle: string;
  aboutDescription: string;
  aboutPoints: string[];
  aboutImage: string;
  services: Service[];
  mapEmbed: string;
}

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/djpo4gjdy/image/upload";
const UPLOAD_PRESET = "Airglow";

const AdminHome = () => {
  const [data, setData] = useState<HomeData>({
    heroBadge: "",
    heroTitle: "",
    heroSubtitle: "",
    heroDescription: "",
    whatsappNumber: "",
    phoneNumber: "",
    stats: [],
    aboutTitle: "",
    aboutDescription: "",
    aboutPoints: [],
    aboutImage: "",
    services: [],
    mapEmbed: "",
  });
  const [aboutFile, setAboutFile] = useState<File | null>(null);
  const [serviceFiles, setServiceFiles] = useState<File[][]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH HOME ----------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/home");
        if (res.data) {
          setData(res.data);
          setServiceFiles(res.data.services.map(() => []));
        }
      } catch (error) { console.error(error); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  // ---------------- UPLOAD FILE ----------------
  const uploadFile = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", CLOUDINARY_URL);
      xhr.onload = () => {
        if (xhr.status === 200) resolve(JSON.parse(xhr.responseText).secure_url);
        else reject("Upload failed");
      };
      xhr.onerror = () => reject("Upload failed");
      xhr.send(formData);
    });

  // ---------------- SAVE DATA ----------------
  const saveData = async () => {
    try {
      if (!data.heroTitle || !data.aboutTitle) return alert("Please fill required fields");
      setSaving(true);

      // Upload About image if changed
      let aboutImageURL = data.aboutImage;
      if (aboutFile) aboutImageURL = await uploadFile(aboutFile);

      // Upload service images
      const updatedServices = await Promise.all(
        data.services.map(async (service, idx) => {
          const files = serviceFiles[idx] || [];
          const newUrls = await Promise.all(files.map(f => uploadFile(f)));
          return { ...service, images: [...service.images, ...newUrls] };
        })
      );

      // Send JSON payload
      await API.put("/home", {
        ...data,
        aboutImage: aboutImageURL,
        services: updatedServices,
      });

      alert("Home Updated Successfully ✅");
      setAboutFile(null);
      setServiceFiles(data.services.map(() => []));
      setData(prev => ({ ...prev, aboutImage: aboutImageURL, services: updatedServices }));

    } catch (error) {
      console.error(error);
      alert("Error updating home ❌");
    } finally { setSaving(false); }
  };

  // ---------------- ADD / DELETE SERVICE ----------------
  const addService = () => {
    setData({ ...data, services: [...data.services, { title: "", description: "", images: [] }] });
    setServiceFiles([...serviceFiles, []]);
  };
  const deleteService = (i: number) => {
    setData({ ...data, services: data.services.filter((_, idx) => idx !== i) });
    setServiceFiles(serviceFiles.filter((_, idx) => idx !== i));
  };

  if (loading) return (
    <div className="flex min-h-screen">
      <AdminLayout />
      <div className="flex-1 flex items-center justify-center">Loading...</div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      <AdminLayout />
      <div className="flex-1 p-8 bg-gray-100 space-y-10 max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Home Page CMS</h1>
          <Button onClick={saveData} disabled={saving}>
            <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {/* HERO */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="font-semibold text-xl">Hero Section</h2>
          <Input placeholder="Badge" value={data.heroBadge} onChange={e => setData({...data, heroBadge: e.target.value})} />
          <Input placeholder="Title" value={data.heroTitle} onChange={e => setData({...data, heroTitle: e.target.value})} />
          <Input placeholder="Subtitle" value={data.heroSubtitle} onChange={e => setData({...data, heroSubtitle: e.target.value})} />
          <Textarea placeholder="Description" value={data.heroDescription} onChange={e => setData({...data, heroDescription: e.target.value})} />
        </div>

        {/* ABOUT */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="font-semibold text-xl">About Section</h2>
          <Input placeholder="About Title" value={data.aboutTitle} onChange={e => setData({...data, aboutTitle: e.target.value})} />
          <Textarea placeholder="About Description" value={data.aboutDescription} onChange={e => setData({...data, aboutDescription: e.target.value})} />
          <input type="file" onChange={e => setAboutFile(e.target.files?.[0] || null)} />
          {(aboutFile || data.aboutImage) && <img src={aboutFile ? URL.createObjectURL(aboutFile) : data.aboutImage} className="w-60 rounded mt-3" />}
        </div>

        {/* SERVICES */}
        <div className="bg-white p-6 rounded-xl shadow space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl">Service Preview</h2>
            <Button size="sm" onClick={addService}><Plus className="w-4 h-4 mr-1" /> Add</Button>
          </div>

          {data.services.map((service, idx) => (
            <div key={idx} className="border p-4 rounded-lg space-y-3">
              <Input placeholder="Service Title" value={service.title} onChange={e => { const copy = [...data.services]; copy[idx].title = e.target.value; setData({...data, services: copy}); }} />
              <Textarea placeholder="Service Description" value={service.description} onChange={e => { const copy = [...data.services]; copy[idx].description = e.target.value; setData({...data, services: copy}); }} />
              <input type="file" multiple onChange={e => { const files = e.target.files ? Array.from(e.target.files) : []; const copy = [...serviceFiles]; copy[idx] = [...(copy[idx] || []), ...files]; setServiceFiles(copy); }} />
              <div className="flex flex-wrap gap-3">
                {service.images.map((img,i)=><div key={i} className="relative">
                  <img src={img} className="w-32 h-20 object-cover rounded" />
                  <button onClick={()=>{ const copy=[...data.services]; copy[idx].images=copy[idx].images.filter((_,j)=>j!==i); setData({...data, services: copy}); }} className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 text-xs rounded-full">✕</button>
                </div>)}
                {serviceFiles[idx]?.map((file,i)=><div key={i} className="relative">
                  <img src={URL.createObjectURL(file)} className="w-32 h-20 object-cover rounded" />
                </div>)}
              </div>
              <Button variant="destructive" size="sm" onClick={()=>deleteService(idx)}>Delete Service</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;