import { motion } from "framer-motion";
import {
  MapPin,
  BookOpen,
  Briefcase,
  Globe,
  Users,
  Heart,
  Search,
} from "lucide-react";
import { useState } from "react";

type Category = {
  icon: any;
  title: string;
  items: { name: string; count: number }[];
  color: string;
};

const categories: Category[] = [
  {
    icon: BookOpen,
    title: "By Religion",
    items: [
      { name: "Hindu", count: 24500 },
      { name: "Muslim", count: 18400 },
      { name: "Christian", count: 9200 },
      { name: "Sikh", count: 3100 },
      { name: "Jain", count: 2700 },
      { name: "Buddhist", count: 1500 },
    ],
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: MapPin,
    title: "By City",
    items: [
      { name: "Hyderabad", count: 11200 },
      { name: "Mumbai", count: 21000 },
      { name: "Delhi NCR", count: 19500 },
      { name: "Bangalore", count: 17500 },
      { name: "Chennai", count: 9800 },
      { name: "Kolkata", count: 8700 },
    ],
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Users,
    title: "By Caste",
    items: [
      { name: "Brahmin", count: 13400 },
      { name: "Reddy", count: 8900 },
      { name: "Kamma", count: 7600 },
      { name: "Kapu", count: 6500 },
      { name: "Naidu", count: 5900 },
      { name: "Yadav", count: 7200 },
    ],
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: Briefcase,
    title: "By Profession",
    items: [
      { name: "IT Professional", count: 32000 },
      { name: "Doctor", count: 8200 },
      { name: "Engineer", count: 21500 },
      { name: "Business", count: 12500 },
      { name: "Government", count: 9800 },
      { name: "Teacher", count: 6400 },
    ],
    color: "from-red-600 to-rose-500",
  },
  {
    icon: Globe,
    title: "By State",
    items: [
      { name: "Telangana", count: 11000 },
      { name: "Andhra Pradesh", count: 13500 },
      { name: "Tamil Nadu", count: 14500 },
      { name: "Karnataka", count: 12000 },
      { name: "Maharashtra", count: 19000 },
      { name: "Kerala", count: 8000 },
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Heart,
    title: "NRI Matrimony",
    items: [
      { name: "USA", count: 9000 },
      { name: "UAE", count: 7200 },
      { name: "Singapore", count: 3100 },
      { name: "Malaysia", count: 2800 },
      { name: "UK", count: 4500 },
      { name: "Canada", count: 5200 },
    ],
    color: "from-pink-500 to-red-500",
  },
];

const BrowseSection = () => {
  const [search, setSearch] = useState("");

  const filteredCategories = categories.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  return (
    <section className="py-24 bg-gradient-to-br from-white via-rose-50 to-pink-50">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-3">
            Find Your Perfect Match ❤️
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore lakhs of verified profiles with intelligent filters & modern matchmaking
          </p>
        </motion.div>

        {/* SEARCH BAR */}
        <div className="max-w-xl mx-auto mb-12 relative">
          <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search religion, city, caste..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border bg-white shadow-md focus:ring-2 focus:ring-pink-400 outline-none"
          />
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative group rounded-2xl p-6 bg-white/70 backdrop-blur-lg border border-white/30 shadow-xl hover:shadow-2xl transition-all"
            >
              {/* ICON */}
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition`}
              >
                <cat.icon className="text-white w-6 h-6" />
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-semibold mb-4">{cat.title}</h3>

              {/* ITEMS */}
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <a
                    key={item.name}
                    href={`/search?type=${cat.title}&value=${item.name}`}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-full bg-gray-100 hover:bg-pink-100 hover:text-pink-600 transition"
                  >
                    {item.name}
                    <span className="text-xs bg-white px-2 py-0.5 rounded-full shadow">
                      {item.count.toLocaleString()}
                    </span>
                  </a>
                ))}
              </div>

              {/* HOVER GLOW */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-20 transition pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseSection;