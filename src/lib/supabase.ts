import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Variáveis de ambiente do Supabase não configuradas!')
  console.error('Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          created_at: string
          has_paid: boolean
        }
        Insert: {
          id: string
          email: string
          full_name: string
          created_at?: string
          has_paid?: boolean
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          created_at?: string
          has_paid?: boolean
        }
      }
      quiz_responses: {
        Row: {
          id: string
          user_id: string
          name: string
          birth_date: string
          height: number
          weight: number
          age: number
          gender: string | null
          goal: string
          activity_level: string
          insecurities: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          birth_date: string
          height: number
          weight: number
          age: number
          gender?: string | null
          goal: string
          activity_level: string
          insecurities: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          birth_date?: string
          height?: number
          weight?: number
          age?: number
          gender?: string | null
          goal?: string
          activity_level?: string
          insecurities?: string
          created_at?: string
        }
      }
      meals: {
        Row: {
          id: string
          user_id: string
          date: string
          meal_name: string
          proteins: number
          carbs: number
          fiber: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          meal_name: string
          proteins: number
          carbs: number
          fiber: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          meal_name?: string
          proteins?: number
          carbs?: number
          fiber?: number
          created_at?: string
        }
      }
      medications: {
        Row: {
          id: string
          user_id: string
          name: string
          time: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          time: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          time?: string
          created_at?: string
        }
      }
      medication_logs: {
        Row: {
          id: string
          medication_id: string
          user_id: string
          date: string
          taken: boolean
          created_at: string
        }
        Insert: {
          id?: string
          medication_id: string
          user_id: string
          date: string
          taken: boolean
          created_at?: string
        }
        Update: {
          id?: string
          medication_id?: string
          user_id?: string
          date?: string
          taken?: boolean
          created_at?: string
        }
      }
      symptoms: {
        Row: {
          id: string
          user_id: string
          date: string
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          description?: string
          created_at?: string
        }
      }
      streaks: {
        Row: {
          id: string
          user_id: string
          current_streak: number
          longest_streak: number
          last_activity_date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          current_streak?: number
          longest_streak?: number
          last_activity_date: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          current_streak?: number
          longest_streak?: number
          last_activity_date?: string
          created_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          user_id: string
          achievement_type: string
          unlocked_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_type: string
          unlocked_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_type?: string
          unlocked_at?: string
        }
      }
    }
  }
}
