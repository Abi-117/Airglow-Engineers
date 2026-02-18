import express from "express";
import { adminSetup, adminLogin, dashboard } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/setup", adminSetup);
router.post("/login", adminLogin);
router.get("/dashboard", protect, dashboard);

export default router;
