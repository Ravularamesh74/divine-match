import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ArrowLeft, Save, Camera, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    if (!user) { navigate("/auth"); return; }
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user!.id)
      .single();
    if (data) setProfile(data);
  };

  const updateField = (field: string, value: any) => {
    setProfile((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update(profile)
      .eq("user_id", user!.id);

    if (error) {
      toast({ title: "Error saving profile", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated successfully!" });
    }
    setLoading(false);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const filePath = `${user!.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-photos")
      .upload(filePath, file);

    if (uploadError) {
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("profile-photos")
      .getPublicUrl(filePath);

    updateField("profile_photo_url", publicUrl);
    setUploading(false);
    toast({ title: "Photo uploaded!" });
  };

  const SelectField = ({ label, field, options }: { label: string; field: string; options: string[] }) => (
    <div className="space-y-2">
      <Label className="text-foreground">{label}</Label>
      <Select value={profile[field] || ""} onValueChange={(v) => updateField(field, v)}>
        <SelectTrigger><SelectValue placeholder={`Select ${label}`} /></SelectTrigger>
        <SelectContent>
          {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );

  const InputField = ({ label, field, type = "text", placeholder = "" }: { label: string; field: string; type?: string; placeholder?: string }) => (
    <div className="space-y-2">
      <Label className="text-foreground">{label}</Label>
      <Input
        type={type}
        value={profile[field] || ""}
        onChange={(e) => updateField(field, type === "number" ? parseInt(e.target.value) || null : e.target.value)}
        placeholder={placeholder || label}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" /> Back to Dashboard
          </Link>
          <Button onClick={handleSave} disabled={loading} className="bg-gradient-hero text-primary-foreground gap-2">
            <Save className="w-4 h-4" /> {loading ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-2xl font-heading font-bold text-foreground mb-6">Edit Your Profile</h1>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-1">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="religion">Religion</TabsTrigger>
            <TabsTrigger value="career">Career</TabsTrigger>
            <TabsTrigger value="horoscope">Horoscope</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
            <TabsTrigger value="partner">Partner</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {/* Photo */}
                <div className="space-y-2">
                  <Label className="text-foreground">Profile Photo</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center overflow-hidden border border-border">
                      {profile.profile_photo_url ? (
                        <img src={profile.profile_photo_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-8 h-8 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <label className="cursor-pointer">
                        <Button variant="outline" size="sm" asChild>
                          <span>{uploading ? "Uploading..." : "Upload Photo"}</span>
                        </Button>
                        <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} disabled={uploading} />
                      </label>
                    </div>
                  </div>
                </div>

                <InputField label="Full Name" field="full_name" />
                <SelectField label="Gender" field="gender" options={["Male", "Female", "Other"]} />
                <InputField label="Date of Birth" field="date_of_birth" type="date" />
                <InputField label="Age" field="age" type="number" />
                <InputField label="Height (cm)" field="height_cm" type="number" />
                <InputField label="Weight (kg)" field="weight_kg" type="number" />
                <SelectField label="Marital Status" field="marital_status" options={["Never Married", "Divorced", "Widowed", "Awaiting Divorce"]} />
                <SelectField label="Body Type" field="body_type" options={["Slim", "Average", "Athletic", "Heavy"]} />
                <SelectField label="Physical Status" field="physical_status" options={["Normal", "Physically Challenged"]} />
                <InputField label="Complexion" field="complexion" />
                <InputField label="Mother Tongue" field="mother_tongue" />

                <div className="space-y-2">
                  <Label className="text-foreground">About Me</Label>
                  <Textarea
                    value={profile.about_me || ""}
                    onChange={(e) => updateField("about_me", e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    maxLength={1000}
                  />
                </div>

                <h3 className="font-heading font-semibold text-foreground pt-4">Location</h3>
                <InputField label="City" field="city" />
                <InputField label="State" field="state" />
                <InputField label="Country" field="country" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="religion">
            <Card>
              <CardHeader><CardTitle>Religion & Community</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <InputField label="Religion" field="religion" />
                <InputField label="Caste" field="caste" />
                <InputField label="Sub Caste" field="sub_caste" />
                <InputField label="Gothra" field="gothra" />
                <SelectField label="Manglik" field="manglik" options={["Yes", "No", "Don't Know"]} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="career">
            <Card>
              <CardHeader><CardTitle>Education & Career</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <InputField label="Education" field="education" placeholder="e.g. B.Tech, MBA" />
                <InputField label="Education Detail" field="education_detail" placeholder="e.g. IIT Delhi, Computer Science" />
                <InputField label="Occupation" field="occupation" />
                <InputField label="Company" field="company" />
                <InputField label="Annual Income" field="annual_income" placeholder="e.g. 10-15 LPA" />
                <InputField label="Working City" field="working_city" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="horoscope">
            <Card>
              <CardHeader><CardTitle>Horoscope Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <SelectField label="Rashi" field="rashi" options={["Mesha", "Vrishabha", "Mithuna", "Karka", "Simha", "Kanya", "Tula", "Vrischika", "Dhanu", "Makara", "Kumbha", "Meena"]} />
                <SelectField label="Nakshatra" field="nakshatra" options={["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"]} />
                <InputField label="Birth Time" field="birth_time" type="time" />
                <InputField label="Birth Place" field="birth_place" />
                <div className="flex items-center gap-3">
                  <Switch
                    checked={profile.horoscope_match_required || false}
                    onCheckedChange={(v) => updateField("horoscope_match_required", v)}
                  />
                  <Label className="text-foreground">Horoscope Match Required</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="family">
            <Card>
              <CardHeader><CardTitle>Family Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <InputField label="Father's Name" field="father_name" />
                <InputField label="Father's Occupation" field="father_occupation" />
                <InputField label="Mother's Name" field="mother_name" />
                <InputField label="Mother's Occupation" field="mother_occupation" />
                <InputField label="No. of Brothers" field="brothers" type="number" />
                <InputField label="Brothers Married" field="brothers_married" type="number" />
                <InputField label="No. of Sisters" field="sisters" type="number" />
                <InputField label="Sisters Married" field="sisters_married" type="number" />
                <SelectField label="Family Type" field="family_type" options={["Joint", "Nuclear", "Extended"]} />
                <SelectField label="Family Status" field="family_status" options={["Middle Class", "Upper Middle Class", "Rich", "Affluent"]} />
                <SelectField label="Family Values" field="family_values" options={["Orthodox", "Traditional", "Moderate", "Liberal"]} />
                <div className="space-y-2">
                  <Label className="text-foreground">About Family</Label>
                  <Textarea
                    value={profile.about_family || ""}
                    onChange={(e) => updateField("about_family", e.target.value)}
                    placeholder="Tell us about your family..."
                    rows={4}
                    maxLength={1000}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="partner">
            <Card>
              <CardHeader><CardTitle>Partner Preferences</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Min Age" field="pref_age_min" type="number" />
                  <InputField label="Max Age" field="pref_age_max" type="number" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Min Height (cm)" field="pref_height_min" type="number" />
                  <InputField label="Max Height (cm)" field="pref_height_max" type="number" />
                </div>
                <InputField label="Preferred Income Min" field="pref_income_min" placeholder="e.g. 5 LPA" />
                <SelectField label="Manglik Preference" field="pref_manglik" options={["Yes", "No", "Doesn't Matter"]} />
                <div className="space-y-2">
                  <Label className="text-foreground">Partner Description</Label>
                  <Textarea
                    value={profile.pref_description || ""}
                    onChange={(e) => updateField("pref_description", e.target.value)}
                    placeholder="Describe your ideal partner..."
                    rows={4}
                    maxLength={1000}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EditProfile;
