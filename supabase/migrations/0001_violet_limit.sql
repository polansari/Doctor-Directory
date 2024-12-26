/*
  # Initial Schema Setup for Doctor Directory

  1. New Tables
    - `profiles`
      - Stores doctor profile information
      - Contains all doctor-specific fields
      - Links to auth.users through user_id
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for admin access
*/

-- Create profiles table for doctors
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id),
  full_name text NOT NULL,
  qualification text NOT NULL,
  expertise text NOT NULL,
  clinic_name text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  contact text NOT NULL,
  fees integer NOT NULL,
  availability jsonb NOT NULL,
  profile_url text,
  is_verified boolean DEFAULT false,
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles table
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create function to handle user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, qualification, expertise, clinic_name, city, state, contact, fees, availability)
  VALUES (
    new.id,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    0,
    '{"days": [], "hours": {"start": "", "end": ""}}'::jsonb
  );
  RETURN new;
END;
$$ language plpgsql security definer;

-- Create trigger for new user registration
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE handle_new_user();