import express from "express";
import { Location } from "../models/Location.js"; // new model
const router = express.Router();

// GET all locations
router.get("/", async (req, res) => {
  const locations = await Location.find().sort({ name: 1 });
  res.json(locations);
});

// POST add new location
router.post("/add", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  const exists = await Location.findOne({ name });
  if (exists) return res.status(400).json({ message: "Location already exists" });

  const loc = new Location({ name });
  await loc.save();
  res.json({ message: "Location added", loc });
});

// DELETE location
router.delete("/:id", async (req, res) => {
  await Location.findByIdAndDelete(req.params.id);
  res.json({ message: "Location deleted" });
});

// UPDATE location
router.put("/:id", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  const loc = await Location.findByIdAndUpdate(req.params.id, { name }, { new: true });
  res.json({ message: "Location updated", loc });
});

export default router;
