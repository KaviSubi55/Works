'use client';

import React, { useState } from 'react';
import { Home, Tag, Ticket, Key, Shield, Menu, X } from 'lucide-react';
import AccommodationSearch from '../AccomodationSearch';
import PackageSearch from '../PackageSearch';
import SkiPassSearch from '../SkiPassSearch';
import RentSearch from '../RentSearch';
import SkiSchoolSearch from '../SkiSchoolSearch';

type TabType = 'home' | 'accommodation' | 'package' | 'skipass' | 'rent' | 'skischool';

interface Tab {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
  { id: 'accommodation', label: 'Accommodation', icon: <Home className="w-5 h-5" /> },
  { id: 'package', label: 'Package', icon: <Tag className="w-5 h-5" /> },
  { id: 'skipass', label: 'Ski Pass', icon: <Ticket className="w-5 h-5" /> },
  { id: 'rent', label: 'Rent', icon: <Key className="w-5 h-5" /> },
  { id: 'skischool', label: 'Ski school', icon: <Shield className="w-5 h-5" /> },
];

const SecondaryNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false); // Close mobile menu when tab is selected
  };

  return (
    <div className="bg-gray-100">
      {/* Desktop Navigation Tabs - Hidden on mobile/tablet */}
      <div className="hidden lg:block bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 font-medium whitespace-nowrap transition-colors relative group ${
                    isActive ? 'text-[#C41E3A]' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className={isActive ? 'text-[#C41E3A]' : 'text-gray-400'}>
                    {tab.icon}
                  </span>
                  {tab.label}
                  {/* Hover underline animation from center to both sides */}
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C41E3A] transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 origin-center"></span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile/Tablet Hamburger Navigation */}
      <div className="lg:hidden bg-white relative z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center py-3">
            {/* Hamburger Button - Centered */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                isMobileMenuOpen
                  ? 'bg-[#C41E3A] text-white border-[#C41E3A]'
                  : 'border-[#C41E3A] text-[#C41E3A] hover:bg-[#C41E3A] hover:text-white'
              }`}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown - Full Screen Height */}
          {isMobileMenuOpen && (
            <>
              {/* Overlay - starts below the hamburger button */}
              <div
                className="fixed left-0 right-0 top-[60px] bottom-0 bg-black bg-opacity-50 z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Full Screen Menu */}
              <div className="fixed left-0 right-0 top-[60px] bottom-0 bg-white z-50 overflow-y-auto">
                <nav className="py-4">
                  {tabs.map((tab) => {
                    const isActive = tab.id === activeTab;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`w-full flex items-center gap-3 px-6 py-4 font-medium transition-colors relative group ${
                          isActive
                            ? 'text-[#C41E3A]'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <span className={isActive ? 'text-[#C41E3A]' : 'text-gray-400'}>
                          {tab.icon}
                        </span>
                        {tab.label}
                        {/* Hover underline animation from center to both sides */}
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C41E3A] transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 origin-center"></span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tab Content - Render search component based on active tab */}
      {activeTab === 'accommodation' && <AccommodationSearch />}
      {activeTab === 'package' && <PackageSearch />}
      {activeTab === 'skipass' && <SkiPassSearch />}
      {activeTab === 'rent' && <RentSearch />}
      {activeTab === 'skischool' && <SkiSchoolSearch />}
      {/* Home tab shows no search component */}
    </div>
  );
};

export default SecondaryNav;
