import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 md:pt-40 pb-20">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-foreground">Privacy Policy</h1>

            <div className="space-y-6 text-muted-foreground">
              <p>At Airglow Engineers, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information.</p>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">Information We Collect</h2>
              <p>We may collect personal information such as your name, phone number, address, and service requirements when you contact us or book a service.</p>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and improve our services</li>
                <li>To communicate with you about service appointments</li>
                <li>To send you relevant updates and offers</li>
                <li>To respond to your inquiries</li>
              </ul>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <p className="text-brand-red">Phone: +91-9952006778 </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;
