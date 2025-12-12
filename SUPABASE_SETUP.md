# Supabase Authentication Setup Guide

## Issue: "new row violates row-level security policy for table 'users'"

This error occurs because Supabase's Row Level Security (RLS) is enabled on your tables, but there are no policies allowing the signup process to insert new user records.

## Quick Fix (5 minutes)

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**

### Step 2: Run the Setup SQL

1. Open the file `supabase-setup.sql` in this project
2. Copy **ALL** the SQL code
3. Paste it into the Supabase SQL Editor
4. Click **RUN** (or press Ctrl+Enter / Cmd+Enter)

### Step 3: Verify Success

After running the SQL, you should see output showing the policies were created. Look for messages like:
- `ALTER TABLE`
- `CREATE POLICY`

At the bottom of the output, you'll see a table listing all the policies for each table.

### Step 4: Test Signup

1. Go to your app: http://localhost:3000/auth/signup
2. Enter:
   - Email: test@example.com
   - Username: testuser
   - Password: password123
3. Click "Sign In"
4. You should be redirected to the home page, logged in successfully

---

## What the SQL Does

### For `users` Table:
- ✅ Allows authenticated users to **INSERT** their own profile (during signup)
- ✅ Allows authenticated users to **SELECT** (view) their own profile
- ✅ Allows authenticated users to **UPDATE** their own profile

### For `cart_items` Table:
- ✅ Allows users to view, add, update, and delete their own cart items
- 🔒 Prevents users from accessing other users' carts

### For `orders` Table:
- ✅ Allows users to view, create, and update their own orders
- 🔒 Prevents users from accessing other users' orders

---

## Understanding Row Level Security (RLS)

RLS is a security feature that controls which rows users can access in your database tables.

**Without RLS policies:**
- ❌ Users can't insert/read/update ANY rows (even their own)
- ❌ Signup fails with "row-level security policy" error

**With RLS policies:**
- ✅ Users can only access rows that belong to them (where `auth.uid() = user_id`)
- ✅ Data is automatically secured
- ✅ No risk of users accessing each other's data

---

## Alternative: Disable RLS (NOT RECOMMENDED)

**⚠️ WARNING:** This makes your database insecure. Anyone can read/modify all data.

Only use this for local testing, NEVER in production:

```sql
-- DANGEROUS: Only for local testing
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
```

---

## Troubleshooting

### Error persists after running SQL?

1. **Check if policies were created:**
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'users';
   ```

2. **Clear your browser cache** and try again

3. **Restart your dev server:**
   ```bash
   # Stop the server (Ctrl+C)
   # Start it again
   npm run dev
   ```

### Still having issues?

Check the browser console (F12) for detailed error messages and share them for further assistance.

---

## Next Steps

After setting up RLS policies:
1. ✅ Test signup with a new account
2. ✅ Test login with your credentials
3. ✅ Test logout
4. ✅ Test that session persists after page refresh

Your authentication system should now work perfectly! 🎉
