import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import axios from "axios";

const API = "http://localhost:5000/api";

interface ContactInfo {
  companyName: string;
  tagline: string;
  mainPhone: string;
  alternatePhone: string;
  location: string;
  workingHours: string;
  whatsappNumber: string;
}

const Contact: React.FC = () => {
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await axios.get<ContactInfo>(`${API}/contact`);
      setContact(res.data);
    } catch (err) {
      console.error("Failed to fetch contact info", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!contact) return <div className="p-10 text-center">No contact data found</div>;

  const whatsappLink =
    "https://wa.me/" +
    contact.whatsappNumber +
    "?text=" +
    encodeURIComponent("Hello! I need home appliance service.");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <FloatingWhatsApp />

      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-20">
        <div className="container-premium text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-brand-red text-sm font-semibold uppercase tracking-wider">
              Get in Touch
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-5 text-foreground">
              Contact <span className="text-brand-red">Us</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Ready to get your appliance fixed? Reach out to us today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 section-light">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Left - Form */}
            <ContactForm />

            {/* Right - Dynamic Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Company Info */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {contact.companyName}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {contact.tagline}
                </p>
              </div>

              {/* Phone Cards */}
              <div className="space-y-3">

                <a
                  href={`tel:${contact.mainPhone}`}
                  className="premium-card rounded-xl p-4 flex items-center gap-4 group block"
                >
                  <Phone className="w-5 h-5 text-brand-red" />
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Call Us
                    </div>
                    <div className="font-medium text-foreground text-sm">
                      {contact.mainPhone}
                    </div>
                  </div>
                </a>

                {/* <a
                  href={`tel:${contact.alternatePhone}`}
                  className="premium-card rounded-xl p-4 flex items-center gap-4 group block"
                >
                  <Phone className="w-5 h-5 text-brand-red" />
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Alternate Number
                    </div>
                    <div className="font-medium text-foreground text-sm">
                      {contact.alternatePhone}
                    </div>
                  </div>
                </a> */}

                <div className="premium-card rounded-xl p-4 flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-brand-blue" />
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Location
                    </div>
                    <div className="font-medium text-foreground text-sm">
                      {contact.location}
                    </div>
                  </div>
                </div>

                <div className="premium-card rounded-xl p-4 flex items-center gap-4">
                  <Clock className="w-5 h-5 text-brand-brown" />
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Working Hours
                    </div>
                    <div className="font-medium text-foreground text-sm">
                      {contact.workingHours}
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="xl" className="w-full mt-4">
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </Button>
              </a>

              {/* Map */}
              <div className="mt-4 aspect-video rounded-xl overflow-hidden border border-border shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d80.0441462!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1706000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Location Map"
                />
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
