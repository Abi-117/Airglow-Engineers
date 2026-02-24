import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhyChooseUs from "@/components/WhyChooseUs";
import GoogleReviews from "@/components/GoogleReviews";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import API from "../api";
import { Phone } from "lucide-react";
import about from "../assets/about.jpeg";

interface StoryItem {
  _id: string;
  title: string;
  description: string;
}

interface AchievementItem {
  _id: string;
  value: string;
  label: string;
  image?: string;
}

interface HeroData {
  title: string;
  subtitle: string;
  bannerImage?: string;
}

interface CTAData {
  heading: string;
  subtext: string;
  contactNumber: string;
}

const BACKEND_URL = import.meta.env.VITE_API_URL; // 👈 Render backend URL

const About = () => {
  const [hero, setHero] = useState<HeroData>({ title: "", subtitle: "" });
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [cta, setCta] = useState<CTAData>({
    heading: "",
    subtext: "",
    contactNumber: "",
  });
  const [loading, setLoading] = useState(true);

  const whatsappLink = cta.contactNumber
    ? `https://wa.me/${cta.contactNumber}?text=${encodeURIComponent(
        "Hello! I need home appliance service."
      )}`
    : "#";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [heroRes, storyRes, achRes, ctaRes] = await Promise.all([
          API.get("/about/hero"),
          API.get("/about/story"),
          API.get("/about/achievements"),
          API.get("/about/cta"),
        ]);

        setHero(heroRes.data || {});
        setStories(storyRes.data || []);
        setAchievements(achRes.data || []);
        setCta(ctaRes.data || {});
      } catch (err) {
        console.error("About Page Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="p-8 text-center text-lg font-medium">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <FloatingWhatsApp />

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 overflow-hidden">
        <div className="container-premium text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-brand-red text-sm font-semibold uppercase tracking-wider">
              About Us
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-5 text-foreground">
              {hero?.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              {hero?.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 section-light">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="text-brand-red text-sm font-semibold uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-5 text-foreground">
                Who We Are
              </h2>

              <div className="space-y-4 text-muted-foreground text-justify leading-relaxed">
                {stories.map((s) => (
                  <p key={s._id}>{s.description}</p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={about}
                  alt="Team"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-foreground">
        <div className="container-premium">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((a, i) => (
              <motion.div
                key={a._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="font-display text-4xl md:text-5xl font-bold text-white mb-1">
                  {a.value}
                </div>
                <div className="text-white/60 text-sm">{a.label}</div>

                {a.image && (
                  <img
                    src={
                      a.image.startsWith("http")
                        ? a.image
                        : `${BACKEND_URL}${a.image}`
                    }
                    alt={a.label}
                    className="mx-auto mt-2 w-20 h-12 object-cover"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <GoogleReviews />

      {/* CTA */}
      <section className="py-20 section-light">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {cta?.heading}
            </h2>
            <p className="text-muted-foreground mb-8">{cta?.subtext}</p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact">
                <Button variant="brand-red" size="xl">
                  <Phone className="w-5 h-5" />
                  Contact Us
                </Button>
              </Link>

              {cta.contactNumber && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="whatsapp" size="xl">
                    WhatsApp Us
                  </Button>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;