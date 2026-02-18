import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
  const whatsappLink = 'https://wa.me/919952006778?text=' + encodeURIComponent('Hello! I need home appliance service.');

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <motion.div
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.4)] group-hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] transition-shadow duration-300 animate-pulse-subtle"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-7 h-7 text-white" fill="white" />
      </motion.div>

      <motion.span
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-card border border-border text-foreground text-xs font-medium whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        Chat with us!
      </motion.span>
    </motion.a>
  );
};

export default FloatingWhatsApp;
