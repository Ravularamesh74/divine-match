export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      profile_photos: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          is_primary: boolean | null
          photo_url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_primary?: boolean | null
          photo_url: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_primary?: boolean | null
          photo_url?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          about_family: string | null
          about_me: string | null
          age: number | null
          annual_income: string | null
          birth_place: string | null
          birth_time: string | null
          body_type: string | null
          brothers: number | null
          brothers_married: number | null
          caste: string | null
          city: string | null
          company: string | null
          complexion: string | null
          country: string | null
          created_at: string
          date_of_birth: string | null
          education: string | null
          education_detail: string | null
          family_status: string | null
          family_type: string | null
          family_values: string | null
          father_name: string | null
          father_occupation: string | null
          full_name: string
          gender: string | null
          gothra: string | null
          height_cm: number | null
          horoscope_match_required: boolean | null
          id: string
          is_premium: boolean | null
          manglik: string | null
          marital_status: string | null
          mother_name: string | null
          mother_occupation: string | null
          mother_tongue: string | null
          nakshatra: string | null
          occupation: string | null
          physical_status: string | null
          pref_age_max: number | null
          pref_age_min: number | null
          pref_caste: string[] | null
          pref_cities: string[] | null
          pref_description: string | null
          pref_education: string[] | null
          pref_height_max: number | null
          pref_height_min: number | null
          pref_income_min: string | null
          pref_manglik: string | null
          pref_marital_status: string[] | null
          pref_occupation: string[] | null
          pref_religion: string[] | null
          profile_completion: number | null
          profile_id: string | null
          profile_photo_url: string | null
          rashi: string | null
          religion: string | null
          sisters: number | null
          sisters_married: number | null
          state: string | null
          sub_caste: string | null
          updated_at: string
          user_id: string
          weight_kg: number | null
          working_city: string | null
        }
        Insert: {
          about_family?: string | null
          about_me?: string | null
          age?: number | null
          annual_income?: string | null
          birth_place?: string | null
          birth_time?: string | null
          body_type?: string | null
          brothers?: number | null
          brothers_married?: number | null
          caste?: string | null
          city?: string | null
          company?: string | null
          complexion?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string | null
          education?: string | null
          education_detail?: string | null
          family_status?: string | null
          family_type?: string | null
          family_values?: string | null
          father_name?: string | null
          father_occupation?: string | null
          full_name?: string
          gender?: string | null
          gothra?: string | null
          height_cm?: number | null
          horoscope_match_required?: boolean | null
          id?: string
          is_premium?: boolean | null
          manglik?: string | null
          marital_status?: string | null
          mother_name?: string | null
          mother_occupation?: string | null
          mother_tongue?: string | null
          nakshatra?: string | null
          occupation?: string | null
          physical_status?: string | null
          pref_age_max?: number | null
          pref_age_min?: number | null
          pref_caste?: string[] | null
          pref_cities?: string[] | null
          pref_description?: string | null
          pref_education?: string[] | null
          pref_height_max?: number | null
          pref_height_min?: number | null
          pref_income_min?: string | null
          pref_manglik?: string | null
          pref_marital_status?: string[] | null
          pref_occupation?: string[] | null
          pref_religion?: string[] | null
          profile_completion?: number | null
          profile_id?: string | null
          profile_photo_url?: string | null
          rashi?: string | null
          religion?: string | null
          sisters?: number | null
          sisters_married?: number | null
          state?: string | null
          sub_caste?: string | null
          updated_at?: string
          user_id: string
          weight_kg?: number | null
          working_city?: string | null
        }
        Update: {
          about_family?: string | null
          about_me?: string | null
          age?: number | null
          annual_income?: string | null
          birth_place?: string | null
          birth_time?: string | null
          body_type?: string | null
          brothers?: number | null
          brothers_married?: number | null
          caste?: string | null
          city?: string | null
          company?: string | null
          complexion?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string | null
          education?: string | null
          education_detail?: string | null
          family_status?: string | null
          family_type?: string | null
          family_values?: string | null
          father_name?: string | null
          father_occupation?: string | null
          full_name?: string
          gender?: string | null
          gothra?: string | null
          height_cm?: number | null
          horoscope_match_required?: boolean | null
          id?: string
          is_premium?: boolean | null
          manglik?: string | null
          marital_status?: string | null
          mother_name?: string | null
          mother_occupation?: string | null
          mother_tongue?: string | null
          nakshatra?: string | null
          occupation?: string | null
          physical_status?: string | null
          pref_age_max?: number | null
          pref_age_min?: number | null
          pref_caste?: string[] | null
          pref_cities?: string[] | null
          pref_description?: string | null
          pref_education?: string[] | null
          pref_height_max?: number | null
          pref_height_min?: number | null
          pref_income_min?: string | null
          pref_manglik?: string | null
          pref_marital_status?: string[] | null
          pref_occupation?: string[] | null
          pref_religion?: string[] | null
          profile_completion?: number | null
          profile_id?: string | null
          profile_photo_url?: string | null
          rashi?: string | null
          religion?: string | null
          sisters?: number | null
          sisters_married?: number | null
          state?: string | null
          sub_caste?: string | null
          updated_at?: string
          user_id?: string
          weight_kg?: number | null
          working_city?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
