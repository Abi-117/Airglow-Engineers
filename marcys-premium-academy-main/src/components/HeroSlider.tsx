import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import heroAc from '@/assets/hero-ac.jpg';
import heroWashing from '@/assets/hero-washing.jpg';
import heroFridge from '@/assets/hero-fridge.jpg';

const slides = [
  {
    image: heroAc,
    title: 'Expert AC Service',
    subtitle: 'Split AC • Window AC • Commercial AC',
    cta: 'All brands serviced with genuine parts',
  },
  {
    image: heroWashing,
    title: 'Washing Machine Repair',
    subtitle: 'Front Load • Top Load • Semi-Automatic',
    cta: 'Quick doorstep service across Chennai',
  },
  {
    image: heroFridge,
    title: 'Refrigerator Service',
    subtitle: 'Single Door • Double Door • Side-by-Side',
    cta: 'Same-day repair by certified technicians',
  },
];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={slides[currentIndex].image}
          alt={slides[currentIndex].title}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-foreground/20" />

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? 'w-8 bg-brand-red'
                : 'w-4 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
