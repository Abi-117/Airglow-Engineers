import { motion } from 'framer-motion';
import { Shield, Clock, Award, Wrench, ThumbsUp, HeadphonesIcon } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    title: 'Trusted & Verified',
    description: 'All our AC, refrigerator & washing machine technicians are background-verified, certified and professionally trained to handle all major brands.',
  },
  {
    icon: Clock,
    title: 'Same-Day Service',
    description: 'Book your appliance repair today and get quick technician support within hours anywhere in Chennai.',
  },
  {
    icon: Award,
    title: '10+ Years Experience',
    description: 'Serving Chennai homes and businesses with expert AC service, fridge repair & washing machine repair since 2014.',
  },
  {
    icon: Wrench,
    title: 'Genuine Parts Only',
    description: 'We use only original spare parts to ensure long-lasting performance and safe appliance repair.',
  },
  {
    icon: ThumbsUp,
    title: 'Satisfaction Guaranteed',
    description: "Not satisfied with our service? We will fix the issue again at no extra cost.",
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Facing urgent AC or fridge breakdown? Call us anytime for immediate assistance in Chennai.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 section-light">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-brand-red text-sm font-semibold uppercase tracking-wider">Why Us</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4 text-foreground">
            Why Choose Airglow Engineers?
          </h2>
          <div className="h-[3px] w-[60px] bg-brand-brown rounded mx-auto" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="premium-card rounded-xl p-7 group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center mb-5 group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
                <reason.icon className="w-6 h-6 text-brand-red group-hover:text-white transition-colors duration-300" />
              </div>
              <h4 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-brand-red transition-colors duration-300">
                {reason.title}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
