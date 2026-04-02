import { motion } from "framer-motion";
import { MapPin, BookOpen, Briefcase, Globe, Users, Heart } from "lucide-react";

const categories = [
  {
    icon: BookOpen,
    title: "By Religion",
    items: ["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist"],
    color: "from-crimson to-crimson-light",
  },
  {
    icon: MapPin,
    title: "By City",
    items: ["Hyderabad", "Mumbai", "Delhi NCR", "Bangalore", "Chennai", "Kolkata"],
    color: "from-gold-dark to-gold",
  },
  {
    icon: Users,
    title: "By Caste",
    items: ["Brahmin", "Reddy", "Kamma", "Kapu", "Naidu", "Yadav"],
    color: "from-accent to-gold",
  },
  {
    icon: Briefcase,
    title: "By Profession",
    items: ["IT Professional", "Doctor", "Engineer", "Business", "Government", "Teacher"],
    color: "from-crimson-dark to-crimson",
  },
  {
    icon: Globe,
    title: "By State",
    items: ["Telangana", "Andhra Pradesh", "Tamil Nadu", "Karnataka", "Maharashtra", "Kerala"],
    color: "from-gold to-accent",
  },
  {
    icon: Heart,
    title: "NRI Matrimony",
    items: ["USA", "UAE", "Singapore", "Malaysia", "UK", "Canada"],
    color: "from-crimson-light to-accent",
  },
];

const BrowseSection = () => {
  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-crimson/10 text-crimson text-sm font-medium mb-4">
            Explore Profiles
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            Browse Matrimony Profiles
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover your perfect match from lakhs of verified profiles across India
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-elevated transition-shadow group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <cat.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-3">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="px-3 py-1.5 text-sm rounded-full bg-muted text-muted-foreground hover:bg-crimson/10 hover:text-crimson transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseSection;
