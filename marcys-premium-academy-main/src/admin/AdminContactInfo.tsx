import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import AdminLayout from "../pages/AdminDashboard";

const API = "http://localhost:5000/api";

interface ContactInfo {
  companyName: string;
  tagline: string;
  mainPhone: string;
  alternatePhone: string;
  location: string;
  workingHours: string;
  whatsappNumber: string;
}

const AdminContactInfo: React.FC = () => {
  const [form, setForm] = useState<ContactInfo>({
    companyName: "",
    tagline: "",
    mainPhone: "",
    alternatePhone: "",
    location: "",
    workingHours: "",
    whatsappNumber: "",
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      const res = await axios.get<ContactInfo>(`${API}/contact`);

      if (res.data && Object.keys(res.data).length > 0) {
        setForm({
          companyName: res.data.companyName || "",
          tagline: res.data.tagline || "",
          mainPhone: res.data.mainPhone || "",
          alternatePhone: res.data.alternatePhone || "",
          location: res.data.location || "",
          workingHours: res.data.workingHours || "",
          whatsappNumber: res.data.whatsappNumber || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch contact info", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await axios.post(`${API}/contact`, form);
      alert("Updated Successfully ✅");
    } catch (error) {
      console.error("Failed to update contact info", error);
      alert("Update failed ❌");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <AdminLayout />
        <div className="flex-1 flex items-center justify-center">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminLayout />

      <div className="p-6 flex-1 bg-gray-100">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-6">Update Contact Info</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full border px-3 py-2 rounded-lg"
            />

            <input
              name="tagline"
              value={form.tagline}
              onChange={handleChange}
              placeholder="Tagline"
              className="w-full border px-3 py-2 rounded-lg"
            />

            <input
              name="mainPhone"
              value={form.mainPhone}
              onChange={handleChange}
              placeholder="Main Phone"
              className="w-full border px-3 py-2 rounded-lg"
            />

            <input
              name="alternatePhone"
              value={form.alternatePhone}
              onChange={handleChange}
              placeholder="Alternate Phone"
              className="w-full border px-3 py-2 rounded-lg"
            />

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full border px-3 py-2 rounded-lg"
            />

            <input
              name="workingHours"
              value={form.workingHours}
              onChange={handleChange}
              placeholder="Working Hours"
              className="w-full border px-3 py-2 rounded-lg"
            />

            <input
              name="whatsappNumber"
              value={form.whatsappNumber}
              onChange={handleChange}
              placeholder="WhatsApp Number"
              className="w-full border px-3 py-2 rounded-lg"
            />

            <Button type="submit" className="w-full">
              Save Changes
            </Button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminContactInfo;
