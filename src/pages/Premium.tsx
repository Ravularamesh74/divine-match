import { motion } from "framer-motion";
import { Crown, Check, Star, Shield, Eye, MessageCircle, Heart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";

const plans = [
  {
    name: "Silver",
    price: "₹2,499",
    duration: "3 months",
    popular: false,
    features: [
      "View up to 50 contact numbers",
      "Send 30 personalized messages",
      "Access to advanced search filters",
      "View horoscope details",
      "Profile highlighter for 1 week",
    ],
  },
  {
    name: "Gold",
    price: "₹4,999",
    duration: "6 months",
    popular: true,
    features: [
      "View up to 150 contact numbers",
      "Send unlimited messages",
      "Advanced search & recommendations",
      "View horoscope & Kundli match",
      "Profile highlighter for 1 month",
      "Priority customer support",
      "Profile boost every week",
    ],
  },
  {
    name: "Diamond",
    price: "₹7,999",
    duration: "12 months",
    popular: false,
    features: [
      "Unlimited contact number views",
      "Send unlimited messages",
      "AI-powered matchmaking",
      "Full horoscope & Kundli compatibility",
      "Profile highlighter for 3 months",
      "Dedicated relationship manager",
      "Profile boost every 3 days",
      "Featured profile in search results",
      "Priority verification badge",
    ],
  },
];

const Premium = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-16 bg-gradient-hero text-white text-center">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Crown className="w-12 h-12 mx-auto mb-4 text-gold-light" />
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">Upgrade to Premium</h1>
            <p className="text-white/80 max-w-xl mx-auto">
              Get exclusive access to advanced features and find your perfect match faster
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className={`relative h-full ${plan.popular ? "border-2 border-crimson shadow-elevated" : ""}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-hero text-white">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-lg font-heading">{plan.name}</CardTitle>
                    <div className="mt-2">
                      <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground text-sm ml-1">/ {plan.duration}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${plan.popular ? "bg-gradient-hero text-primary-foreground" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Choose {plan.name}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-bold text-center text-foreground mb-10">Why Go Premium?</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Eye, title: "See Who Viewed", desc: "Know who's interested in your profile" },
              { icon: MessageCircle, title: "Direct Messaging", desc: "Chat directly with matches" },
              { icon: Shield, title: "Verified Profiles", desc: "Connect with verified members only" },
              { icon: Star, title: "Priority Listing", desc: "Appear at the top of search results" },
            ].map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-crimson/10 flex items-center justify-center mx-auto mb-3">
                  <b.icon className="w-6 h-6 text-crimson" />
                </div>
                <h3 className="font-heading font-semibold text-foreground">{b.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Premium;
