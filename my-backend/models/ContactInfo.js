import mongoose from "mongoose";

const contactInfoSchema = new mongoose.Schema(
  {
    companyName: String,
    tagline: String,
    mainPhone: String,
    alternatePhone: String,
    location: String,
    workingHours: String,
    whatsappNumber: String
  },
  { timestamps: true }
);

export default mongoose.model("ContactInfo", contactInfoSchema);
