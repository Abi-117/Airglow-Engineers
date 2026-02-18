// routes/about.js
import express from "express";
import multer from "multer";
import { Hero, Story, Achievement, CTA } from "../models/About.js";
import fs from "fs";
import path from "path";

const router = express.Router();

// ---------------- Multer Setup ----------------
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// ---------------- Hero ----------------
router.get("/hero", async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json(hero || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching hero" });
  }
});

router.post("/hero", upload.single("bannerImage"), async (req, res) => {
  try {
    const data = { title: req.body.title, subtitle: req.body.subtitle };
    if (req.file) data.bannerImage = `/uploads/${req.file.filename}`;

    let hero = await Hero.findOne();
    if (hero) await Hero.updateOne({}, data);
    else {
      hero = new Hero(data);
      await hero.save();
    }

    res.json({ message: "Hero saved", hero });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error saving hero" });
  }
});

// ---------------- Story ----------------
router.get("/story", async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching stories" });
  }
});

router.post("/story/add", upload.single("image"), async (req, res) => {
  try {
    const data = { title: req.body.title, description: req.body.description };
    if (req.file) data.image = `/uploads/${req.file.filename}`;

    const story = new Story(data);
    await story.save();
    res.json({ message: "Story added", story });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error adding story" });
  }
});

router.delete("/story/:id", async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    res.json({ message: "Story deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error deleting story" });
  }
});

// ---------------- Achievements ----------------
router.get("/achievements", async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.json(achievements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching achievements" });
  }
});

router.post("/achievements/add", upload.single("image"), async (req, res) => {
  try {
    const data = { value: req.body.value, label: req.body.label };
    if (req.file) data.image = `/uploads/${req.file.filename}`;

    const achievement = new Achievement(data);
    await achievement.save();
    res.json({ message: "Achievement added", achievement });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error adding achievement" });
  }
});

router.delete("/achievements/:id", async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: "Achievement deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error deleting achievement" });
  }
});

// ---------------- CTA ----------------
router.get("/cta", async (req, res) => {
  try {
    const cta = await CTA.findOne();
    res.json(cta || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching CTA" });
  }
});

router.post("/cta", async (req, res) => {
  try {
    const data = {
      heading: req.body.heading,
      subtext: req.body.subtext,
      contactNumber: req.body.contactNumber,
    };

    let cta = await CTA.findOne();
    if (cta) await CTA.updateOne({}, data);
    else {
      cta = new CTA(data);
      await cta.save();
    }

    res.json({ message: "CTA saved", cta });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error saving CTA" });
  }
});

export default router;
