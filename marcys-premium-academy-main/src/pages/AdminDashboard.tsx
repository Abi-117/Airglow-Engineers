// AdminLayout.tsx
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const pages = ["Home", "About", "Services", "Location", "Contact"];

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const handlePageClick = (title: string) => {
    switch (title) {
      case "Home":
        navigate("/admin/home");
        break;
      case "About":
        navigate("/admin/about");
        break;
      case "Services":
        navigate("/admin/services");
        break;
      case "Location":
        navigate("/admin/location");
        break;
      case "Contact":
        navigate("/admin/contact");
        break;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className="text-left px-4 py-2 rounded-lg mb-2 hover:bg-blue-100 transition"
          >
            {page}
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="mt-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <Outlet /> {/* Render the current admin page here */}
      </div>
    </div>
  );
};

export default AdminLayout;
