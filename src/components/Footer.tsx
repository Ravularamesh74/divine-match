import { Heart } from "lucide-react";

const footerLinks = {
  "Browse By": ["Religion", "Caste", "City", "State", "Profession", "NRI"],
  "Company": ["About Us", "Success Stories", "Careers", "Blog", "Press"],
  "Support": ["Contact Us", "FAQ", "Safety Tips", "Report Abuse", "Feedback"],
  "Legal": ["Terms of Use", "Privacy Policy", "Refund Policy", "Cookie Policy"],
};

const Footer = () => {
  return (
    <footer className="bg-warm-brown pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-hero flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary-foreground fill-current" />
              </div>
              <span className="text-lg font-heading font-bold text-primary-foreground">
                Vivah<span className="text-gold-light">Matrimony</span>
              </span>
            </div>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              India's most trusted matrimony service. Connecting hearts, building families since 2010.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold text-primary-foreground mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-primary-foreground/50 hover:text-gold-light transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/40">
            © 2025 VivahMatrimony. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-primary-foreground/40 hover:text-gold-light transition-colors">Facebook</a>
            <a href="#" className="text-sm text-primary-foreground/40 hover:text-gold-light transition-colors">Instagram</a>
            <a href="#" className="text-sm text-primary-foreground/40 hover:text-gold-light transition-colors">Twitter</a>
            <a href="#" className="text-sm text-primary-foreground/40 hover:text-gold-light transition-colors">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
