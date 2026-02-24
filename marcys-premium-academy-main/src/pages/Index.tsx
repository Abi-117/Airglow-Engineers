import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Shield, Clock, Award, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import WhyChooseUs from "@/components/WhyChooseUs";
import GoogleReviews from "@/components/GoogleReviews";
import API from "../api"; // ✅ Use centralized axios

const BACKEND_URL = import.meta.env.VITE_API_URL;

/* ================= TYPES ================= */
interface Stat {
  value: string;
  label: string;
}

interface ServicePreview {
  title: string;
  description: string;
  images?: string[];
}

interface HomeData {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  whatsappNumber: string;
  phoneNumber: string;
  stats: Stat[];
  aboutTitle: string;
  aboutDescription: string;
  aboutPoints: string[];
  aboutImage: string;
  servicesSectionTitle: string;
  services: ServicePreview[];
  mapEmbed: string;
}

/* ================= DEFAULT DATA ================= */
const defaultHome: HomeData = {
  heroBadge: "Trusted Service",
  heroTitle: "Expert Home Appliance",
  heroSubtitle: "Repair Service",
  heroDescription:
    "Fast and reliable repair service for all major home appliances.",
  whatsappNumber: "919999999999",
  phoneNumber: "919999999999",
  stats: [],
  aboutTitle: "We Provide Professional Service",
  aboutDescription:
    "We are experts in repairing all types of home appliances.",
  aboutPoints: [],
  aboutImage: "",
  servicesSectionTitle: "Our Services",
  services: [],
  mapEmbed: "",
};

const iconMap: any = {
  Customers: Users,
  Experience: Award,
  Satisfaction: Shield,
  Response: Clock,
};

/* ================= SERVICE CARD ================= */
const ServiceCard = ({ service }: { service: ServicePreview }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!service.images || service.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % service.images!.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [service.images]);

  const imageUrl =
    service.images && service.images.length > 0
      ? `${BACKEND_URL}/uploads/${service.images[currentIndex]}`
      : "https://via.placeholder.com/400x300";

  return (
    <div className="premium-card rounded-xl overflow-hidden shadow-md">
      <div className="w-full h-60 relative">
        <img
          src={imageUrl}
          alt={service.title}
          className="w-full h-full object-cover transition-all duration-500"
        />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold mb-2">{service.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 whitespace-pre-line leading-relaxed">
          {service.description}
        </p>

        <Link to="/contact">
          <Button size="sm" className="w-full">
            Book Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

/* ================= MAIN PAGE ================= */
const Index = () => {
  const [home, setHome] = useState<HomeData>(defaultHome);

  useEffect(() => {
    API.get("/home")
      .then((res) => {
        if (res.data) setHome(res.data);
      })
      .catch(() => {
        console.log("Using default content");
      });
  }, []);

  const aboutImageUrl = home.aboutImage
    ? `${BACKEND_URL}/uploads/${home.aboutImage}`
    : "https://via.placeholder.com/600x400";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <FloatingWhatsApp />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <HeroSlider />
        <div className="relative z-10 container pt-36 pb-10">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-red/20 text-white text-xs font-semibold mb-4">
              {home.heroBadge}
            </span>

            <h1 className="text-3xl md:text-6xl font-bold text-white mb-5">
              {home.heroTitle}{" "}
              <span className="text-brand-orange">
                {home.heroSubtitle}
              </span>
            </h1>

            <p className="text-lg text-white/80 mb-8">
              {home.heroDescription}
            </p>

            <div className="flex gap-3">
              <Link to="/contact">
                <Button variant="hero" size="xl">
                  Book Now <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>

              <a href={`tel:${home.phoneNumber}`}>
                <Button variant="hero" className="bg-black" size="xl">
                  <Phone className="w-5 h-5" /> Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container-premium grid grid-cols-2 md:grid-cols-4 gap-8">
          {home.stats?.map((stat, index) => {
            const Icon = iconMap[stat.label] || Users;
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-brand-red/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-brand-red" />
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20">
        <div className="container-premium grid lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <img
              src={aboutImageUrl}
              alt="About"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">
              {home.aboutTitle}
            </h2>

            <p className="mb-6 text-muted-foreground">
              {home.aboutDescription}
            </p>

            <div className="space-y-2">
              {home.aboutPoints?.map((point, i) => (
                <div key={i} className="flex gap-2">
                  <div className="w-1.5 h-1.5 bg-brand-red rounded-full mt-2" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 section-light">
        <h3 className="text-brand-red text-center text-sm font-semibold uppercase tracking-wider">
          {home.servicesSectionTitle}
        </h3>

        <div className="container-premium grid md:grid-cols-3 gap-6 mt-10">
          {home.services?.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </section>

      <WhyChooseUs />
      <GoogleReviews />
      <Footer />
    </div>
  );
};

export default Index;