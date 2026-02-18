import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Karthik Raman',
    rating: 5,
    text: 'Excellent AC service! The technician arrived within 2 hours and fixed the issue quickly. Very professional and transparent pricing.',
    date: '1 week ago',
  },
  {
    name: 'Priya Nair',
    rating: 5,
    text: 'Had a washing machine breakdown and called Airglow. They sent someone the same day. Great work and reasonable charges.',
    date: '2 weeks ago',
  },
  {
    name: 'Suresh Kumar',
    rating: 5,
    text: 'Best fridge repair service in Chennai. They used genuine parts and the fridge is working perfectly now. Highly recommend!',
    date: '3 weeks ago',
  },
  {
    name: 'Meena Sundaram',
    rating: 5,
    text: 'Airglow Engineers has been our go-to for all home appliance repairs. Trustworthy, skilled, and always on time.',
    date: '1 month ago',
  },
];

const GoogleReviews = () => {
  return (
    <section className="py-20">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-brand-red text-sm font-semibold uppercase tracking-wider">Testimonials</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4 text-foreground">
            What Our Customers Say
          </h2>
          <div className="divider-brown mx-auto mb-6" />
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-4xl font-bold text-foreground">4.8</span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-muted-foreground text-sm">Based on 200+ Google Reviews</span>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="premium-card rounded-xl p-6 relative group"
            >
              <Quote className="absolute top-5 right-5 w-6 h-6 text-brand-red/10 group-hover:text-brand-red/20 transition-colors duration-300" />
              
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              
              <p className="text-foreground/80 text-sm leading-relaxed mb-4">"{review.text}"</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-red/10 flex items-center justify-center">
                    <span className="text-brand-red font-semibold text-sm">{review.name.charAt(0)}</span>
                  </div>
                  <span className="font-medium text-foreground text-sm">{review.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
