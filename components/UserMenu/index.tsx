'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut as LogOutIcon, LogIn as LogInIcon, User } from 'lucide-react';
import { LogOut } from '@/actions/log-out';

const UserMenu: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const checkLoginStatus = () => {
      const storedUsername = localStorage.getItem('username');
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';

      if (loggedIn && storedUsername) {
        setUsername(storedUsername);
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();

    // Listen for storage changes (login from same tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'username' || e.key === 'isLoggedIn') {
        checkLoginStatus();
      }
    };

    // Listen for custom login event (for same-tab updates)
    const handleLoginEvent = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLoggedIn', handleLoginEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLoggedIn', handleLoginEvent);
    };
  }, []);

  const handleLogout = async () => {
    console.log('Logout initiated...');
    setIsDropdownOpen(false);

    try {
      // Call server action to sign out from Supabase
      console.log('Calling server logout action...');
      const result = await LogOut();
      console.log('Logout result:', result);
    } catch (error) {
      console.error('Logout error:', error);
    }

    // Always clear localStorage and state, even if server action fails
    console.log('Clearing localStorage...');
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
    setUsername(null);
    setIsLoggedIn(false);

    // Notify other components about user state and cart changes
    window.dispatchEvent(new Event('userLoggedIn'));
    window.dispatchEvent(new Event('cartUpdated'));

    console.log('Redirecting to login page...');
    // Use window.location for a full page refresh to ensure clean state
    window.location.href = '/auth/login';
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside or scrolling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu-container')) {
        setIsDropdownOpen(false);
      }
    };

    const handleScroll = () => {
      setIsDropdownOpen(false);
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isDropdownOpen]);

  if (!isLoggedIn) {
    // Show Login button
    return (
      <Link
        href="/auth/login"
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
      >
        <LogInIcon className="w-4 h-4" />
        <span className="font-medium hidden sm:inline">Login</span>
      </Link>
    );
  }

  // Show username first letter with dropdown on click
  return (
    <div className="relative user-menu-container">
      {/* User avatar with first letter */}
      <div
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 bg-[#C41E3A] rounded-full cursor-pointer transition-colors"
      >
        <span className="text-white font-bold text-sm uppercase">
          {username?.[0] || 'U'}
        </span>
      </div>

      {/* Dropdown menu - shows on click */}
      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
          {/* User Info Section */}
          <div className="px-4 py-6 text-center">
            {/* User Icon Circle */}
            <div className="w-16 h-16 bg-[#C41E3A] rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
              <User className="w-8 h-8 text-white" />
            </div>

            {/* Greeting */}
            <p className="text-gray-900 font-semibold text-base">
              Hi, {username ? username.charAt(0).toUpperCase() + username.slice(1).toLowerCase() : 'User'}!
            </p>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 hover:bg-red-50 transition-colors flex items-center justify-center gap-2 text-gray-700 hover:text-red-600 font-medium"
          >
            <LogOutIcon className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
