import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    // ✅ MULTIPLE IMAGES
    images: [{ type: String }],

    type: {
      type: String,
      enum: ["main", "advanced"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);
