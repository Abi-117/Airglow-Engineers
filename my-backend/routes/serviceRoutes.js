import express from "express";
import { Service } from "../models/Service.js";

const router = express.Router();

/* ---------------- GET SERVICES ---------------- */
router.get("/", async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- ADD SERVICE ---------------- */
router.post("/add", async (req, res) => {
  try {
    const { title, description, type, images } = req.body;

    if (!title || !description || !type) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // images should be an array of Cloudinary URLs
    const service = new Service({
      title,
      description,
      type,
      images: Array.isArray(images) ? images : [],
    });

    await service.save();

    res.json({ message: "Service added", service });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- UPDATE SERVICE ---------------- */
router.post("/edit/:id", async (req, res) => {
  try {
    const { title, description, type, images } = req.body;

    const updateData = {
      title,
      description,
      type,
    };

    if (images && Array.isArray(images)) {
      updateData.images = images; // overwrite with new Cloudinary URLs
    }

    const service = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });

    res.json({ message: "Service updated", service });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- DELETE SERVICE ---------------- */
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;