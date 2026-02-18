import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhyChooseUs from "@/components/WhyChooseUs";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import API from "../api";

interface ServiceItem {
  _id: string;
  title: string;
  description: string;
  type: "main" | "advanced";
  images?: string[]; // ✅ multiple images
}

const whatsappLink =
  "https://wa.me/919952006778?text=" +
  encodeURIComponent("Hello! I need home appliance service.");

// ---------------- SERVICE CARD ----------------
const ServiceCard = ({
  title,
  images = [],
  description,
}: {
  title: string;
  images?: string[];
  description: string;
}) => {
  const [imgIndex, setImgIndex] = useState(0);

  // Auto image slider (3 sec)
  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="premium-card rounded-xl overflow-hidden shadow-lg mx-auto w-full max-w-4xl h-[65rem] flex flex-col bg-white">

      {/* 🔥 IMAGE SECTION (TOP) */}
      {images.length > 0 && (
        <div className="h-1/2 relative overflow-hidden">
          <img
            src={`http://localhost:5000${images[imgIndex]}`}
            alt={title}
            className="w-full h-full object-cover transition-all duration-700"
          />

          {/* Dots Indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i === imgIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 🔥 CONTENT SECTION */}
      {/* 🔥 CONTENT SECTION */}
<div className="p-6 flex flex-col gap-4 h-1/2">

  <h3 className="font-display text-2xl font-bold text-center">
    {title}
  </h3>

  <p className="text-muted-foreground text-base whitespace-pre-line leading-relaxed text-left overflow-y-auto max-h-96">
    {description}
  </p>

  <div className="mt-auto text-center">
    <a href="/contact">
      <Button variant="brand-outline" size="lg">
        <Phone className="w-5 h-5 mr-2" /> Book Now
      </Button>
    </a>
  </div>

</div>

    </div>
  );
};

// ---------------- SERVICES PAGE ----------------
const Services = () => {
  const [mainServices, setMainServices] = useState<ServiceItem[]>([]);
  const [advancedServices, setAdvancedServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [mainIndex, setMainIndex] = useState(0);
  const [advancedIndex, setAdvancedIndex] = useState(0);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await API.get("/services");

      setMainServices(
        res.data.filter((s: ServiceItem) => s.type === "main")
      );
      setAdvancedServices(
        res.data.filter((s: ServiceItem) => s.type === "advanced")
      );
    } catch (err) {
      console.error(err);
      alert("Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  const nextMain = () =>
    setMainIndex((prev) => (prev + 1) % mainServices.length);

  const prevMain = () =>
    setMainIndex(
      (prev) => (prev - 1 + mainServices.length) % mainServices.length
    );

  const nextAdvanced = () =>
    setAdvancedIndex((prev) => (prev + 1) % advancedServices.length);

  const prevAdvanced = () =>
    setAdvancedIndex(
      (prev) =>
        (prev - 1 + advancedServices.length) %
        advancedServices.length
    );

  const cardVariants = {
    enter: { opacity: 0, x: 300 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -300 },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <FloatingWhatsApp />

      {/* HERO */}
      <section className="relative pt-32 md:pt-40 pb-20 text-center">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-brand-red text-sm font-semibold uppercase tracking-wider">
              Our Services
            </span>

            <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-5 text-foreground">
              Professional Home Appliance{" "}
              <span className="text-brand-red">
                Services
              </span>
            </h1>

            <p className="text-muted-foreground text-lg">
              Residential & commercial repair,
              maintenance, and installation across Chennai.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAIN SERVICES */}
      <section className="py-20 section-light">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-8">
          Core Services
        </h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            {mainServices[mainIndex] && (
              <motion.div
                key={mainServices[mainIndex]._id}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <ServiceCard {...mainServices[mainIndex]} />
              </motion.div>
            )}
          </AnimatePresence>

          {mainServices.length > 1 && (
            <>
              <button
                onClick={prevMain}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/30 text-white px-4 py-2 rounded"
              >
                ‹
              </button>

              <button
                onClick={nextMain}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/30 text-white px-4 py-2 rounded"
              >
                ›
              </button>
            </>
          )}
        </div>
      </section>

      {/* ADVANCED SERVICES */}
      <section className="py-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-8">
          Advanced Services
        </h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            {advancedServices[advancedIndex] && (
              <motion.div
                key={advancedServices[advancedIndex]._id}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <ServiceCard {...advancedServices[advancedIndex]} />
              </motion.div>
            )}
          </AnimatePresence>

          {advancedServices.length > 1 && (
            <>
              <button
                onClick={prevAdvanced}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/30 text-white px-4 py-2 rounded"
              >
                ‹
              </button>

              <button
                onClick={nextAdvanced}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/30 text-white px-4 py-2 rounded"
              >
                ›
              </button>
            </>
          )}
        </div>
      </section>

      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default Services;
