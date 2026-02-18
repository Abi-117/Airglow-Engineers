import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    appliance: { type: String, required: true },
    brand: { type: String, required: true },
    issue: { type: String, required: true },
    description: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("ServiceRequest", serviceRequestSchema);
