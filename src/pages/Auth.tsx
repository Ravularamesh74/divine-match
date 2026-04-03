import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Welcome back!" });
        navigate("/dashboard");
      }
    } else {
      if (!fullName.trim()) {
        toast({ title: "Please enter your full name", variant: "destructive" });
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, fullName);
      if (error) {
        toast({ title: "Registration failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Account created!", description: "Please check your email to verify your account." });
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center px-12">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
            <Heart className="w-10 h-10 text-white fill-current" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-white mb-4">
            Find Your Perfect Match
          </h1>
          <p className="text-lg text-white/80 font-body max-w-md mx-auto">
            Join millions of happy couples who found their life partner on VivahMatrimony
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6 text-white/90">
            <div>
              <p className="text-3xl font-bold">50L+</p>
              <p className="text-sm text-white/70">Active Profiles</p>
            </div>
            <div>
              <p className="text-3xl font-bold">10L+</p>
              <p className="text-sm text-white/70">Success Stories</p>
            </div>
            <div>
              <p className="text-3xl font-bold">100%</p>
              <p className="text-sm text-white/70">Verified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground fill-current" />
            </div>
            <span className="text-xl font-heading font-bold">
              <span className="text-foreground">Vivah</span>
              <span className="text-crimson">Matrimony</span>
            </span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              {isLogin ? "Welcome Back" : "Create Your Account"}
            </h2>
            <p className="text-muted-foreground mt-2">
              {isLogin ? "Sign in to find your perfect match" : "Start your journey to find your life partner"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10"
                    maxLength={100}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90 transition-opacity h-11"
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-crimson font-semibold hover:underline"
              >
                {isLogin ? "Register Free" : "Sign In"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
