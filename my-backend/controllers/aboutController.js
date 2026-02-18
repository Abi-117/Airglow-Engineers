// controllers/aboutController.js
import About from "../models/About.js";

export const getAbout = async (req, res) => {
  try {
    const items = await About.find({ section: req.params.section }).sort({ order: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAbout = async (req, res) => {
  try {
    const item = await About.create({ section: req.params.section, ...req.body });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const updated = await About.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAbout = async (req, res) => {
  try {
    await About.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
