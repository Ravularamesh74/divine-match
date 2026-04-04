import { motion } from "framer-motion";
import { Heart, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Profiles", value: "10M+" },
  { label: "Matches Made", value: "2M+" },
  { label: "Success Stories", value: "1.5L+" },
];

const CTASection = () => {
  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-br from-rose-600 via-pink-600 to-red-600 text-white">

      {/* 🔥 Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-white/10 blur-3xl rounded-full top-[-100px] left-[-100px] animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-yellow-300/10 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-pulse" />
      </div>

      {/* ✨ Floating Icons */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-16 left-10 opacity-20"
      >
        <Heart size={60} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-16 right-10 opacity-20"
      >
        <Sparkles size={60} />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">

        {/* MAIN CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* ICON */}
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-white/10 backdrop-blur-lg shadow-xl">
              <Heart className="w-10 h-10 text-white animate-pulse" />
            </div>
          </div>

          {/* TITLE */}
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Your Perfect Match is Just One Click Away 💖
          </h2>

          {/* SUBTEXT */}
          <p className="text-white/80 text-lg mb-10">
            Trusted by millions across India. Start your journey today and meet someone who truly understands you.
          </p>

          {/* 🔥 STATS (SOCIAL PROOF) */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg"
              >
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-rose-600 hover:bg-white/90 text-lg px-12 py-6 rounded-full font-semibold shadow-xl hover:scale-105 transition-transform"
            >
              🚀 Register Free Now
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 text-lg px-12 py-6 rounded-full backdrop-blur-md"
            >
              ❤️ View Success Stories
            </Button>
          </div>

          {/* 🔥 TRUST LINE */}
          <p className="text-sm text-white/60 mt-6 flex items-center justify-center gap-2">
            <Users size={16} /> 100% Verified Profiles • Privacy Protected • Trusted Platform
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;