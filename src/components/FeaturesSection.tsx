import { motion } from "framer-motion";
import { Shield, Search, MessageCircle, Star, Lock, Sparkles } from "lucide-react";

const features = [
  { icon: Shield, title: "Verified Profiles", desc: "Every profile is verified through govt. ID and phone number for authenticity." },
  { icon: Search, title: "Advanced Search", desc: "Filter by religion, caste, profession, education, location, and more." },
  { icon: MessageCircle, title: "Secure Messaging", desc: "Connect privately with matches through our encrypted chat system." },
  { icon: Star, title: "AI Matchmaking", desc: "Our intelligent algorithm suggests the most compatible profiles for you." },
  { icon: Lock, title: "Privacy Controls", desc: "Control who sees your profile with advanced privacy settings." },
  { icon: Sparkles, title: "Horoscope Match", desc: "Get detailed horoscope compatibility analysis for your matches." },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-crimson/10 text-crimson text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            India's Most Trusted Matrimony
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Premium features designed to help you find the perfect life partner
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-hero mx-auto mb-5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-elevated">
                <f.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
