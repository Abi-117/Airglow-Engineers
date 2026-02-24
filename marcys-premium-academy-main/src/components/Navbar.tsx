import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/wecare.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Location', path: '/location' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const whatsappLink = 'https://wa.me/919952006778?text=' + encodeURIComponent('Hello! I need home appliance service.');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-card/98 backdrop-blur-md border-b border-border shadow-md'
          : 'bg-card/80 backdrop-blur-sm'
      }`}
    >
      {/* Top bar */}
      <div className="hidden md:block bg-foreground text-primary-foreground">
        <div className="container-premium flex items-center justify-between py-1.5 text-xs">
          <div className="flex items-center gap-4">
            <a href="tel:+919952006778" className="flex items-center gap-1 hover:text-brand-orange transition-colors">
              <Phone className="w-3 h-3" /> +91-9952006778
            </a>
            
          </div>
          <span className="text-primary-foreground/70">Chennai's Trusted Home Appliance Service</span>
        </div>
      </div>

      <div className="container-premium">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img
              src={logo}
              alt="Airglow Engineers"
              className="h-20 md:h-20 w-auto object-contain"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 nav-underline ${
                  location.pathname === link.path
                    ? 'text-brand-red'
                    : 'text-foreground/70 hover:text-brand-red'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="ml-4">
              <Button variant="brand-red" size="lg">
                <Phone className="w-4 h-4" />
                Book Now
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="container-premium py-4 space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      location.pathname === link.path
                        ? 'bg-brand-red/10 text-brand-red'
                        : 'text-foreground/70 hover:bg-muted hover:text-brand-red'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-3"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="brand-red" className="w-full" size="lg">
                    <Phone className="w-4 h-4" />
                    Book Now
                  </Button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
