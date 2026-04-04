import { motion } from "framer-motion";
import { Heart, Shield, Users, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";
import { useEffect, useState } from "react";

const stats = [
  { icon: Users, value: 5000000, label: "Profiles" },
  { icon: Heart, value: 2000000, label: "Matches" },
  { icon: Shield, value: 100, label: "Verified %" },
  { icon: Star, value: 4.8, label: "Rating" },
];

const HeroSection = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));

  // 🔥 Animated Counter
  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((val, i) =>
          val < stats[i].value ? val + Math.ceil(stats[i].value / 50) : val
        )
      );
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[700px] flex items-center overflow-hidden">

      {/* 🔥 BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="couples"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      {/* 🔥 FLOATING BADGES */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 left-10 hidden lg:block"
      >
        <div className="bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full text-white text-sm">
          💍 1,200+ matches today
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-20 right-10 hidden lg:block"
      >
        <div className="bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full text-white text-sm">
          🔥 Trending in Hyderabad
        </div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* 🔥 LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 text-pink-300 text-sm mb-6">
              <Sparkles size={16} /> AI Powered Matchmaking
            </span>

            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Find Your <br />
              <span className="text-pink-400">Perfect Life Partner</span>
            </h1>

            <p className="text-white/80 text-lg mb-8 max-w-lg">
              Join millions of verified users. Smart AI suggestions + secure matchmaking.
            </p>

            {/* CTA */}
            <div className="flex gap-4 mb-10">
              <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 rounded-full text-lg shadow-xl hover:scale-105 transition">
                🚀 Register Free
              </Button>
              <Button variant="outline" className="border-white/30 text-white px-8 py-6 rounded-full">
                Browse Profiles
              </Button>
            </div>

            {/* 🔥 STATS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <stat.icon className="mx-auto mb-1 text-pink-400" />
                  <div className="text-xl font-bold text-white">
                    {stat.label === "Rating"
                      ? stat.value
                      : Math.min(counts[i], stat.value).toLocaleString()}
                  </div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 🔥 RIGHT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block"
          >
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">

              <h3 className="text-xl font-bold text-white mb-2">
                Start Your Journey ❤️
              </h3>
              <p className="text-white/60 text-sm mb-6">
                Takes less than 30 seconds
              </p>

              <div className="space-y-4">

                <input
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:ring-2 focus:ring-pink-400 outline-none"
                />

                <div className="grid grid-cols-2 gap-3">
                  <select className="px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20">
                    <option>Male</option>
                    <option>Female</option>
                  </select>

                  <select className="px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20">
                    <option>Religion</option>
                    <option>Hindu</option>
                    <option>Muslim</option>
                  </select>
                </div>

                <input
                  placeholder="Mobile Number"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white"
                />

                <Button className="w-full bg-pink-500 hover:bg-pink-600 py-6 text-lg rounded-xl shadow-xl">
                  Join Now
                </Button>

                <p className="text-xs text-white/50 text-center">
                  By continuing, you agree to Terms & Privacy Policy
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