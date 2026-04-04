import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useState, useEffect } from "react";

import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import couple3 from "@/assets/couple-3.jpg";

const stories = [
  {
    image: couple1,
    names: "Rahul & Priya",
    location: "Hyderabad",
    profession: "Software Engineer & Doctor",
    years: "Married 2 years",
    rating: 5,
    quote:
      "We found each other on VivahMatrimony and knew it was destiny. The platform made it effortless for our families.",
  },
  {
    image: couple2,
    names: "Arjun & Sneha",
    location: "Mumbai",
    profession: "Entrepreneur & Designer",
    years: "Married 1.5 years",
    rating: 5,
    quote:
      "The AI matchmaking was surprisingly accurate. Everything just clicked perfectly.",
  },
  {
    image: couple3,
    names: "Vikram & Lakshmi",
    location: "Chennai",
    profession: "Engineer & Teacher",
    years: "Married 3 years",
    rating: 5,
    quote:
      "Verified profiles gave us confidence. We are forever grateful to this platform.",
  },
];

const SuccessStories = () => {
  const [index, setIndex] = useState(0);

  // 🔥 AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % stories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-28 bg-gradient-to-b from-white via-rose-50/30 to-white overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pink-200/30 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-rose-200/30 blur-3xl rounded-full" />

      <div className="container mx-auto px-4 relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="px-5 py-2 rounded-full bg-rose-100 text-rose-600 text-sm font-semibold">
            ❤️ Real Love Stories
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
            Millions Found Their Forever
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Discover real couples who turned matches into marriages.
          </p>
        </motion.div>

        {/* 🔥 MAIN CARD */}
        <div className="relative max-w-5xl mx-auto">

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/30"
            >
              {/* IMAGE */}
              <div className="relative h-[350px] md:h-auto">
                <img
                  src={stories[index].image}
                  alt={stories[index].names}
                  className="w-full h-full object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold">
                    {stories[index].names}
                  </h3>
                  <p className="text-sm opacity-80">
                    {stories[index].location}
                  </p>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-8 flex flex-col justify-center">

                {/* RATING */}
                <div className="flex gap-1 mb-3">
                  {[...Array(stories[index].rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* PROFESSION */}
                <p className="text-sm text-muted-foreground mb-2">
                  {stories[index].profession}
                </p>

                {/* YEARS */}
                <p className="text-xs text-green-600 font-medium mb-4">
                  {stories[index].years}
                </p>

                {/* QUOTE */}
                <Quote className="text-rose-400 mb-3" size={30} />
                <p className="text-muted-foreground italic leading-relaxed">
                  "{stories[index].quote}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 🔥 DOT NAVIGATION */}
          <div className="flex justify-center gap-3 mt-8">
            {stories.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition ${
                  i === index ? "bg-rose-500 scale-125" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;