// utils/multer.js
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage engine
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "airglow",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// Multer instance
const upload = multer({ storage });

export default upload; // THIS must be the multer instance