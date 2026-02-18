import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema({
  companyName: String,
  tagline: String,
  phone1: String,
  phone2: String,
  whatsappNumber: String,
  address: String,
  workingHours: String,
  locations: [String]
});

export default mongoose.model("SiteSettings", siteSettingsSchema);
