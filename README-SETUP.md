# Peakster Authentication & Cart Setup Guide

This guide will help you set up Supabase authentication and cart functionality for the Peakster application.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Node.js and npm installed

## Installation Steps

### 1. Install Dependencies

All required dependencies have been installed:
- `@supabase/ssr` - Supabase SSR support
- `@supabase/supabase-js` - Supabase JavaScript client
- `zod` - Schema validation
- `react-hook-form` - Form handling
- `@hookform/resolvers` - Zod resolver for React Hook Form
- `@tanstack/react-query` - Data fetching and mutations

### 2. Set Up Supabase Project

1. Go to https://supabase.com/dashboard
2. Create a new project or select an existing one
3. Go to Project Settings > API
4. Copy your:
   - Project URL
   - Anon/Public key

### 3. Configure Environment Variables

1. Create a `.env.local` file in the root directory:
   ```bash
   cp .env.local.example .env.local
   ```

2. Update the `.env.local` file with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

   **Important:**
   - The service role key is required for signup to work properly (it bypasses RLS when creating user profiles)
   - Find it in Supabase Dashboard > Project Settings > API > `service_role` key (secret)
   - Never expose this key in client-side code - it's only used in server actions

### 4. Set Up Database Tables

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy the contents of `database-schema.sql`
4. Paste and run it in the SQL Editor

This will create:
- **users table**: Stores user profiles with username
- **cart_items table**: Stores cart items for each user
- **orders table**: (Optional) For storing completed orders
- All necessary Row Level Security (RLS) policies
- Indexes for performance
- Triggers for automatic timestamp updates

### 5. Configure Authentication in Supabase

1. Go to Authentication > Settings in your Supabase dashboard
2. Configure your authentication settings:
   - Enable Email provider
   - Configure email templates (optional)
   - Set up redirect URLs if needed

### 6. Update Your Application

The following has been implemented:

#### Authentication Files:
- `/actions/log-in.ts` - Login server action
- `/actions/log-out.ts` - Logout server action
- `/actions/sign-up.ts` - Sign up server action
- `/actions/schema.ts` - Zod validation schemas
- `/app/auth/login/page.tsx` - Login page
- `/app/auth/login/LogInForm.tsx` - Login form component
- `/app/auth/signup/page.tsx` - Sign up page
- `/app/auth/signup/SignUpForm.tsx` - Sign up form component

#### Cart Files:
- `/actions/cart.ts` - Cart server actions (CRUD operations)
- Functions available:
  - `getCartItems()` - Fetch user's cart items
  - `addToCart()` - Add item to cart
  - `updateCartItem()` - Update item quantity
  - `removeFromCart()` - Remove item from cart
  - `clearCart()` - Clear all cart items

#### Utility Files:
- `/utils/supabase/server-client.ts` - Server-side Supabase client
- `/utils/supabase/client.ts` - Client-side Supabase client

#### Middleware:
- `/middleware.ts` - Route protection and authentication

#### Components:
- `/components/ErrorMessage.tsx` - Error message display component

### 7. Update Old Login Page

The old login page at `/app/login/page.tsx` currently points to `/pages/LogInPage/page.tsx` which uses localStorage. You should update it to use the new authentication:

```tsx
import { redirect } from "next/navigation"

export default function Login() {
  redirect("/auth/login")
}
```

Or simply delete `/app/login/page.tsx` and update any links to point to `/auth/login`.

### 8. Wrap Your App with QueryClientProvider

Update your root layout to include the QueryClientProvider:

```tsx
// app/layout.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}
```

### 9. Using Cart Actions in Your Components

Example of adding an item to cart:

```tsx
'use client'

import { addToCart } from "@/actions/cart"
import { useMutation } from "@tanstack/react-query"

export default function ProductCard({ product }) {
  const { mutate, isPending } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      alert("Item added to cart!")
    }
  })

  const handleAddToCart = () => {
    mutate({
      product_id: product.id,
      product_name: product.name,
      product_type: 'accommodation', // or 'ski_pass', 'rental', etc.
      quantity: 1,
      price: product.price,
      details: { /* any additional data */ }
    })
  }

  return (
    <button onClick={handleAddToCart} disabled={isPending}>
      {isPending ? "Adding..." : "Add to Cart"}
    </button>
  )
}
```

### 10. Protected Routes

Routes can be protected by adding them to the middleware. Update the `protectedRoutes` array in `middleware.ts`:

```typescript
const protectedRoutes = [
  /^\/create$/,
  /^\/[^\/]+\/edit$/,
  /^\/checkout$/, // example
  // Add more routes as needed
]
```

## Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Test the authentication flow:
   - Visit http://localhost:3000/auth/signup
   - Create a new account
   - You should be redirected to the home page
   - Test login at http://localhost:3000/auth/login

3. Test cart functionality:
   - Add items to cart using the cart actions
   - Verify items are stored in the database (check Supabase dashboard)

## Troubleshooting

### "User not authenticated" errors
- Make sure you're logged in
- Check that your Supabase credentials are correct in `.env.local`
- Verify the middleware is running correctly

### Database errors
- Make sure you ran the SQL schema in Supabase
- Check that RLS policies are enabled
- Verify your user has the correct permissions

### Form validation errors
- Check the Zod schemas in `/actions/schema.ts`
- Ensure all required fields are filled

## Next Steps

1. Update your Header component to show user status (logged in/out)
2. Implement cart UI components
3. Create a checkout flow
4. Add order history
5. Implement email verification (optional)

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
