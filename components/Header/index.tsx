'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingCart, User, ChevronDown, Snowflake, Sun } from 'lucide-react';
import { HeaderProps } from '@/utils/types';
import MegaMenu from '../MegaMenu';
import LanguageSelector from '../LanguageSelector';
import UserMenu from '../UserMenu';
import CartDropdown from '../CartDropdown';

const Header: React.FC<HeaderProps> = ({ navigationItems }) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('SE');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const defaultNavItems = navigationItems || [
    { label: 'Destinations', href: '/destinations', hasDropdown: true },
  ];

  return (
    <>
      <header className="bg-white border-b border-gray-200 z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Layout - Single Row */}
          <div className="hidden lg:flex items-center justify-between h-16">
            {/* Left Section: Menu Button and Logo */}
            <div className="flex items-center gap-4">
              {/* Burger Menu Button */}
              {/* <button
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#C41E3A] text-[#C41E3A] hover:bg-[#C41E3A] hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {isMegaMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>  */}

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/peakster.png"
                  alt="Peakster Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <div className="text-[#C41E3A] font-bold text-2xl tracking-tight">
                  Peakster
                </div>
              </Link>
            </div>

            {/* Right Section: Icons */}
            <div className="flex items-center gap-5">
              {/* Winter Logo */}
              <div className="relative group flex items-center justify-center w-10 h-10 text-gray-700 hover:text-[#C41E3A] transition-colors cursor-pointer">
                <Snowflake className="w-5 h-5" />
                <div className="absolute top-full mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
                  Winter
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </div>

              {/* Summer Logo */}
              <div className="relative group flex items-center justify-center w-10 h-10 text-gray-700 hover:text-[#C41E3A] transition-colors cursor-pointer">
                <Sun className="w-5 h-5" />
                <div className="absolute top-full mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
                  Summer
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </div>

              {/* Shopping Cart Icon */}
              <div className="relative">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-[#C41E3A] transition-colors"
                  aria-label="Shopping cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
                <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
              </div>

              {/* User Menu */}
              <UserMenu />

              {/* Language Selector */}
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
              />
            </div>
          </div>

          {/* Mobile/Tablet Layout - Two Rows */}
          <div className="lg:hidden py-3">
            {/* Top Row: Menu Button and Logo */}
            <div className="flex items-center justify-center gap-2 mb-3">
              {/* Burger Menu Button */}
              {/* <button
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#C41E3A] text-[#C41E3A] hover:bg-[#C41E3A] hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {isMegaMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button> */}

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/peakster.png"
                  alt="Peakster Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <div className="text-[#C41E3A] font-bold text-xl tracking-tight">
                  Peakster
                </div>
              </Link>
            </div>

            {/* Bottom Row: All Icons */}
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              {/* Winter Logo */}
              <div className="relative group flex items-center justify-center w-9 h-9 text-gray-700 hover:text-[#C41E3A] transition-colors cursor-pointer">
                <Snowflake className="w-4 h-4" />
                <div className="absolute top-full mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
                  Winter
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </div>

              {/* Summer Logo */}
              <div className="relative group flex items-center justify-center w-9 h-9 text-gray-700 hover:text-[#C41E3A] transition-colors cursor-pointer">
                <Sun className="w-4 h-4" />
                <div className="absolute top-full mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
                  Summer
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </div>

              {/* Shopping Cart Icon */}
              <div className="relative">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="flex items-center justify-center w-9 h-9 text-gray-700 hover:text-[#C41E3A] transition-colors"
                  aria-label="Shopping cart"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
                <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
              </div>

              {/* User Menu */}
              <UserMenu />

              {/* Language Selector */}
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mega Menu */}
      {/* <MegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
      /> */}
    </>
  );
};

export default Header;
