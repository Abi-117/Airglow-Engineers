import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

// POST /api/admin/setup
export const adminSetup = async (req, res) => {
  console.log("REQ.BODY:", req.body);
  const { username, email, password } = req.body;

  try {
    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ message: "Admin already exists" });

    const admin = await Admin.create({ username, email, password });
    res.status(201).json({ message: "Admin created", _id: admin._id });
  } catch (err) {
    console.error("Error creating admin:", err);
    res.status(500).json({ message: err.message });
  }
};

// POST /api/admin/login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        token: generateToken(admin._id),
        message: "Login successful",
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/admin/dashboard (protected)
export const dashboard = async (req, res) => {
  res.json({ message: `Welcome ${req.admin.username} to the admin dashboard!` });
};
