import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeading = ({ title, subtitle, centered = true }: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}
    >
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gold-gradient gold-glow mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-6 flex items-center justify-center gap-2">
        <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-gold" />
        <span className="w-3 h-3 rounded-full bg-gold animate-pulse" />
        <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-gold" />
      </div>
    </motion.div>
  );
};

export default SectionHeading;
