-- =====================================================
-- Supabase Setup: RLS Policies for Authentication
-- =====================================================
-- Run these SQL commands in your Supabase SQL Editor
-- (Supabase Dashboard > SQL Editor > New Query)
-- =====================================================

-- 1. Enable Row Level Security on users table (if not already enabled)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can insert their own profile during signup" ON users;
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;

-- 3. Allow users to INSERT their own profile during signup
-- This allows the signup action to create a user record
CREATE POLICY "Users can insert their own profile during signup"
ON users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- 4. Allow users to SELECT (read) their own profile
CREATE POLICY "Users can view their own profile"
ON users
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- 5. Allow users to UPDATE their own profile
CREATE POLICY "Users can update their own profile"
ON users
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 6. Optional: Allow public read access to usernames (for displaying in the app)
-- Uncomment the next policy if you want usernames to be publicly visible
-- CREATE POLICY "Public profiles are viewable by everyone"
-- ON users
-- FOR SELECT
-- TO public
-- USING (true);

-- =====================================================
-- For cart_items table (if needed)
-- =====================================================

-- Enable RLS on cart_items table
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can manage their own cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can view their own cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can insert their own cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can update their own cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can delete their own cart items" ON cart_items;

-- Allow users to manage their own cart
CREATE POLICY "Users can view their own cart items"
ON cart_items
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cart items"
ON cart_items
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart items"
ON cart_items
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart items"
ON cart_items
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- =====================================================
-- For orders table (if needed)
-- =====================================================

-- Enable RLS on orders table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert their own orders" ON orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON orders;

-- Allow users to manage their own orders
CREATE POLICY "Users can view their own orders"
ON orders
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders"
ON orders
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders"
ON orders
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- Verification Queries
-- =====================================================
-- Run these to verify the policies were created successfully:

-- Check users table policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'users';

-- Check cart_items table policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'cart_items';

-- Check orders table policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'orders';
