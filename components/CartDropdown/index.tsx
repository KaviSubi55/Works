'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, X } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  location: string;
  area: string;
  image: string;
  propertyType: string;
  beds: string;
  price: number;
  addedAt: string;
}

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const loadCartItems = () => {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(items);
  };

  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Load cart items
    loadCartItems();

    // Listen for login events
    const handleLoginEvent = () => {
      const updatedUsername = localStorage.getItem('username');
      if (updatedUsername) {
        setUsername(updatedUsername);
      }
    };

    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCartItems();
    };

    window.addEventListener('userLoggedIn', handleLoginEvent);
    window.addEventListener('storage', handleLoginEvent);
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('userLoggedIn', handleLoginEvent);
      window.removeEventListener('storage', handleLoginEvent);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // Reload cart items when dropdown opens
    loadCartItems();

    // Handle click outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Don't close if clicking the remove button or its children
      if (target.closest('button[aria-label="Remove from cart"]')) {
        return;
      }

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
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

  const removeFromCart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent event bubbling to click-outside handler
    const updatedCart = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-[600px] flex flex-col"
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
      {cartItems.length === 0 ? (
        <div className="p-6">
          <div className="flex flex-col items-center justify-center text-center py-8">
            <div className="mb-4 p-4 bg-gray-100 rounded-full">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-sm text-gray-600">Add items to get started</p>
          </div>
        </div>
      ) : (
        <>
          {/* Cart Items - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 bg-gray-50 rounded-lg p-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.name}</h4>
                  <p className="text-xs text-gray-600 mb-2">
                    {item.area}, {item.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-600">{item.beds}</span>
                    </div>
                    <div className="font-bold text-[#C41E3A]">
                      {item.price.toLocaleString()} SEK
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => removeFromCart(e, item.id)}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                  aria-label="Remove from cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Footer - Total and Checkout */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-900">Total:</span>
              <span className="text-xl font-bold text-[#C41E3A]">
                {getTotalPrice().toLocaleString()} SEK
              </span>
            </div>
            <button className="w-full bg-[#C41E3A] text-white py-3 rounded-full font-bold hover:bg-[#A01830] transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
