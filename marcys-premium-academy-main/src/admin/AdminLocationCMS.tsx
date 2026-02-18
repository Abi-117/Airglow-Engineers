import React, { useState, useEffect } from "react";
import API from "../api";
import AdminLayout from "../pages/AdminDashboard";

interface LocationItem {
  _id: string;
  name: string;
}

const AdminLocationCMS: React.FC = () => {
  const token = localStorage.getItem("adminToken");

  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [newLocation, setNewLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const res = await API.get("/location", { headers: { Authorization: `Bearer ${token}` } });
      setLocations(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load locations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const addLocation = async () => {
    if (!newLocation) return alert("Enter location name");
    try {
      await API.post("/location/add", { name: newLocation }, { headers: { Authorization: `Bearer ${token}` } });
      setNewLocation("");
      fetchLocations();
    } catch (err) {
      console.error(err);
      alert("Failed to add location");
    }
  };

  const deleteLocation = async (id: string) => {
    if (!confirm("Delete this location?")) return;
    try {
      await API.delete(`/location/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchLocations();
    } catch (err) {
      console.error(err);
      alert("Failed to delete location");
    }
  };

  const updateLocation = async (id: string, name: string) => {
    const newName = prompt("Update location name", name);
    if (!newName) return;
    try {
      await API.put(`/location/${id}`, { name: newName }, { headers: { Authorization: `Bearer ${token}` } });
      fetchLocations();
    } catch (err) {
      console.error(err);
      alert("Failed to update location");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="flex min-h-screen">
      <AdminLayout />
      <div className="p-6 flex-1 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Admin Location CMS</h1>

        <div className="mb-6">
          <input
            className="p-2 border rounded w-1/2 mr-2"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="New Location"
          />
          <button onClick={addLocation} className="px-4 py-2 bg-green-500 text-white rounded">Add</button>
        </div>

        <ul className="space-y-2">
          {locations.map((loc) => (
            <li key={loc._id} className="flex justify-between items-center border-b py-1">
              <span>{loc.name}</span>
              <div className="flex gap-2">
                <button onClick={() => updateLocation(loc._id, loc.name)} className="px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
                <button onClick={() => deleteLocation(loc._id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminLocationCMS;
