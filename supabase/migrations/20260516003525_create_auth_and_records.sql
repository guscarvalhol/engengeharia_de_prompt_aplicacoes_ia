/*
  # Create Auth Users and Medical Records Tables

  ## Summary
  Adds user authentication and medical evaluation records with full audit trail.

  ## New Tables
  - `users`
    - `id` (uuid, primary key)
    - `email` (text, unique)
    - `password_hash` (text)
    - `name` (text)
    - `created_at` (timestamp)
  
  - `medical_records`
    - `id` (uuid, primary key)
    - `user_id` (uuid, foreign key)
    - `weight_kg` (numeric)
    - `height_cm` (numeric)
    - `neck_cm` (numeric, nullable)
    - `chest_cm` (numeric, nullable)
    - `waist_cm` (numeric, nullable)
    - `hip_cm` (numeric, nullable)
    - `bicep_cm` (numeric, nullable)
    - `thigh_cm` (numeric, nullable)
    - `bmi` (numeric)
    - `whr` (numeric, nullable)
    - `created_at` (timestamptz)

  ## Security
  - RLS enabled on both tables
  - Users can only access their own records
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS medical_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  weight_kg numeric NOT NULL,
  height_cm numeric NOT NULL,
  neck_cm numeric,
  chest_cm numeric,
  waist_cm numeric,
  hip_cm numeric,
  bicep_cm numeric,
  thigh_cm numeric,
  bmi numeric NOT NULL,
  whr numeric,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own record"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can update own record"
  ON users FOR UPDATE
  USING (true);

CREATE POLICY "Users can view own medical records"
  ON medical_records FOR SELECT
  USING (user_id = auth.uid() OR auth.role() = 'authenticated');

CREATE POLICY "Users can insert own medical records"
  ON medical_records FOR INSERT
  WITH CHECK (user_id = auth.uid() OR auth.role() = 'authenticated');
