import Home from "../models/Home.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getHome = async (req, res) => {
  try {
    const home = await Home.findOne();
    res.json(home);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHome = async (req, res) => {
  try {
    const {
      heroBadge,
      heroTitle,
      heroSubtitle,
      heroDescription,
      phoneNumber,
      whatsappNumber,
      aboutTitle,
      aboutDescription,
      mapEmbed,
      stats,
      aboutPoints,
      services,
    } = req.body;

    let parsedServices = JSON.parse(services);

    // Handle uploaded files via Cloudinary
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "airglow",
        });

        // Remove local file after upload
        fs.unlinkSync(file.path);

        // About Image
        if (file.fieldname === "aboutImage") {
          req.body.aboutImage = result.secure_url;
        }

        // Service Images
        const match = file.fieldname.match(/serviceImages_(\d+)/);
        if (match) {
          const serviceIndex = parseInt(match[1]);
          if (!parsedServices[serviceIndex].images) {
            parsedServices[serviceIndex].images = [];
          }
          parsedServices[serviceIndex].images.push(result.secure_url);
        }
      }
    }

    const updatedData = {
      heroBadge,
      heroTitle,
      heroSubtitle,
      heroDescription,
      phoneNumber,
      whatsappNumber,
      aboutTitle,
      aboutDescription,
      mapEmbed,
      stats: JSON.parse(stats),
      aboutPoints: JSON.parse(aboutPoints),
      services: parsedServices,
      aboutImage: req.body.aboutImage,
    };

    await Home.findOneAndUpdate({}, updatedData, { upsert: true });

    res.json({ message: "Home updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Update failed" });
  }
};