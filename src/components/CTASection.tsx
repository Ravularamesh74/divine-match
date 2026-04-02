import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary-foreground/5 animate-float" />
      <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-primary-foreground/5 animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <Heart className="w-12 h-12 text-primary-foreground/80 mx-auto mb-6 animate-float" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
            Your Soulmate is Waiting
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Join millions of happy families who found their perfect match. Register today and start your journey to forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary-foreground text-crimson hover:bg-primary-foreground/90 text-base px-10 py-6 rounded-full font-semibold">
              Register Free Now
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 text-base px-10 py-6 rounded-full">
              View Success Stories
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
