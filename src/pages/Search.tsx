import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search as SearchIcon, Filter, MapPin, User, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";

const Search = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [total, setTotal] = useState(0);

  // Filters
  const [gender, setGender] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [religion, setReligion] = useState("");
  const [caste, setCaste] = useState("");
  const [city, setCity] = useState("");
  const [education, setEducation] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [manglik, setManglik] = useState("");
  const [incomeMin, setIncomeMin] = useState("");

  useEffect(() => {
    searchProfiles();
  }, []);

  const searchProfiles = async () => {
    setLoading(true);
    let query = supabase
      .from("profiles")
      .select("id, profile_id, full_name, age, city, state, religion, caste, education, occupation, annual_income, marital_status, profile_photo_url, gender, height_cm, manglik", { count: "exact" });

    if (gender) query = query.eq("gender", gender);
    if (ageMin) query = query.gte("age", parseInt(ageMin));
    if (ageMax) query = query.lte("age", parseInt(ageMax));
    if (religion) query = query.ilike("religion", `%${religion}%`);
    if (caste) query = query.ilike("caste", `%${caste}%`);
    if (city) query = query.ilike("city", `%${city}%`);
    if (education) query = query.ilike("education", `%${education}%`);
    if (maritalStatus) query = query.eq("marital_status", maritalStatus);
    if (manglik) query = query.eq("manglik", manglik);

    query = query.not("full_name", "eq", "").limit(50);

    const { data, count } = await query;
    setProfiles(data || []);
    setTotal(count || 0);
    setLoading(false);
  };

  const clearFilters = () => {
    setGender(""); setAgeMin(""); setAgeMax(""); setReligion("");
    setCaste(""); setCity(""); setEducation(""); setMaritalStatus("");
    setManglik(""); setIncomeMin("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-heading font-bold text-foreground">Search Profiles</h1>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            {showFilters ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Gender</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Age Min</Label>
                    <Input type="number" value={ageMin} onChange={(e) => setAgeMin(e.target.value)} placeholder="18" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Age Max</Label>
                    <Input type="number" value={ageMax} onChange={(e) => setAgeMax(e.target.value)} placeholder="60" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Religion</Label>
                    <Input value={religion} onChange={(e) => setReligion(e.target.value)} placeholder="e.g. Hindu" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Caste</Label>
                    <Input value={caste} onChange={(e) => setCaste(e.target.value)} placeholder="e.g. Brahmin" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">City</Label>
                    <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Hyderabad" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Education</Label>
                    <Input value={education} onChange={(e) => setEducation(e.target.value)} placeholder="e.g. B.Tech" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Marital Status</Label>
                    <Select value={maritalStatus} onValueChange={setMaritalStatus}>
                      <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Never Married">Never Married</SelectItem>
                        <SelectItem value="Divorced">Divorced</SelectItem>
                        <SelectItem value="Widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Manglik</Label>
                    <Select value={manglik} onValueChange={setManglik}>
                      <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button onClick={searchProfiles} className="bg-gradient-hero text-primary-foreground gap-2">
                    <SearchIcon className="w-4 h-4" /> Search
                  </Button>
                  <Button variant="outline" onClick={() => { clearFilters(); searchProfiles(); }}>
                    <X className="w-4 h-4 mr-1" /> Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Results */}
        <p className="text-sm text-muted-foreground mb-4">{total} profiles found</p>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-muted" />
                <CardContent className="p-3 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : profiles.length === 0 ? (
          <div className="text-center py-16">
            <SearchIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-heading font-semibold text-foreground">No profiles found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {profiles.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/profile/${p.profile_id}`}>
                  <Card className="hover:shadow-elevated transition-all cursor-pointer overflow-hidden group">
                    <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                      {p.profile_photo_url ? (
                        <img src={p.profile_photo_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-12 h-12 text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                        <p className="text-white font-semibold text-sm">{p.full_name || "N/A"}</p>
                        <p className="text-white/80 text-xs">{p.profile_id}</p>
                      </div>
                    </div>
                    <CardContent className="p-3 space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {p.age && <span>{p.age} yrs</span>}
                        {p.height_cm && <span>• {p.height_cm} cm</span>}
                      </div>
                      {p.city && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {p.city}{p.state ? `, ${p.state}` : ""}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {p.religion && <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{p.religion}</Badge>}
                        {p.caste && <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{p.caste}</Badge>}
                      </div>
                      {p.occupation && <p className="text-xs text-muted-foreground truncate">{p.occupation}</p>}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
