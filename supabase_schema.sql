// supabase_schema.sql
-- Run this in your Supabase SQL Editor

-- 1. Profiles Table
create table if not exists profiles (
  id uuid references auth.users(id) primary key,
  name text,
  email text,
  avatar_url text, -- New column for profile photos
  created_at timestamp default now()
);

-- 2. Quiz Results Table
create table if not exists quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade unique, -- unique to prevent multiple submissions
  score int,
  ai_type text,
  logic_score int,
  creativity_score int,
  risk_score int,
  empathy_score int,
  stability_index int,
  trust_level text,
  created_at timestamp default now()
);

-- 3. Feedback Table
create table if not exists feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  rating int,
  suggestion text,
  created_at timestamp default now()
);

-- 4. Decisions Table (History)
create table if not exists decisions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  question_id int,
  selected_answer text,
  trait_impact jsonb,
  created_at timestamp default now()
);

-- Enable RLS
alter table profiles enable row level security;
alter table quiz_results enable row level security;
alter table feedback enable row level security;
alter table decisions enable row level security;

-- Policies
create policy "Users can view their own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update their own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert their own profile" on profiles for insert with check (auth.uid() = id);

create policy "Users can view their own results" on quiz_results for select using (auth.uid() = user_id);
create policy "Users can insert their own results" on quiz_results for insert with check (auth.uid() = user_id);

-- Leaderboard needs public read access
create policy "Anyone can view quiz results" on quiz_results for select using (true);

create policy "Users can insert feedback" on feedback for insert with check (auth.uid() = user_id);
create policy "Users can view their own feedback" on feedback for select using (auth.uid() = user_id);

create policy "Users can insert their decisions" on decisions for insert with check (auth.uid() = user_id);
create policy "Users can view their own decisions" on decisions for select using (auth.uid() = user_id);
