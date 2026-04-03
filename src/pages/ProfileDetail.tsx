import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, MapPin, Briefcase, GraduationCap, Users, Star, ArrowLeft, Crown, Clock, Ruler, Weight, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";

const ProfileDetail = () => {
  const { profileId } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [profileId]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("profile_id", profileId)
      .single();

    if (data) {
      setProfile(data);
      const { data: photoData } = await supabase
        .from("profile_photos")
        .select("*")
        .eq("user_id", data.user_id)
        .order("display_order");
      setPhotos(photoData || []);
    }
    setLoading(false);
  };

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading profile...</div>
    </div>
  );

  if (!profile) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-heading font-bold text-foreground">Profile not found</h2>
        <Link to="/search"><Button className="mt-4 bg-gradient-hero text-primary-foreground">Back to Search</Button></Link>
      </div>
    </div>
  );

  const allPhotos = profile.profile_photo_url
    ? [{ photo_url: profile.profile_photo_url }, ...photos]
    : photos;

  const InfoRow = ({ label, value }: { label: string; value: any }) => (
    value ? (
      <div className="flex justify-between py-2 border-b border-border last:border-0">
        <span className="text-muted-foreground text-sm">{label}</span>
        <span className="text-foreground text-sm font-medium text-right max-w-[60%]">{value}</span>
      </div>
    ) : null
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        <Link to={user ? "/dashboard" : "/search"} className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left - Photos */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="overflow-hidden">
                <div className="relative aspect-[3/4] bg-muted">
                  {allPhotos.length > 0 ? (
                    <>
                      <img
                        src={allPhotos[currentPhoto]?.photo_url}
                        alt={profile.full_name}
                        className="w-full h-full object-cover"
                      />
                      {allPhotos.length > 1 && (
                        <>
                          <button
                            onClick={() => setCurrentPhoto((p) => (p > 0 ? p - 1 : allPhotos.length - 1))}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setCurrentPhoto((p) => (p < allPhotos.length - 1 ? p + 1 : 0))}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {allPhotos.map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${i === currentPhoto ? "bg-white" : "bg-white/50"}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Heart className="w-16 h-16 text-muted-foreground/30" />
                    </div>
                  )}
                  {profile.is_premium && (
                    <Badge className="absolute top-3 right-3 bg-gold text-foreground gap-1">
                      <Crown className="w-3 h-3" /> Premium
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h1 className="text-xl font-heading font-bold text-foreground">{profile.full_name}</h1>
                  <p className="text-sm text-muted-foreground mt-1">{profile.profile_id}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {profile.age && <Badge variant="secondary">{profile.age} yrs</Badge>}
                    {profile.height_cm && <Badge variant="secondary">{Math.floor(profile.height_cm / 30.48)}'{Math.round((profile.height_cm % 30.48) / 2.54)}"</Badge>}
                    {profile.city && <Badge variant="secondary"><MapPin className="w-3 h-3 mr-1" />{profile.city}</Badge>}
                  </div>
                  {user && profile.user_id !== user.id && (
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1 bg-gradient-hero text-primary-foreground gap-2">
                        <Heart className="w-4 h-4" /> Express Interest
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            {profile.about_me && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card>
                  <CardHeader><CardTitle className="text-lg">About {profile.full_name?.split(" ")[0]}</CardTitle></CardHeader>
                  <CardContent><p className="text-muted-foreground leading-relaxed">{profile.about_me}</p></CardContent>
                </Card>
              </motion.div>
            )}

            {/* Basic Details */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Card>
                <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Star className="w-5 h-5 text-crimson" /> Basic Details</CardTitle></CardHeader>
                <CardContent>
                  <InfoRow label="Age" value={profile.age ? `${profile.age} years` : null} />
                  <InfoRow label="Height" value={profile.height_cm ? `${profile.height_cm} cm` : null} />
                  <InfoRow label="Weight" value={profile.weight_kg ? `${profile.weight_kg} kg` : null} />
                  <InfoRow label="Marital Status" value={profile.marital_status} />
                  <InfoRow label="Body Type" value={profile.body_type} />
                  <InfoRow label="Complexion" value={profile.complexion} />
                  <InfoRow label="Physical Status" value={profile.physical_status} />
                  <InfoRow label="Mother Tongue" value={profile.mother_tongue} />
                </CardContent>
              </Card>
            </motion.div>

            {/* Religion */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Globe className="w-5 h-5 text-crimson" /> Religion & Community</CardTitle></CardHeader>
                <CardContent>
                  <InfoRow label="Religion" value={profile.religion} />
                  <InfoRow label="Caste" value={profile.caste} />
                  <InfoRow label="Sub Caste" value={profile.sub_caste} />
                  <InfoRow label="Gothra" value={profile.gothra} />
                  <InfoRow label="Manglik" value={profile.manglik} />
                </CardContent>
              </Card>
            </motion.div>

            {/* Education & Career */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <Card>
                <CardHeader><CardTitle className="text-lg flex items-center gap-2"><GraduationCap className="w-5 h-5 text-crimson" /> Education & Career</CardTitle></CardHeader>
                <CardContent>
                  <InfoRow label="Education" value={profile.education} />
                  <InfoRow label="Education Detail" value={profile.education_detail} />
                  <InfoRow label="Occupation" value={profile.occupation} />
                  <InfoRow label="Company" value={profile.company} />
                  <InfoRow label="Annual Income" value={profile.annual_income} />
                  <InfoRow label="Working City" value={profile.working_city} />
                </CardContent>
              </Card>
            </motion.div>

            {/* Location */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardHeader><CardTitle className="text-lg flex items-center gap-2"><MapPin className="w-5 h-5 text-crimson" /> Location</CardTitle></CardHeader>
                <CardContent>
                  <InfoRow label="City" value={profile.city} />
                  <InfoRow label="State" value={profile.state} />
                  <InfoRow label="Country" value={profile.country} />
                </CardContent>
              </Card>
            </motion.div>

            {/* Horoscope */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <Card>
                <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Star className="w-5 h-5 text-gold" /> Horoscope Details</CardTitle></CardHeader>
                <CardContent>
                  <InfoRow label="Rashi" value={profile.rashi} />
                  <InfoRow label="Nakshatra" value={profile.nakshatra} />
                  <InfoRow label="Birth Time" value={profile.birth_time} />
                  <InfoRow label="Birth Place" value={profile.birth_place} />
                  <InfoRow label="Horoscope Match Required" value={profile.horoscope_match_required ? "Yes" : "No"} />
                </CardContent>
              </Card>
            </motion.div>

            {/* Family */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Users className="w-5 h-5 text-crimson" /> Family Details</CardTitle></CardHeader>
                <CardContent>
                  <InfoRow label="Father's Name" value={profile.father_name} />
                  <InfoRow label="Father's Occupation" value={profile.father_occupation} />
                  <InfoRow label="Mother's Name" value={profile.mother_name} />
                  <InfoRow label="Mother's Occupation" value={profile.mother_occupation} />
                  <InfoRow label="Brothers" value={profile.brothers > 0 ? `${profile.brothers} (${profile.brothers_married} married)` : null} />
                  <InfoRow label="Sisters" value={profile.sisters > 0 ? `${profile.sisters} (${profile.sisters_married} married)` : null} />
                  <InfoRow label="Family Type" value={profile.family_type} />
                  <InfoRow label="Family Status" value={profile.family_status} />
                  <InfoRow label="Family Values" value={profile.family_values} />
                  {profile.about_family && <p className="text-muted-foreground mt-3 text-sm">{profile.about_family}</p>}
                </CardContent>
              </Card>
            </motion.div>

            {/* Partner Preferences */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
              <Card>
                <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Heart className="w-5 h-5 text-crimson" /> Partner Preferences</CardTitle></CardHeader>
                <CardContent>
                  <InfoRow label="Age Range" value={profile.pref_age_min && profile.pref_age_max ? `${profile.pref_age_min} - ${profile.pref_age_max} years` : null} />
                  <InfoRow label="Height Range" value={profile.pref_height_min && profile.pref_height_max ? `${profile.pref_height_min} - ${profile.pref_height_max} cm` : null} />
                  <InfoRow label="Marital Status" value={profile.pref_marital_status?.join(", ")} />
                  <InfoRow label="Religion" value={profile.pref_religion?.join(", ")} />
                  <InfoRow label="Caste" value={profile.pref_caste?.join(", ")} />
                  <InfoRow label="Education" value={profile.pref_education?.join(", ")} />
                  <InfoRow label="Occupation" value={profile.pref_occupation?.join(", ")} />
                  <InfoRow label="Preferred Cities" value={profile.pref_cities?.join(", ")} />
                  <InfoRow label="Manglik" value={profile.pref_manglik} />
                  {profile.pref_description && <p className="text-muted-foreground mt-3 text-sm">{profile.pref_description}</p>}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
