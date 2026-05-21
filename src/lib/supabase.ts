import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Measurement = {
  id: string;
  session_id: string;
  weight_kg: number;
  height_cm: number;
  neck_cm: number | null;
  chest_cm: number | null;
  waist_cm: number | null;
  hip_cm: number | null;
  bicep_cm: number | null;
  thigh_cm: number | null;
  bmi: number;
  whr: number | null;
  created_at: string;
};
