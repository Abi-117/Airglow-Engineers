import express from "express";
import upload from "../middlewares/upload.js";
import Service from "../models/Service.js";

const router = express.Router();

/* ADD SERVICE */
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const newService = new Service({
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      image: req.file ? `uploads/${req.file.filename}` : "",
    });

    await newService.save();
    res.json({ message: "Service added", service: newService });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding service" });
  }
});

/* GET ALL SERVICES */
router.get("/", async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
