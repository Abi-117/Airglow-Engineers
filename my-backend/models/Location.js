import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

export const Location = mongoose.model("Location", locationSchema);
