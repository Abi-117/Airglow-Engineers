import { useState } from "react";
import { Button } from "@/components/ui/button";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    appliance: "",
    brand: "",
    issue: "",
    otherIssue: "",
    description: ""
  });

  const acIssues = [
    "Not Cooling",
    "Gas Leakage",
    "Water Leakage",
    "Noise Problem",
    "Installation / Uninstallation",
    "Other"
  ];

  const fridgeIssues = [
    "Not Cooling",
    "Compressor Issue",
    "Water Leakage",
    "Door Problem",
    "Gas Filling",
    "Other"
  ];

  const washingIssues = [
    "Not Spinning",
    "Water Not Draining",
    "Noise Issue",
    "Door Lock Problem",
    "Installation",
    "Other"
  ];

  const getIssues = () => {
    if (formData.appliance === "AC") return acIssues;
    if (formData.appliance === "Fridge") return fridgeIssues;
    if (formData.appliance === "Washing Machine") return washingIssues;
    return [];
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalIssue =
      formData.issue === "Other"
        ? formData.otherIssue
        : formData.issue;

    const message = `
*New Service Request*

Name: ${formData.name}
Phone: ${formData.phone}
Appliance: ${formData.appliance}
Brand: ${formData.brand}
Issue: ${finalIssue}
Description: ${formData.description || "N/A"}
`;

    const whatsappNumber = "919952006778"; // Your number (without +)

    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=` +
      encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800">
        Request Service
      </h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
          placeholder="Enter your name"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
          placeholder="Enter your phone number"
        />
      </div>

      {/* Appliance */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Select Appliance
        </label>
        <select
          name="appliance"
          value={formData.appliance}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
        >
          <option value="">-- Select Appliance --</option>
          <option value="AC">AC</option>
          <option value="Fridge">Fridge</option>
          <option value="Washing Machine">Washing Machine</option>
        </select>
      </div>

      {/* Brand */}
      {formData.appliance && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Brand Name
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
            placeholder="Eg: LG, Samsung, Whirlpool..."
          />
        </div>
      )}

      {/* Issue */}
      {formData.appliance && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Select Issue
          </label>
          <select
            name="issue"
            value={formData.issue}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
          >
            <option value="">-- Select Issue --</option>
            {getIssues().map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Other Issue */}
      {formData.issue === "Other" && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Specify Your Issue
          </label>
          <input
            type="text"
            name="otherIssue"
            value={formData.otherIssue}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
          />
        </div>
      )}

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Additional Description (Optional)
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
        />
      </div>

      <Button type="submit" className="w-full mt-2">
        Submit via WhatsApp
      </Button>
    </form>
  );
};

export default ContactForm;
