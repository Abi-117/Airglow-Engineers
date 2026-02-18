import express from "express";
import { getHome, updateHome } from "../controllers/homeController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getHome);
router.put("/", upload.any(), updateHome);

export default router;
