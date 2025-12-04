'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart } from 'lucide-react';

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Listen for login events
    const handleLoginEvent = () => {
      const updatedUsername = localStorage.getItem('username');
      if (updatedUsername) {
        setUsername(updatedUsername);
      }
    };

    window.addEventListener('userLoggedIn', handleLoginEvent);
    window.addEventListener('storage', handleLoginEvent);

    return () => {
      window.removeEventListener('userLoggedIn', handleLoginEvent);
      window.removeEventListener('storage', handleLoginEvent);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // Handle click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Handle scroll
    const handleScroll = () => {
      onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        {username ? (
          <div className="text-sm">
            <span className="text-gray-600">Hello, </span>
            <span className="font-semibold text-gray-900">{username}</span>
          </div>
        ) : (
          <div className="text-sm text-gray-600">Welcome, Guest</div>
        )}
      </div>

      {/* Cart Content */}
      <div className="p-6">
        <div className="flex flex-col items-center justify-center text-center py-8">
          <div className="mb-4 p-4 bg-gray-100 rounded-full">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-sm text-gray-600">Add items to get started</p>
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;
