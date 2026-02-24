import express from "express";
import path from "path";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import aboutRoutes from "./routes/aboutRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import contactInfoRoutes from "./routes/contactInfoRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ✅ ADD THIS
app.get("/", (req, res) => {
  res.send("Airglow Engineers API is running 🚀");
});

// CORS
app.use(cors({
  origin: "http://localhost:8080",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/location",locationRoutes);
app.use("/api/contact", contactInfoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));