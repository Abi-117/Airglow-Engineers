import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';
import logo from '@/assets/wecare.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container-premium py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link to="/" className="inline-block">
              <img src={logo} alt="Airglow Engineers" className="h-14 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Chennai's most trusted home appliance service company. Expert repair & maintenance for AC, Refrigerator, and Washing Machine.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="font-display text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Location', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-primary-foreground/60 hover:text-brand-orange transition-colors duration-300 text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="font-display text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li>AC Service & Repair</li>
              <li>Refrigerator Service</li>
              <li>Washing Machine Service</li>
              <li>Chiller Services</li>
              <li>Commercial AC</li>
              <li>Industrial Refrigeration</li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="font-display text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+919952006778" className="flex items-center gap-3 text-primary-foreground/60 hover:text-brand-orange transition-colors duration-300 text-sm">
                  <Phone className="w-4 h-4 text-brand-orange" />
                  +91-9952006778
                </a>
              </li>
              
              <li>
                <div className="flex items-center gap-3 text-primary-foreground/60 text-sm">
                  <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0" />
                  Chennai, Tamil Nadu
                </div>
              </li>
            </ul>

            {/* Social Icons */}
            {/* <div className="flex items-center gap-3 pt-4">
              {[
                { icon: Instagram, href: 'https://instagram.com' },
                { icon: Facebook, href: 'https://facebook.com' },
                { icon: Twitter, href: 'https://twitter.com' },
                { icon: MessageCircle, href: 'https://wa.me/919952006778' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div> */}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50"
        >
          <p>© {currentYear} Airglow Engineers. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-brand-orange transition-colors">Privacy Policy</Link>
            <span className="text-primary-foreground/20">|</span>
            <span>
              Powered by{' '}
              <a href="https://zenelait.com" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:text-brand-orange/80 transition-colors">
                Zenelait Info Tech
              </a>
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
