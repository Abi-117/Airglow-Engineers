import mongoose from "mongoose";

const statSchema = new mongoose.Schema({
  value: String,
  label: String,
});

// Now each service has multiple images
const servicePreviewSchema = new mongoose.Schema({
  title: String,
  description: String,
  images: { type: [String], default: [] }, // array of image filenames
});

const homeSchema = new mongoose.Schema(
  {
    heroBadge: String,
    heroTitle: String,
    heroSubtitle: String,
    heroDescription: String,
    whatsappNumber: String,
    phoneNumber: String,

    stats: [statSchema],

    aboutTitle: String,
    aboutDescription: String,
    aboutPoints: [String],
    aboutImage: String,

    services: [servicePreviewSchema], // each service now has multiple images

    mapEmbed: String,
  },
  { timestamps: true }
);

export default mongoose.model("Home", homeSchema);
