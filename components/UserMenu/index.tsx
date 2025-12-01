'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, LogIn } from 'lucide-react';

const UserMenu: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
    setUsername(null);
    setIsLoggedIn(false);
    router.push('/login');
  };

  if (!isLoggedIn) {
    // Show Login button
    return (
      <Link 
        href="/login"
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
      >
        <LogIn className="w-4 h-4" />
        <span className="font-medium hidden sm:inline">Login</span>
      </Link>
    );
  }

  // Show username first letter with dropdown on hover
  return (
    <div className="relative group">
      {/* User avatar with first letter */}
      <div className="flex items-center justify-center w-10 h-10 bg-[#C41E3A] rounded-full cursor-pointer hover:bg-[#A01830] transition-colors">
        <span className="text-white font-bold text-sm uppercase">
          {username?.[0] || 'U'}
        </span>
      </div>

      {/* Dropdown menu - shows on hover */}
      <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700 hover:text-red-600 rounded-lg"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
