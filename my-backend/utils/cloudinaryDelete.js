// utils/cloudinaryDelete.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Deletes a single Cloudinary image by public_id
 * @param {string} url - full Cloudinary URL
 */
export const deleteCloudinaryImage = async (url) => {
  try {
    // Extract public_id from URL
    const parts = url.split("/");
    const filename = parts[parts.length - 1]; // e.g., "image123.jpg"
    const publicId = filename.split(".")[0];   // remove extension

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(`airglow/${publicId}`);
    console.log("Deleted Cloudinary image:", url);
  } catch (err) {
    console.error("Failed to delete Cloudinary image:", err);
  }
};