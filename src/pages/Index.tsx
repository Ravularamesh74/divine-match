import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BrowseSection from "@/components/BrowseSection";
import FeaturesSection from "@/components/FeaturesSection";
import SuccessStories from "@/components/SuccessStories";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <BrowseSection />
      <FeaturesSection />
      <SuccessStories />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
