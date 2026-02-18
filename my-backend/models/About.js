// models/About.js
import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  bannerImage: { type: String },
});

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
});

const achievementSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  image: { type: String },
});


const ctaSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  subtext: { type: String, required: true },
  contactNumber: { type: String, required: true },
});

export const Hero = mongoose.model("Hero", heroSchema);
export const Story = mongoose.model("Story", storySchema);
export const Achievement = mongoose.model("Achievement", achievementSchema);
export const CTA = mongoose.model("CTA", ctaSchema);
