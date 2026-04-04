import { motion } from "framer-motion";
import {
  Shield,
  Search,
  MessageCircle,
  Star,
  Lock,
  Sparkles,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Profiles",
    desc: "Govt ID + phone verification ensures 100% authentic users.",
    tag: "Trusted",
  },
  {
    icon: Search,
    title: "Advanced Search",
    desc: "Powerful filters for religion, caste, profession & lifestyle.",
    tag: "Smart",
  },
  {
    icon: MessageCircle,
    title: "Secure Messaging",
    desc: "End-to-end encrypted chat with privacy-first architecture.",
    tag: "Private",
  },
  {
    icon: Star,
    title: "AI Matchmaking",
    desc: "Machine learning suggests highly compatible matches.",
    tag: "AI Powered",
  },
  {
    icon: Lock,
    title: "Privacy Controls",
    desc: "Control visibility, photos & contact access with ease.",
    tag: "Safe",
  },
  {
    icon: Sparkles,
    title: "Horoscope Match",
    desc: "Accurate kundali matching with detailed compatibility.",
    tag: "Traditional",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative py-28 bg-gradient-to-b from-white via-rose-50/40 to-white overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pink-200/30 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-rose-200/30 blur-3xl rounded-full" />

      <div className="container mx-auto px-4 relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-rose-100 text-rose-600 text-sm font-semibold mb-4">
            Why Choose Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Built for Serious Relationships ❤️
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Experience a modern, secure and intelligent matchmaking platform trusted by millions across India.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative group"
            >
              {/* CARD */}
              <div className="relative p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">

                {/* TAG */}
                <span className="absolute top-4 right-4 text-xs bg-rose-100 text-rose-600 px-3 py-1 rounded-full font-medium">
                  {f.tag}
                </span>

                {/* ICON */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition">
                  <f.icon className="w-7 h-7 text-white" />
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>

                {/* DESCRIPTION */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {f.desc}
                </p>

                {/* EXTRA TRUST LINE */}
                <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
                  <CheckCircle size={14} />
                  Highly rated by users
                </div>

                {/* HOVER GRADIENT BORDER */}
                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-rose-300/40 transition pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🔥 BOTTOM TRUST STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 text-center"
        >
          <p className="text-sm text-muted-foreground">
            🔒 Trusted by 10M+ users • 🛡️ 100% Verified Profiles • ❤️ Millions of Success Stories
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;