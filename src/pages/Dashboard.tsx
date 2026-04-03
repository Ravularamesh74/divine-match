import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Search, User, Crown, Settings, LogOut, Bell, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [recentProfiles, setRecentProfiles] = useState<any[]>([]);

  useEffect(() => {
    if (!user) { navigate("/auth"); return; }
    fetchProfile();
    fetchRecentProfiles();
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user!.id)
      .single();
    setProfile(data);
  };

  const fetchRecentProfiles = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("profiles")
      .select("id, profile_id, full_name, age, city, religion, occupation, profile_photo_url, gender")
      .neq("user_id", user.id)
      .limit(6);
    setRecentProfiles(data || []);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (!profile) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-hero flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground fill-current" />
            </div>
            <span className="text-lg font-heading font-bold">
              <span className="text-foreground">Vivah</span>
              <span className="text-crimson">Matrimony</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Bell className="w-5 h-5" />
            </Button>
            <Link to="/search">
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Search className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/edit-profile">
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={handleSignOut} className="text-muted-foreground">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="mb-8 bg-gradient-hero text-white border-none">
            <CardContent className="p-6 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                {profile.profile_photo_url ? (
                  <img src={profile.profile_photo_url} alt="" className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-white" />
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-heading font-bold">Welcome, {profile.full_name || "User"}!</h1>
                <p className="text-white/80 text-sm mt-1">Profile ID: {profile.profile_id}</p>
                <p className="text-white/70 text-xs mt-1">Profile completion: {profile.profile_completion || 0}%</p>
              </div>
              {!profile.is_premium && (
                <Link to="/premium">
                  <Button className="bg-white text-crimson hover:bg-white/90 gap-2">
                    <Crown className="w-4 h-4" /> Upgrade
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: User, label: "Edit Profile", to: "/edit-profile", color: "text-crimson" },
            { icon: Search, label: "Search", to: "/search", color: "text-accent" },
            { icon: Crown, label: "Premium Plans", to: "/premium", color: "text-gold" },
            { icon: Users, label: "Matches", to: "/search", color: "text-primary" },
          ].map((action) => (
            <Link key={action.label} to={action.to}>
              <Card className="hover:shadow-elevated transition-shadow cursor-pointer h-full">
                <CardContent className="p-4 flex flex-col items-center gap-2 text-center">
                  <action.icon className={`w-6 h-6 ${action.color}`} />
                  <span className="text-sm font-medium text-foreground">{action.label}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Profiles */}
        {recentProfiles.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-heading font-bold text-foreground">Recently Joined</h2>
              <Link to="/search">
                <Button variant="ghost" className="text-crimson text-sm">View All</Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {recentProfiles.map((p) => (
                <Link key={p.id} to={`/profile/${p.profile_id}`}>
                  <Card className="hover:shadow-elevated transition-shadow cursor-pointer overflow-hidden">
                    <div className="aspect-[3/4] bg-muted flex items-center justify-center">
                      {p.profile_photo_url ? (
                        <img src={p.profile_photo_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-8 h-8 text-muted-foreground" />
                      )}
                    </div>
                    <CardContent className="p-3">
                      <p className="font-semibold text-sm text-foreground truncate">{p.full_name || "N/A"}</p>
                      <p className="text-xs text-muted-foreground">{p.age ? `${p.age} yrs` : ""}{p.city ? `, ${p.city}` : ""}</p>
                      <p className="text-xs text-muted-foreground truncate">{p.occupation || p.religion || ""}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
