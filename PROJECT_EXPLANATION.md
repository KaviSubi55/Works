# Peakster - Graduation Project Simple Explanation

## Project Overview
**Peakster** is a ski resort booking website built with **Next.js, React, and TypeScript**. It allows users to search and book ski accommodations, packages, ski passes, and equipment rentals.

---

## What I Built - Step by Step

### 1. **Header Component**
**File:** `components/Header/index.tsx`

**What I did:**
- Created a navigation bar that appears on every page
- Added the **Peakster logo** and brand name
- Implemented **Season toggles** (Winter and Summer icons with tooltips)
- Added **Shopping Cart icon** with a red badge showing item count
- Built **User Menu** (Login button or user avatar when logged in)
- Integrated **Language Selector** (Swedish/English switching)
- Made it **fully responsive** - different layouts for mobile and desktop
- Used React hooks: `useState` for tracking cart count and menu states

```typescript
const [cartCount, setCartCount] = useState(0);
const [isCartOpen, setIsCartOpen] = useState(false);
```

---

### 2. **Shopping Cart System**
**Files:** `components/CartDropdown/index.tsx`, `utils/cartUtils.ts`

**What I did:**
- Built a **dropdown cart** that opens when you click the cart icon
- Displays all items added to cart with details (name, price, location, beds)
- Shows **total price** at the bottom
- Each item has a **remove button** (X icon)
- Cart is **saved in localStorage** so items persist even after page refresh
- Made cart **user-specific** - each logged-in user has their own cart

**Technical Implementation:**
```typescript
// User-specific cart storage
const cartKey = username ? `cartItems_${username}` : 'cartItems_guest';
localStorage.setItem(cartKey, JSON.stringify(items));
```

**Features:**
- Real-time cart count badge updates
- Cart items persist across page reloads
- Different carts for different users
- Used React hooks: `useState`, `useEffect`, `useRef`

---

### 3. **Login System with LocalStorage**
**Files:** `components/UserMenu/index.tsx`, `pages/LogInPage/page.tsx`

**What I did:**
- Created a **login page** with username and password fields
- Validates credentials on form submission
- Stores login status in **localStorage**:
  ```typescript
  localStorage.setItem('username', username);
  localStorage.setItem('isLoggedIn', 'true');
  ```
- After login, shows user avatar with **first letter of username**
- Built a **dropdown user menu** that shows on click:
  - User icon and greeting "Hi, [Username]!"
  - Logout button
- When logged out, shows "Login" button instead
- Used custom events to update UI instantly without page reload:
  ```typescript
  window.dispatchEvent(new Event('userLoggedIn'));
  ```

**React Hooks Used:**
- `useState` - track login state, username, dropdown state
- `useEffect` - check localStorage on page load, listen for login events

---

### 4. **Navigation System**
**File:** `components/SecondaryNav/index.tsx`

**What I did:**
- Built a **tab-based navigation** bar with 5 sections:
  1. Home
  2. Accommodation
  3. Package
  4. Ski Pass
  5. Rent

- Each tab has an icon and label
- Clicking a tab changes the active search form below
- Active tab is highlighted in red color (`#C41E3A`)
- Made it **responsive**:
  - **Desktop:** Horizontal tabs
  - **Mobile:** Hamburger menu that slides in from left

**Technical Details:**
```typescript
const [activeTab, setActiveTab] = useState<TabType>('home');

// Conditional rendering based on active tab
{activeTab === 'accommodation' && <AccommodationSearch />}
{activeTab === 'package' && <PackageSearch />}
{activeTab === 'skipass' && <SkiPassSearch />}
```

---

### 5. **Destination Dropdown**
**File:** `components/DestinationDropdown/index.tsx`

**What I did:**
- Created a **dropdown menu** to select destinations
- Two main destinations: **Åre** (ski resort) and **Stockholm** (city)
- Opens on click, shows list of available destinations
- Selected destination is saved and filters the results
- Closes when clicking outside (using `useRef` and click-outside detection)

**Implementation:**
```typescript
const [selectedDestination, setSelectedDestination] = useState('All destinations');
const [isOpen, setIsOpen] = useState(false);

// Close on outside click
useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
}, []);
```

---

### 6. **Search Components (Calendar & Filters)**

I created **4 different search forms** for different booking types:

#### A. **Accommodation Search**
**File:** `components/AccomodationSearch/index.tsx`

**Features:**
- **Destination dropdown** - Select Åre, Stockholm, etc.
- **Check-in/Check-out dates** - Date picker inputs
- **Guest counter** - Increment/decrement number of guests
- **Search button** - Filters results

#### B. **Package Search**
**File:** `components/PackageSearch/index.tsx`

**Features:**
- **Destination selector**
- **Date range picker**
- **Duration tabs** (3 days, 7 days, etc.)
- **Number of travelers**

#### C. **Ski Pass Search**
**File:** `components/SkiPassSearch/index.tsx`

**Features:**
- **Resort selection**
- **Pass duration** (1 day, week pass, season pass)
- **Number of passes needed**

#### D. **Rent Search**
**File:** `components/RentSearch/index.tsx`

**Features:**
- **Equipment type** (skis, snowboards, boots, etc.)
- **Rental dates**
- **Size selection**

**Common React Patterns Used:**
```typescript
const [checkInDate, setCheckInDate] = useState('');
const [checkOutDate, setCheckOutDate] = useState('');
const [guests, setGuests] = useState(2);
const [selectedDestination, setSelectedDestination] = useState('All destinations');
```

---

### 7. **All Pages Created**

#### **Home Page** (`app/page.tsx`)
- Hero section with background image
- Two promotional cards (Accommodation and Packages)
- Secondary navigation
- Main landing page content

#### **Accommodation Page** (`app/accommodation/page.tsx`)
- Lists all available properties
- Filter bar (price, beds, location)
- Property cards with images, details, and "Add to Cart" button
- Uses **PropertyCard component**

#### **Package Page** (`app/package/page.tsx`)
- Shows vacation packages
- Each package has **4 images** with counter (1/4, 2/4, etc.)
- Includes accommodation + ski pass + extras
- Uses **PackageCard component** with image carousel

#### **Ski Pass Page** (`app/ski-pass/page.tsx`)
- Different pass options (day pass, week pass, season pass)
- Price comparison
- Add to cart functionality
- Uses **SkiPassCard component**

#### **Rent Page** (`app/rent/page.tsx`)
- Equipment listings (skis, snowboards, helmets, boots)
- Multiple images per item with counter
- Size and availability info
- Uses **RentCard component**

#### **Ski School Page** (`app/ski-school/page.tsx`)
- Lesson options (beginner, intermediate, advanced)
- Instructor information
- Booking form

#### **Login Page** (`app/login/page.tsx`)
- Login form with validation
- Background image
- Error messages
- Redirects to home after successful login

#### **Destination Pages**
- `app/destinations/are/page.tsx` - Åre ski resort info
- `app/destinations/stockholm/page.tsx` - Stockholm city info
- Shows destination-specific packages and accommodations

---

### 8. **Card Components**

I built reusable card components to display items:

#### **PropertyCard** (`components/PropertyCard/index.tsx`)
- Shows accommodation image
- Property name and location
- Beds, property type, area
- Price per night
- "Add to Cart" button

#### **PackageCard** (`components/PackageCard/index.tsx`)
- **Image carousel** with 4 images
- Image counter display (1/4, 2/4, 3/4, 4/4)
- Package title, location, duration
- Included items (ski pass, rental, etc.)
- Price and "Add to Cart" button

#### **RentCard** (`components/RentCard/index.tsx`)
- Equipment image with counter
- Equipment name and size
- Rental price per day
- Availability status
- "Add to Rent" button

#### **SkiPassCard** (`components/SkiPassCard/index.tsx`)
- Pass type and duration
- Resort information
- Price details
- "Add to Cart" button

---

### 9. **Filter Bars**

Built filter components for each page:

**PackageFilterBar** - Filter by:
- Destination (Åre, Stockholm)
- Duration (3, 5, 7, 10 days)
- Price range
- Includes (ski pass, rental, ski school)

**RentFilterBar** - Filter by:
- Equipment type
- Size
- Price range
- Availability

**FilterBar** - General filtering for accommodations:
- Location
- Property type
- Beds
- Price range

---

### 10. **React Hooks Usage Throughout Project**

#### **useState** - Used everywhere for state management
```typescript
// Examples from the project
const [isOpen, setIsOpen] = useState(false);
const [activeTab, setActiveTab] = useState('home');
const [cartItems, setCartItems] = useState([]);
const [username, setUsername] = useState('');
const [checkInDate, setCheckInDate] = useState('');
```

#### **useEffect** - For side effects and lifecycle
```typescript
// Load cart on component mount
useEffect(() => {
  const items = getCartItems();
  setCartItems(items);
}, []);

// Listen for cart updates
useEffect(() => {
  const handleCartUpdate = () => {
    setCartCount(getCartCount());
  };
  window.addEventListener('cartUpdated', handleCartUpdate);

  return () => {
    window.removeEventListener('cartUpdated', handleCartUpdate);
  };
}, []);

// Check login status on page load
useEffect(() => {
  const storedUsername = localStorage.getItem('username');
  if (storedUsername) {
    setUsername(storedUsername);
    setIsLoggedIn(true);
  }
}, []);
```

#### **useRef** - For DOM references
```typescript
const dropdownRef = useRef<HTMLDivElement>(null);

// Click outside detection
useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
}, []);
```

#### **useRouter** - For navigation (Next.js hook)
```typescript
import { useRouter } from 'next/navigation';

const router = useRouter();

const handleLogin = () => {
  // After successful login
  router.push('/');
};
```

---

### 11. **Client-Side Features**

All interactive components use **'use client'** directive (Next.js 13+ requirement):

```typescript
'use client';

import React, { useState } from 'react';
```

**Client-side features I implemented:**

#### **LocalStorage Usage:**
- **User login data:** `localStorage.getItem('username')`
- **Cart items:** `localStorage.setItem('cartItems_user', JSON.stringify(items))`
- **Persists across page reloads**

#### **Custom Events for Real-time Updates:**
```typescript
// Dispatch events
window.dispatchEvent(new Event('cartUpdated'));
window.dispatchEvent(new Event('userLoggedIn'));

// Listen for events
window.addEventListener('cartUpdated', handleCartUpdate);
window.addEventListener('userLoggedIn', handleLoginUpdate);
```

#### **Dynamic UI Updates:**
- Cart count badge updates instantly when adding items
- User menu shows username immediately after login
- Cart dropdown refreshes when items are removed
- No page reload needed for these updates

#### **Form Handling:**
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Validate inputs
  // Save to localStorage
  // Update state
  // Show success message
};
```

#### **State-based Rendering:**
```typescript
// Conditional rendering based on state
{isLoggedIn ? <UserAvatar /> : <LoginButton />}
{cartItems.length === 0 ? <EmptyCart /> : <CartItems />}
{activeTab === 'accommodation' && <AccommodationSearch />}
```

---

### 12. **Data Management**

Created data files in `/data` folder:

**packages.ts** - 11 vacation packages with:
- ID, title, location, destination
- 4 images per package
- Days, price, property type
- Included amenities
- Description

**accommodations.ts** - Property listings with:
- Multiple images
- Beds, area, location
- Property type, amenities
- Price per night

**skipasses.ts** - Ski pass options
**rentals.ts** - Rental equipment inventory
**menu-items.ts** - Navigation structure

---

### 13. **Responsive Design**

Made everything work on all devices using Tailwind CSS:

```typescript
// Desktop
className="hidden lg:flex"

// Mobile
className="lg:hidden flex"

// Responsive sizes
className="w-full lg:w-1/3 md:w-1/2"

// Breakpoints
max-[480px]: // Mobile (480px and below)
max-md:      // Tablet (1023px and below)
lg:          // Desktop (1024px and above)
```

**Features:**
- Mobile hamburger menu
- Responsive card grids
- Touch-friendly buttons
- Collapsible navigation
- Adaptive layouts

---

## Technical Summary

### **Technologies Used:**
- ✅ Next.js 16 (App Router)
- ✅ React 19
- ✅ TypeScript
- ✅ Tailwind CSS 4
- ✅ Lucide React (icons)

### **React Concepts Used:**
- ✅ Functional Components
- ✅ React Hooks (useState, useEffect, useRef)
- ✅ Event Handling
- ✅ Conditional Rendering
- ✅ Props and Component Composition
- ✅ Client-side Rendering
- ✅ Form Handling

### **Key Features:**
- ✅ User Authentication (LocalStorage)
- ✅ Shopping Cart System
- ✅ Multiple Search Forms
- ✅ Destination Selection
- ✅ Date Pickers
- ✅ Image Carousels
- ✅ Filter Systems
- ✅ Responsive Design
- ✅ Real-time UI Updates
- ✅ Custom Events
- ✅ User-specific Data Isolation

### **Pages Created:** 7 main pages
### **Components Built:** 28 reusable components
### **Lines of Code:** 5000+ lines across 53 files
### **Commits:** 221 commits

---

## How Everything Works Together

1. **User visits the site** → Sees home page with hero section
2. **Clicks on navigation** → SecondaryNav switches between search types
3. **Selects destination** → DestinationDropdown filters results
4. **Searches for accommodation** → AccommodationSearch component handles form
5. **Views results** → PropertyCard components display listings
6. **Adds item to cart** → CartDropdown updates, badge shows count
7. **Logs in** → UserMenu shows avatar, cart becomes user-specific
8. **Cart persists** → Data saved in localStorage
9. **All updates happen instantly** → Custom events trigger re-renders
10. **Works on all devices** → Responsive design adapts layout

---

## What I Learned

1. **React Development** - Building complex UIs with hooks
2. **State Management** - Managing state across multiple components
3. **LocalStorage** - Persisting data client-side
4. **Event System** - Custom events for component communication
5. **TypeScript** - Type-safe development
6. **Responsive Design** - Mobile-first CSS
7. **Next.js** - Modern React framework with App Router
8. **Component Architecture** - Building reusable components
9. **Form Handling** - User input validation and submission
10. **Git Workflow** - Version control with 221 commits

---

**This is a complete, working booking platform ready for deployment!**
