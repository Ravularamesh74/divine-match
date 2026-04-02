import { motion } from "framer-motion";
import { Heart, Shield, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

const stats = [
  { icon: Users, value: "5M+", label: "Profiles" },
  { icon: Heart, value: "2M+", label: "Happy Marriages" },
  { icon: Shield, value: "100%", label: "Verified" },
  { icon: Star, value: "4.8", label: "Rating" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroBanner} alt="Happy couples" className="w-full h-full object-cover" width={1920} height={800} />
        <div className="absolute inset-0 bg-gradient-to-r from-warm-brown/90 via-warm-brown/70 to-warm-brown/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold-light text-sm font-medium mb-6">
              #1 Matrimony Service
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
              <span className="text-primary-foreground">Find Your</span>
              <br />
              <span className="text-gold-light">Perfect Life Partner</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg font-body">
              Join millions who found their soulmate. Trusted by families across India for over a decade. Your story of forever begins here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-gradient-hero text-primary-foreground hover:opacity-90 text-base px-8 py-6 rounded-full shadow-elevated">
                Register Free
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 py-6 rounded-full">
                Browse Profiles
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-5 h-5 text-gold-light mx-auto mb-1" />
                  <div className="text-2xl font-heading font-bold text-primary-foreground">{stat.value}</div>
                  <div className="text-xs text-primary-foreground/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="bg-card/95 backdrop-blur-md rounded-2xl p-8 shadow-elevated border border-border">
              <h3 className="text-xl font-heading font-bold text-foreground mb-1">Register Free</h3>
              <p className="text-sm text-muted-foreground mb-6">Find your perfect match today</p>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Profile for</label>
                  <select className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground text-sm focus:ring-2 focus:ring-crimson focus:border-crimson outline-none transition">
                    <option>Myself</option>
                    <option>Son</option>
                    <option>Daughter</option>
                    <option>Brother</option>
                    <option>Sister</option>
                    <option>Friend</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                  <input type="text" placeholder="Enter your name" className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-crimson focus:border-crimson outline-none transition" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Gender</label>
                    <select className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground text-sm focus:ring-2 focus:ring-crimson focus:border-crimson outline-none transition">
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Religion</label>
                    <select className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground text-sm focus:ring-2 focus:ring-crimson focus:border-crimson outline-none transition">
                      <option>Hindu</option>
                      <option>Muslim</option>
                      <option>Christian</option>
                      <option>Sikh</option>
                      <option>Jain</option>
                      <option>Buddhist</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Mobile Number</label>
                  <div className="flex gap-2">
                    <select className="w-20 px-2 py-3 rounded-lg bg-muted border border-border text-foreground text-sm focus:ring-2 focus:ring-crimson outline-none transition">
                      <option>+91</option>
                    </select>
                    <input type="tel" placeholder="Enter mobile number" className="flex-1 px-4 py-3 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-crimson focus:border-crimson outline-none transition" />
                  </div>
                </div>
                <Button className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90 py-6 text-base rounded-lg shadow-elevated">
                  Register Free
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  By registering, you agree to our <a href="#" className="text-crimson hover:underline">Terms</a> & <a href="#" className="text-crimson hover:underline">Privacy Policy</a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
