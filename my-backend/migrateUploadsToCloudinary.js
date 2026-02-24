import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import Home from "./models/Home.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

await mongoose.connect(process.env.MONGO_URI); // ✅ no extra options
console.log("Connected to MongoDB");

const home = await Home.findOne();
if (!home) process.exit(0);

const uploadToCloudinary = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, { folder: "airglow" });
  fs.unlinkSync(filePath);
  return result.secure_url;
};

// Update aboutImage
if (home.aboutImage?.startsWith("/uploads")) {
  const localPath = path.join(UPLOADS_DIR, path.basename(home.aboutImage));
  if (fs.existsSync(localPath)) home.aboutImage = await uploadToCloudinary(localPath);
}

// Update service images
for (let sIdx = 0; sIdx < home.services.length; sIdx++) {
  const service = home.services[sIdx];
  const updatedImages = [];
  for (let img of service.images) {
    if (img.startsWith("/uploads")) {
      const localPath = path.join(UPLOADS_DIR, path.basename(img));
      if (fs.existsSync(localPath)) img = await uploadToCloudinary(localPath);
    }
    updatedImages.push(img);
  }
  service.images = updatedImages;
}

await home.save();
console.log("Home document updated with Cloudinary URLs ✅");
process.exit(0);