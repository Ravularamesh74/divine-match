import { Heart, Mail, ShieldCheck } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const footerLinks = {
  "Browse By": ["Religion", "Caste", "City", "State", "Profession", "NRI"],
  Company: ["About Us", "Success Stories", "Careers", "Blog", "Press"],
  Support: ["Contact Us", "FAQ", "Safety Tips", "Report Abuse", "Feedback"],
  Legal: ["Terms of Use", "Privacy Policy", "Refund Policy", "Cookie Policy"],
};

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#2a1a1a] via-[#1a0f0f] to-black text-white pt-20 pb-10 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pink-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-500/10 blur-3xl rounded-full" />

      <div className="container mx-auto px-4 relative z-10">

        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-6 gap-10 mb-16">

          {/* BRAND */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="text-xl font-bold">
                Vivah<span className="text-yellow-400">Matrimony</span>
              </span>
            </div>

            <p className="text-sm text-white/70 leading-relaxed mb-6">
              India’s most trusted matrimony platform connecting millions of hearts globally.
            </p>

            {/* NEWSLETTER */}
            <div className="flex items-center bg-white/10 rounded-full overflow-hidden backdrop-blur-md">
              <Mail className="ml-4 w-4 h-4 text-white/60" />
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent px-3 py-2 outline-none text-sm flex-1"
              />
              <button className="bg-rose-500 hover:bg-rose-600 px-5 py-2 text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>

          {/* LINKS */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4 text-white">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={"/" + link.toLowerCase().replace(/\s/g, "-")}
                      className="text-sm text-white/60 hover:text-yellow-400 transition"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* TRUST STRIP */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8 mb-8">
          <div className="flex items-center gap-4 text-sm text-white/60">
            <ShieldCheck className="text-green-400" />
            100% Verified Profiles • Secure Payments • Privacy Protected
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4">
            {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
              <div
                key={i}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-rose-500 transition cursor-pointer"
              >
                <Icon size={18} />
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>© 2026 VivahMatrimony. All rights reserved.</p>

          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">Sitemap</span>
            <span className="hover:text-white cursor-pointer">Accessibility</span>
            <span className="hover:text-white cursor-pointer">Grievance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;