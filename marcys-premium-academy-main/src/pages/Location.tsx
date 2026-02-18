import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import API from "../api"; // your axios instance

const whatsappLink =
  "https://wa.me/919952006778?text=" +
  encodeURIComponent("Hello! I need home appliance service.");

interface LocationItem {
  _id: string;
  name: string;
}

const Location = () => {
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLocations = async () => {
    try {
      const res = await API.get("/location"); // GET all locations from backend
      setLocations(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch locations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <FloatingWhatsApp />

      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-20">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-brand-red text-sm font-semibold uppercase tracking-wider">
              Service Areas
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-5 text-foreground">
              Serving All Across <span className="text-brand-red">Chennai</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Fast doorstep service across multiple areas in Chennai and
              surrounding localities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Location Grid */}
      <section className="py-20 section-light">
        <div className="container-premium">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {locations.map((loc, index) => (
              <motion.div
                key={loc._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.02 }}
                viewport={{ once: true }}
                className="premium-card rounded-xl p-5 text-center group cursor-pointer"
              >
                <MapPin className="w-5 h-5 text-brand-red mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-display font-semibold text-foreground text-sm group-hover:text-brand-red transition-colors">
                  {loc.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Our Coverage Area
            </h2>
            <div className="h-[3px] w-[60px] bg-brand-brown rounded mx-auto" />
          </motion.div>
          <div className="aspect-[2/1] rounded-2xl overflow-hidden border border-border shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d80.0441462!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1706000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Service Coverage"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-foreground">
        <div className="container-premium text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Need Service in Your Area?
            </h2>
            <p className="text-white/60 mb-6">
              Book now and our technician will be at your doorstep within hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/contact" target="_self" rel="noopener noreferrer">
                <Button variant="hero" size="xl">
                  Book Now
                </Button>
              </a>
              <a href="tel:+919952006778">
                <Button
                  variant="hero-outline"
                  size="xl"
                  className="text-white border-white/30 hover:border-white hover:bg-white/10 hover:text-white"
                >
                  <Phone className="w-5 h-5" /> Call Now
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Location;
