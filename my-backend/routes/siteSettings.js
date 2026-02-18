import express from "express";
import SiteSettings from "../models/SiteSettings.js";

const router = express.Router();

/* GET */
router.get("/", async (req, res) => {
  const data = await SiteSettings.findOne();
  res.json(data || {});
});

/* UPDATE (Admin) */
router.post("/", async (req, res) => {
  let settings = await SiteSettings.findOne();

  if (settings) {
    await SiteSettings.updateOne({}, req.body);
  } else {
    settings = new SiteSettings(req.body);
    await settings.save();
  }

  res.json({ message: "Settings Saved" });
});

export default router;
