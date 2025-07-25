export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      camp_registrations: {
        Row: {
          camp_id: string | null
          created_at: string | null
          id: string
          notes: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          player_id: string | null
          registration_date: string | null
          status: Database["public"]["Enums"]["registration_status"] | null
          updated_at: string | null
        }
        Insert: {
          camp_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          player_id?: string | null
          registration_date?: string | null
          status?: Database["public"]["Enums"]["registration_status"] | null
          updated_at?: string | null
        }
        Update: {
          camp_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          player_id?: string | null
          registration_date?: string | null
          status?: Database["public"]["Enums"]["registration_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "camp_registrations_camp_id_fkey"
            columns: ["camp_id"]
            isOneToOne: false
            referencedRelation: "camps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "camp_registrations_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      camps: {
        Row: {
          coach_id: string
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          is_active: boolean
          level: Database["public"]["Enums"]["camp_level"] | null
          location: string | null
          name: string
          start_date: string | null
        }
        Insert: {
          coach_id: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean
          level?: Database["public"]["Enums"]["camp_level"] | null
          location?: string | null
          name: string
          start_date?: string | null
        }
        Update: {
          coach_id?: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean
          level?: Database["public"]["Enums"]["camp_level"] | null
          location?: string | null
          name?: string
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "camps_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "coaches"
            referencedColumns: ["id"]
          },
        ]
      }
      coaches: {
        Row: {
          coaching_level: Database["public"]["Enums"]["coaching_level"]
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          role: Database["public"]["Enums"]["coach_role"]
          updated_at: string | null
        }
        Insert: {
          coaching_level: Database["public"]["Enums"]["coaching_level"]
          created_at?: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          role?: Database["public"]["Enums"]["coach_role"]
          updated_at?: string | null
        }
        Update: {
          coaching_level?: Database["public"]["Enums"]["coaching_level"]
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          role?: Database["public"]["Enums"]["coach_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      evaluation_criteria: {
        Row: {
          category: string
          created_at: string | null
          id: string
          is_active: boolean | null
          max_score: number | null
          name_en: string
          name_fr: string
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          max_score?: number | null
          name_en: string
          name_fr: string
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          max_score?: number | null
          name_en?: string
          name_fr?: string
        }
        Relationships: []
      }
      evaluation_scores: {
        Row: {
          created_at: string | null
          criteria_id: string
          id: string
          notes: string | null
          player_evaluation_id: string
          score: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          criteria_id: string
          id?: string
          notes?: string | null
          player_evaluation_id: string
          score: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          criteria_id?: string
          id?: string
          notes?: string | null
          player_evaluation_id?: string
          score?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "evaluation_scores_criteria_id_fkey"
            columns: ["criteria_id"]
            isOneToOne: false
            referencedRelation: "evaluation_criteria"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evaluation_scores_player_evaluation_id_fkey"
            columns: ["player_evaluation_id"]
            isOneToOne: false
            referencedRelation: "player_evaluations"
            referencedColumns: ["id"]
          },
        ]
      }
      player_evaluations: {
        Row: {
          coach_id: string
          created_at: string | null
          evaluation_date: string | null
          id: string
          is_completed: boolean | null
          notes: string | null
          overall_score: number | null
          player_id: string
          updated_at: string | null
        }
        Insert: {
          coach_id: string
          created_at?: string | null
          evaluation_date?: string | null
          id?: string
          is_completed?: boolean | null
          notes?: string | null
          overall_score?: number | null
          player_id: string
          updated_at?: string | null
        }
        Update: {
          coach_id?: string
          created_at?: string | null
          evaluation_date?: string | null
          id?: string
          is_completed?: boolean | null
          notes?: string | null
          overall_score?: number | null
          player_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_evaluations_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "coaches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_evaluations_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          birth_date: string | null
          created_at: string | null
          email: string | null
          emergency_contact: string | null
          first_name: string
          id: string
          is_active: boolean | null
          jersey_number: number | null
          last_name: string
          medical_notes: string | null
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          phone: string | null
          position: Database["public"]["Enums"]["player_position"] | null
          updated_at: string | null
        }
        Insert: {
          birth_date?: string | null
          created_at?: string | null
          email?: string | null
          emergency_contact?: string | null
          first_name: string
          id?: string
          is_active?: boolean | null
          jersey_number?: number | null
          last_name: string
          medical_notes?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          phone?: string | null
          position?: Database["public"]["Enums"]["player_position"] | null
          updated_at?: string | null
        }
        Update: {
          birth_date?: string | null
          created_at?: string | null
          email?: string | null
          emergency_contact?: string | null
          first_name?: string
          id?: string
          is_active?: boolean | null
          jersey_number?: number | null
          last_name?: string
          medical_notes?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          phone?: string | null
          position?: Database["public"]["Enums"]["player_position"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      regular_season_players: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          player_id: string | null
          regular_season_id: string | null
          status:
            | Database["public"]["Enums"]["regular_season_player_status"]
            | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          player_id?: string | null
          regular_season_id?: string | null
          status?:
            | Database["public"]["Enums"]["regular_season_player_status"]
            | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          player_id?: string | null
          regular_season_id?: string | null
          status?:
            | Database["public"]["Enums"]["regular_season_player_status"]
            | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regular_season_players_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "regular_season_players_regular_season_id_fkey"
            columns: ["regular_season_id"]
            isOneToOne: false
            referencedRelation: "regular_seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      regular_seasons: {
        Row: {
          coach_id: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          level: Database["public"]["Enums"]["camp_level"] | null
          location: string | null
          name: string
          start_date: string | null
          status: Database["public"]["Enums"]["regular_season_status"] | null
          updated_at: string | null
        }
        Insert: {
          coach_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          level?: Database["public"]["Enums"]["camp_level"] | null
          location?: string | null
          name: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["regular_season_status"] | null
          updated_at?: string | null
        }
        Update: {
          coach_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          level?: Database["public"]["Enums"]["camp_level"] | null
          location?: string | null
          name?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["regular_season_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regular_seasons_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "coaches"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          coach_id: string
          created_at: string | null
          id: string
          level: string | null
          name: string
        }
        Insert: {
          coach_id: string
          created_at?: string | null
          id?: string
          level?: string | null
          name: string
        }
        Update: {
          coach_id?: string
          created_at?: string | null
          id?: string
          level?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "coaches"
            referencedColumns: ["id"]
          },
        ]
      }
      tryout_registrations: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          player_id: string
          registration_date: string | null
          status: Database["public"]["Enums"]["registration_status"] | null
          tryout_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          player_id: string
          registration_date?: string | null
          status?: Database["public"]["Enums"]["registration_status"] | null
          tryout_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          player_id?: string
          registration_date?: string | null
          status?: Database["public"]["Enums"]["registration_status"] | null
          tryout_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tryout_registrations_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tryout_registrations_tryout_id_fkey"
            columns: ["tryout_id"]
            isOneToOne: false
            referencedRelation: "tryouts"
            referencedColumns: ["id"]
          },
        ]
      }
      tryouts: {
        Row: {
          coach_id: string
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          level: Database["public"]["Enums"]["camp_level"] | null
          location: string | null
          name: string
          start_date: string | null
          status: Database["public"]["Enums"]["tryout_status"] | null
          updated_at: string | null
        }
        Insert: {
          coach_id: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          level?: Database["public"]["Enums"]["camp_level"] | null
          location?: string | null
          name: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["tryout_status"] | null
          updated_at?: string | null
        }
        Update: {
          coach_id?: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          level?: Database["public"]["Enums"]["camp_level"] | null
          location?: string | null
          name?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["tryout_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tryouts_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "coaches"
            referencedColumns: ["id"]
          },
        ]
      }
      waiting_list: {
        Row: {
          created_at: string | null
          email: string
          id: string
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          role: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          role?: string
          updated_at?: string | null
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
      camp_level:
        | "M13"
        | "M15"
        | "M18"
        | "U7"
        | "U9"
        | "U11"
        | "U13"
        | "U15"
        | "U18"
        | "Junior"
        | "Senior"
      camp_status: "active" | "inactive"
      coach_role: "coach" | "directeur-general" | "directeur-hockey"
      coaching_level:
        | "initiation"
        | "regional"
        | "provincial"
        | "national"
        | "haute-performance"
      payment_status: "pending" | "paid" | "refunded"
      player_position: "forward" | "defense" | "goalie"
      registration_status: "pending" | "confirmed" | "cancelled" | "attended"
      regular_season_player_status:
        | "active"
        | "inactive"
        | "injured"
        | "suspended"
      regular_season_status: "active" | "completed" | "cancelled"
      tryout_status: "active" | "completed" | "cancelled"
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
    Enums: {
      camp_level: [
        "M13",
        "M15",
        "M18",
        "U7",
        "U9",
        "U11",
        "U13",
        "U15",
        "U18",
        "Junior",
        "Senior",
      ],
      camp_status: ["active", "inactive"],
      coach_role: ["coach", "directeur-general", "directeur-hockey"],
      coaching_level: [
        "initiation",
        "regional",
        "provincial",
        "national",
        "haute-performance",
      ],
      payment_status: ["pending", "paid", "refunded"],
      player_position: ["forward", "defense", "goalie"],
      registration_status: ["pending", "confirmed", "cancelled", "attended"],
      regular_season_player_status: [
        "active",
        "inactive",
        "injured",
        "suspended",
      ],
      regular_season_status: ["active", "completed", "cancelled"],
      tryout_status: ["active", "completed", "cancelled"],
    },
  },
} as const
