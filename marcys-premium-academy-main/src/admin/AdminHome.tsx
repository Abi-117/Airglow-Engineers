import { useEffect, useState } from "react";
import axios from "axios";
import { Save, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "../pages/AdminDashboard";

const API = "http://localhost:5000/api";

interface Stat {
  value: string;
  label: string;
}

interface Service {
  title: string;
  description: string;
  images: string[]; // existing images from DB
}

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

  // NEW FILES PER SERVICE
  const [serviceFiles, setServiceFiles] = useState<File[][]>([]);

  /* ================= FETCH ================= */
  useEffect(() => {
    axios.get(`${API}/home`).then((res) => {
      if (res.data) {
        setData(res.data);

        // initialize empty arrays per service
        const initialFiles = res.data.services.map(() => []);
        setServiceFiles(initialFiles);
      }
    });
  }, []);

  /* ================= SAVE ================= */
  const saveData = async () => {
    try {
      if (!data.heroTitle || !data.aboutTitle) {
        alert("Please fill required fields");
        return;
      }

      const formData = new FormData();

      // Basic
      formData.append("heroBadge", data.heroBadge);
      formData.append("heroTitle", data.heroTitle);
      formData.append("heroSubtitle", data.heroSubtitle);
      formData.append("heroDescription", data.heroDescription);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("whatsappNumber", data.whatsappNumber);
      formData.append("aboutTitle", data.aboutTitle);
      formData.append("aboutDescription", data.aboutDescription);
      formData.append("mapEmbed", data.mapEmbed);

      formData.append("stats", JSON.stringify(data.stats));
      formData.append("aboutPoints", JSON.stringify(data.aboutPoints));
      formData.append("services", JSON.stringify(data.services));

      if (aboutFile) {
        formData.append("aboutImage", aboutFile);
      }

      // Append service images properly
     serviceFiles.forEach((serviceFileArray, serviceIndex) => {
  serviceFileArray.forEach((file) => {
    formData.append(`serviceImages_${serviceIndex}`, file);
  });
});


      await axios.put(`${API}/home`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Home Updated Successfully");
    } catch (error) {
      console.error(error);
      alert("Error updating home");
    }
  };

  /* ================= ADD SERVICE ================= */
  const addService = () => {
    setData({
      ...data,
      services: [...data.services, { title: "", description: "", images: [] }],
    });

    setServiceFiles([...serviceFiles, []]);
  };

  /* ================= DELETE SERVICE ================= */
  const deleteService = (index: number) => {
    const updatedServices = data.services.filter((_, i) => i !== index);
    const updatedFiles = serviceFiles.filter((_, i) => i !== index);

    setData({ ...data, services: updatedServices });
    setServiceFiles(updatedFiles);
  };

  return (
    <div className="flex min-h-screen">
      <AdminLayout />
      <div className="flex-1 p-8 bg-gray-100">
        <div className="max-w-6xl mx-auto space-y-10">

          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Home Page CMS</h1>
            <Button onClick={saveData}>
              <Save className="w-4 h-4 mr-2" /> Save Changes
            </Button>
          </div>

          {/* HERO SECTION */}
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="font-semibold text-xl">Hero Section</h2>

            <Input
              placeholder="Badge"
              value={data.heroBadge}
              onChange={(e) =>
                setData({ ...data, heroBadge: e.target.value })
              }
            />

            <Input
              placeholder="Title"
              value={data.heroTitle}
              onChange={(e) =>
                setData({ ...data, heroTitle: e.target.value })
              }
            />

            <Input
              placeholder="Subtitle"
              value={data.heroSubtitle}
              onChange={(e) =>
                setData({ ...data, heroSubtitle: e.target.value })
              }
            />

            <Textarea
              placeholder="Description"
              value={data.heroDescription}
              onChange={(e) =>
                setData({ ...data, heroDescription: e.target.value })
              }
            />
          </div>

          {/* ABOUT SECTION */}
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="font-semibold text-xl">About Section</h2>

            <Input
              placeholder="About Title"
              value={data.aboutTitle}
              onChange={(e) =>
                setData({ ...data, aboutTitle: e.target.value })
              }
            />

            <Textarea
              placeholder="About Description"
              value={data.aboutDescription}
              onChange={(e) =>
                setData({ ...data, aboutDescription: e.target.value })
              }
            />

            <input
              type="file"
              onChange={(e) =>
                setAboutFile(e.target.files?.[0] || null)
              }
            />

            {(aboutFile || data.aboutImage) && (
              <img
                src={
                  aboutFile
                    ? URL.createObjectURL(aboutFile)
                    : `http://localhost:5000/uploads/${data.aboutImage}`
                }
                className="w-60 rounded mt-3"
              />
            )}
          </div>

          {/* SERVICES */}
          <div className="bg-white p-6 rounded-xl shadow space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-xl">Service Preview</h2>
              <Button size="sm" onClick={addService}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>

            {data.services.map((service, index) => (
              <div key={index} className="border p-4 rounded-lg space-y-3">

                <Input
                  placeholder="Service Title"
                  value={service.title}
                  onChange={(e) => {
                    const updated = [...data.services];
                    updated[index].title = e.target.value;
                    setData({ ...data, services: updated });
                  }}
                />

                <Textarea
                  placeholder="Service Description"
                  value={service.description}
                  onChange={(e) => {
                    const updated = [...data.services];
                    updated[index].description = e.target.value;
                    setData({ ...data, services: updated });
                  }}
                />

                {/* IMAGE UPLOAD */}
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    const selectedFiles = e.target.files
                      ? Array.from(e.target.files)
                      : [];

                    const filesCopy = [...serviceFiles];

                    if (!filesCopy[index]) {
                      filesCopy[index] = [];
                    }

                    filesCopy[index] = [
                      ...filesCopy[index],
                      ...selectedFiles,
                    ];

                    setServiceFiles(filesCopy);
                  }}
                />

                {/* IMAGE PREVIEW */}
                <div className="flex flex-wrap gap-3">

                  {/* Existing images */}
                  {service.images?.map((img, i) => (
                    <div key={`existing-${i}`} className="relative">
                      <img
                        src={`http://localhost:5000/uploads/${img}`}
                        className="w-32 h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...data.services];
                          updated[index].images =
                            updated[index].images.filter(
                              (_, j) => j !== i
                            );
                          setData({ ...data, services: updated });
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 text-xs rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  {/* New images */}
                  {serviceFiles[index]?.map((file, i) => (
                    <div key={`new-${i}`} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        className="w-32 h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const filesCopy = [...serviceFiles];
                          filesCopy[index] =
                            filesCopy[index].filter(
                              (_, j) => j !== i
                            );
                          setServiceFiles(filesCopy);
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 text-xs rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteService(index)}
                >
                  Delete Service
                </Button>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminHome;
