import Home from "../models/Home.js";

export const getHome = async (req,res)=>{
  try{
    const home = await Home.findOne();
    res.json(home);
  }catch(err){
    res.status(500).json({message:err.message});
  }
};

export const updateHome = async (req,res)=>{
  try{
    let home = await Home.findOne();
    if(!home) home = new Home({});

    const {
      heroBadge, heroTitle, heroSubtitle, heroDescription,
      whatsappNumber, phoneNumber, stats, aboutTitle, aboutDescription,
      aboutPoints, aboutImage, services, mapEmbed
    } = req.body;

    home.heroBadge = heroBadge ?? home.heroBadge;
    home.heroTitle = heroTitle ?? home.heroTitle;
    home.heroSubtitle = heroSubtitle ?? home.heroSubtitle;
    home.heroDescription = heroDescription ?? home.heroDescription;
    home.whatsappNumber = whatsappNumber ?? home.whatsappNumber;
    home.phoneNumber = phoneNumber ?? home.phoneNumber;
    home.aboutTitle = aboutTitle ?? home.aboutTitle;
    home.aboutDescription = aboutDescription ?? home.aboutDescription;
    home.aboutImage = aboutImage ?? home.aboutImage;
    home.mapEmbed = mapEmbed ?? home.mapEmbed;

    home.stats = Array.isArray(stats) ? stats : home.stats;
    home.aboutPoints = Array.isArray(aboutPoints) ? aboutPoints : home.aboutPoints;
    home.services = Array.isArray(services) ? services : home.services;

    await home.save();
    res.json({message:"Home updated successfully ✅", home});
  }catch(err){
    console.error(err);
    res.status(500).json({message:err.message});
  }
};