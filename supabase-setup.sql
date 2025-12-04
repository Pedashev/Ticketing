-- Supabase Table Setup Script
-- Run this in your Supabase SQL Editor

-- Create the tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  owner TEXT NOT NULL,
  problem_description TEXT NOT NULL,
  outcome TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create an index on status for faster filtering
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);

-- Create an index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_tickets_created_at ON tickets(created_at DESC);

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_tickets_updated_at 
  BEFORE UPDATE ON tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists (in case you're re-running this script)
DROP POLICY IF EXISTS "Allow all operations on tickets" ON tickets;
DROP POLICY IF EXISTS "Allow SELECT on tickets" ON tickets;
DROP POLICY IF EXISTS "Allow INSERT on tickets" ON tickets;
DROP POLICY IF EXISTS "Allow UPDATE on tickets" ON tickets;
DROP POLICY IF EXISTS "Allow DELETE on tickets" ON tickets;

-- Create explicit policies for each operation (more reliable than FOR ALL)
-- This ensures DELETE operations work correctly

CREATE POLICY "Allow SELECT on tickets" ON tickets
  FOR SELECT
  USING (true);

CREATE POLICY "Allow INSERT on tickets" ON tickets
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow UPDATE on tickets" ON tickets
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow DELETE on tickets" ON tickets
  FOR DELETE
  USING (true);

-- Optional: Insert some sample data for testing
-- Uncomment the lines below if you want sample tickets

-- INSERT INTO tickets (topic, status, owner, problem_description, outcome) VALUES
-- ('Cannot login to system', 'new', 'John Doe', 'User reports being unable to login despite correct credentials. Password reset was attempted but issue persists.', NULL),
-- ('Email notifications not working', 'in_progress', 'Jane Smith', 'Users are not receiving email notifications when tickets are updated. This started happening after the last deployment.', NULL),
-- ('Slow page load times', 'resolved', 'Bob Johnson', 'The dashboard page is loading very slowly. Users are reporting 10+ second load times.', 'Optimized database queries and added caching. Page load time reduced to under 2 seconds.');


