import express from "express";
import multer from "multer";
import fs from "fs";
import { Service } from "../models/Service.js";

const router = express.Router();

/* ---------------- MULTER SETUP ---------------- */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

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

router.post("/add", upload.array("images", 10), async (req, res) => {
  try {
    const { title, description, type } = req.body;

    if (!title || !description || !type)
      return res.status(400).json({ error: "Missing fields" });

    const imagePaths = req.files?.map(
      (file) => `/uploads/${file.filename}`
    ) || [];

    const service = new Service({
      title,
      description,
      type,
      images: imagePaths,
    });

    await service.save();

    res.json({ message: "Service added", service });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- UPDATE SERVICE ---------------- */

router.post("/edit/:id", upload.array("images", 10), async (req, res) => {
  try {
    const { title, description, type } = req.body;

    const updateData = {
      title,
      description,
      type,
    };

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(
        (file) => `/uploads/${file.filename}`
      );
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ message: "Service updated", service });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- DELETE SERVICE ---------------- */

router.delete("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service?.images?.length) {
      service.images.forEach((img) => {
        const filePath = "." + img;
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    await Service.findByIdAndDelete(req.params.id);

    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
