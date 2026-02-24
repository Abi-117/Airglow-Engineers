import express from "express";
import { getHome, updateHome } from "../controllers/homeController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getHome);
router.put(
  "/",
  upload.fields([
    { name: "aboutImage", maxCount: 1 },
    { name: "serviceImages_0" }, // multer can handle multiple fields
    { name: "serviceImages_1" },
    { name: "serviceImages_2" },
  ]),
  updateHome
);

export default router;
