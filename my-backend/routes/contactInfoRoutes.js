import express from "express";
import ContactInfo from "../models/ContactInfo.js";

const router = express.Router();

/* GET */
router.get("/", async (req, res) => {
  const data = await ContactInfo.findOne();
  res.json(data || {});
});

/* CREATE / UPDATE */
router.post("/", async (req, res) => {
  let data = await ContactInfo.findOne();

  if (data) {
    await ContactInfo.updateOne({}, req.body);
  } else {
    data = new ContactInfo(req.body);
    await data.save();
  }

  res.json({ message: "Contact Info Saved" });
});

export default router;
