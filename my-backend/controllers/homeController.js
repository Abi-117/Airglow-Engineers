import Home from "../models/Home.js";

export const getHome = async (req, res) => {
  try {
    const home = await Home.findOne();
    res.json(home);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHome = async (req, res) => {
  try {
    const {
      heroBadge,
      heroTitle,
      heroSubtitle,
      heroDescription,
      phoneNumber,
      whatsappNumber,
      aboutTitle,
      aboutDescription,
      mapEmbed,
      stats,
      aboutPoints,
      services,
    } = req.body;

    let parsedServices = JSON.parse(services);

    // Handle uploaded files
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {

        // ABOUT IMAGE
        if (file.fieldname === "aboutImage") {
          req.body.aboutImage = file.filename;
        }

        // SERVICE IMAGES
        const match = file.fieldname.match(/serviceImages_(\d+)/);

        if (match) {
          const serviceIndex = parseInt(match[1]);

          if (!parsedServices[serviceIndex].images) {
            parsedServices[serviceIndex].images = [];
          }

          parsedServices[serviceIndex].images.push(file.filename);
        }
      });
    }

    const updatedData = {
      heroBadge,
      heroTitle,
      heroSubtitle,
      heroDescription,
      phoneNumber,
      whatsappNumber,
      aboutTitle,
      aboutDescription,
      mapEmbed,
      stats: JSON.parse(stats),
      aboutPoints: JSON.parse(aboutPoints),
      services: parsedServices,
      aboutImage: req.body.aboutImage,
    };

    await Home.findOneAndUpdate({}, updatedData, { upsert: true });

    res.json({ message: "Home updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Update failed" });
  }
};



