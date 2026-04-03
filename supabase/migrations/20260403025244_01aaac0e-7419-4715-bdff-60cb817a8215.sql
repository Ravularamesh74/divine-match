
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
  date_of_birth DATE,
  age INTEGER,
  height_cm INTEGER,
  weight_kg INTEGER,
  marital_status TEXT CHECK (marital_status IN ('Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce')),
  mother_tongue TEXT,
  religion TEXT,
  caste TEXT,
  sub_caste TEXT,
  gothra TEXT,
  manglik TEXT CHECK (manglik IN ('Yes', 'No', 'Don''t Know')),
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  education TEXT,
  education_detail TEXT,
  occupation TEXT,
  company TEXT,
  annual_income TEXT,
  working_city TEXT,
  complexion TEXT,
  body_type TEXT CHECK (body_type IN ('Slim', 'Average', 'Athletic', 'Heavy')),
  physical_status TEXT CHECK (physical_status IN ('Normal', 'Physically Challenged')),
  rashi TEXT,
  nakshatra TEXT,
  birth_time TIME,
  birth_place TEXT,
  horoscope_match_required BOOLEAN DEFAULT false,
  father_name TEXT,
  father_occupation TEXT,
  mother_name TEXT,
  mother_occupation TEXT,
  brothers INTEGER DEFAULT 0,
  brothers_married INTEGER DEFAULT 0,
  sisters INTEGER DEFAULT 0,
  sisters_married INTEGER DEFAULT 0,
  family_type TEXT CHECK (family_type IN ('Joint', 'Nuclear', 'Extended')),
  family_status TEXT CHECK (family_status IN ('Middle Class', 'Upper Middle Class', 'Rich', 'Affluent')),
  family_values TEXT CHECK (family_values IN ('Orthodox', 'Traditional', 'Moderate', 'Liberal')),
  about_family TEXT,
  pref_age_min INTEGER,
  pref_age_max INTEGER,
  pref_height_min INTEGER,
  pref_height_max INTEGER,
  pref_marital_status TEXT[],
  pref_religion TEXT[],
  pref_caste TEXT[],
  pref_education TEXT[],
  pref_occupation TEXT[],
  pref_income_min TEXT,
  pref_cities TEXT[],
  pref_manglik TEXT,
  pref_description TEXT,
  about_me TEXT,
  profile_photo_url TEXT,
  is_premium BOOLEAN DEFAULT false,
  profile_completion INTEGER DEFAULT 0,
  profile_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by authenticated users"
  ON public.profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.profile_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profile_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Photos viewable by authenticated users"
  ON public.profile_photos FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can insert their own photos"
  ON public.profile_photos FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own photos"
  ON public.profile_photos FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own photos"
  ON public.profile_photos FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE SEQUENCE IF NOT EXISTS profile_id_seq START 100001;

CREATE OR REPLACE FUNCTION public.generate_profile_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.profile_id := 'VM' || LPAD(nextval('profile_id_seq')::TEXT, 6, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER set_profile_id
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  WHEN (NEW.profile_id IS NULL)
  EXECUTE FUNCTION public.generate_profile_id();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

INSERT INTO storage.buckets (id, name, public) VALUES ('profile-photos', 'profile-photos', true);

CREATE POLICY "Anyone can view profile photos"
  ON storage.objects FOR SELECT USING (bucket_id = 'profile-photos');

CREATE POLICY "Users can upload their own photos"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own photos"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own photos"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
