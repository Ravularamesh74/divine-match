import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import couple3 from "@/assets/couple-3.jpg";

const stories = [
  {
    image: couple1,
    names: "Rahul & Priya",
    location: "Hyderabad",
    quote: "We found each other on VivahMatrimony and knew it was destiny. The platform made it so easy for our families to connect.",
  },
  {
    image: couple2,
    names: "Arjun & Sneha",
    location: "Mumbai",
    quote: "After months of searching, VivahMatrimony matched us perfectly. Our horoscopes aligned and so did our hearts!",
  },
  {
    image: couple3,
    names: "Vikram & Lakshmi",
    location: "Chennai",
    quote: "The verified profiles gave us confidence. We're so grateful for this platform that brought us together forever.",
  },
];

const SuccessStories = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold-dark text-sm font-medium mb-4">
            Real Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            Millions of Happy Marriages
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every love story is unique. Here are some couples who found their forever on our platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <motion.div
              key={story.names}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-background rounded-2xl overflow-hidden shadow-card border border-border group hover:shadow-elevated transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.names}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={512}
                  height={512}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-brown/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-lg font-heading font-bold text-primary-foreground">{story.names}</h3>
                  <p className="text-sm text-primary-foreground/80">{story.location}</p>
                </div>
              </div>
              <div className="p-6">
                <Quote className="w-8 h-8 text-gold/40 mb-3" />
                <p className="text-muted-foreground text-sm leading-relaxed italic">"{story.quote}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
