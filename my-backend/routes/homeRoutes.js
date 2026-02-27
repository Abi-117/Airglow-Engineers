import express from "express";
import upload from "../utils/cloudinary.js";
import { getHome, updateHome } from "../controllers/homeController.js";
import Home from "../models/Home.js"; // ✅ Import the model

const router = express.Router();

router.get("/", getHome);

router.post("/", async (req, res) => {
  try {
    const newHome = await Home.create(req.body);
    res.status(201).json(newHome);
  } catch (err) {
    console.error("POST /api/home error:", err);
    res.status(500).json({ message: err.message });
  }
});

router.put("/", upload.any(), updateHome);

export default router;