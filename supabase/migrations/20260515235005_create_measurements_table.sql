/*
  # Create Measurements Table for SelfMetrics

  ## Summary
  Creates the core data table for storing user anthropometric measurements.

  ## New Tables
  - `measurements`
    - `id` (uuid, primary key)
    - `session_id` (text) - anonymous session identifier
    - `weight_kg` (numeric) - weight in kilograms
    - `height_cm` (numeric) - height in centimeters
    - `neck_cm` (numeric, nullable) - neck circumference
    - `chest_cm` (numeric, nullable) - chest circumference
    - `waist_cm` (numeric, nullable) - waist circumference
    - `hip_cm` (numeric, nullable) - hip circumference
    - `bicep_cm` (numeric, nullable) - bicep circumference
    - `thigh_cm` (numeric, nullable) - thigh circumference
    - `bmi` (numeric) - calculated BMI
    - `whr` (numeric, nullable) - calculated waist-hip ratio
    - `created_at` (timestamptz) - timestamp of measurement

  ## Security
  - RLS enabled
  - Session-based access: users can only read/write measurements matching their session_id
*/

CREATE TABLE IF NOT EXISTS measurements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
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

ALTER TABLE measurements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Session users can insert own measurements"
  ON measurements FOR INSERT
  TO anon
  WITH CHECK (session_id = current_setting('request.headers', true)::json->>'x-session-id');

CREATE POLICY "Session users can select own measurements"
  ON measurements FOR SELECT
  TO anon
  USING (session_id = current_setting('request.headers', true)::json->>'x-session-id');
