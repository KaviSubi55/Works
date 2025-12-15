// 'use client';

// import React, { useState } from 'react';
// import { Home, Tag, Ticket, Key, Menu, X } from 'lucide-react';
// import AccommodationSearch from '../AccomodationSearch';
// import PackageSearch from '../PackageSearch';
// import SkiPassSearch from '../SkiPassSearch';
// import RentSearch from '../RentSearch';

// type TabType = 'home' | 'accommodation' | 'package' | 'skipass' | 'rent';

// interface Tab {
//   id: TabType;
//   label: string;
//   icon: React.ReactNode;
// }

// const tabs: Tab[] = [
//   { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
//   { id: 'accommodation', label: 'Accommodation', icon: <Home className="w-5 h-5" /> },
//   { id: 'package', label: 'Package', icon: <Tag className="w-5 h-5" /> },
//   { id: 'skipass', label: 'Ski Pass', icon: <Ticket className="w-5 h-5" /> },
//   { id: 'rent', label: 'Rent', icon: <Key className="w-5 h-5" /> },
// ];

// const SecondaryNav: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<TabType>('home');
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleTabClick = (tabId: TabType) => {
//     setActiveTab(tabId);
//     setIsMobileMenuOpen(false); // Close mobile menu when tab is selected
//   };

//   return (
//     <div className="bg-gray-100">
//       {/* Desktop Navigation Tabs - Hidden on mobile/tablet */}
//       <div className="hidden lg:block bg-white">
//         <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
//           <nav className="flex items-center justify-between overflow-x-auto scrollbar-hide">
//             {tabs.map((tab) => {
//               const isActive = tab.id === activeTab;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => handleTabClick(tab.id)}
//                   className={`flex items-center gap-2 py-4 px-2 font-medium whitespace-nowrap transition-colors relative group ${
//                     isActive ? 'text-[#C41E3A]' : 'text-gray-600 hover:text-[#C41E3A]'
//                   }`}
//                 >
//                   <span className={`transition-colors ${isActive ? 'text-[#C41E3A]' : 'text-gray-400 group-hover:text-[#C41E3A]'}`}>
//                     {tab.icon}
//                   </span>
//                   {tab.label}
//                   {/* Active/Hover underline */}
//                   <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#C41E3A] transform transition-transform duration-300 ease-out origin-center ${
//                     isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
//                   }`}></span>
//                 </button>
//               );
//             })}
//           </nav>
//         </div>
//       </div>

//       {/* Mobile/Tablet Hamburger Navigation */}
//       <div className="lg:hidden bg-white relative z-50">
//         <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
//           {!isMobileMenuOpen && (
//             <div className="flex items-center justify-center py-3">
//               {/* Hamburger Button - Centered */}
//               <button
//                 onClick={() => setIsMobileMenuOpen(true)}
//                 className="text-[#C41E3A] hover:opacity-80 transition-opacity"
//                 aria-label="Open navigation menu"
//               >
//                 <Menu className="w-6 h-6" />
//               </button>
//             </div>
//           )}

//           {/* Overlay - starts below the navigation section */}
//           {isMobileMenuOpen && (
//             <div
//               className="fixed left-0 right-0 top-[140px] bottom-0 bg-black bg-opacity-50 z-40"
//               onClick={() => setIsMobileMenuOpen(false)}
//             />
//           )}

//           {/* Full Screen Menu - slides in from left */}
//           <div
//             className={`fixed left-0 top-[140px] bottom-0 w-full bg-white z-50 overflow-y-auto transition-transform duration-700 ease-in-out ${
//               isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
//             }`}
//           >
//             <nav className="py-4">
//               {/* Close Button inside nav */}
//               <div className="flex items-center justify-center pb-6 mb-2">
//                 <button
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="text-[#C41E3A] hover:opacity-80 transition-opacity"
//                   aria-label="Close navigation menu"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>

//               {/* Navigation Links */}
//               {tabs.map((tab) => {
//                 const isActive = tab.id === activeTab;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => handleTabClick(tab.id)}
//                     className={`w-full flex items-center gap-3 px-6 py-4 font-medium transition-colors relative group ${
//                       isActive
//                         ? 'text-[#C41E3A]'
//                         : 'text-gray-600 hover:text-[#C41E3A]'
//                     }`}
//                   >
//                     <span className={`transition-colors ${isActive ? 'text-[#C41E3A]' : 'text-gray-400 group-hover:text-[#C41E3A]'}`}>
//                       {tab.icon}
//                     </span>
//                     {tab.label}
//                     {/* Active/Hover underline */}
//                     <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#C41E3A] transform transition-transform duration-300 ease-out origin-center ${
//                       isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
//                     }`}></span>
//                   </button>
//                 );
//               })}
//             </nav>
//           </div>
//         </div>
//       </div>

//       {/* Tab Content - Render search component based on active tab */}
//       {activeTab === 'accommodation' && <AccommodationSearch />}
//       {activeTab === 'package' && <PackageSearch />}
//       {activeTab === 'skipass' && <SkiPassSearch />}
//       {activeTab === 'rent' && <RentSearch />}
//       {/* Home tab shows no search component */}
//     </div>
//   );
// };

// export default SecondaryNav;



'use client';

import React, { useState } from 'react';
import { Home, Tag, Ticket, Key, Menu, X } from 'lucide-react';
import AccommodationSearch from '../AccomodationSearch';
import PackageSearch from '../PackageSearch';
import SkiPassSearch from '../SkiPassSearch';
import RentSearch from '../RentSearch';

type TabType = 'home' | 'accommodation' | 'package' | 'skipass' | 'rent';

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
];

const SecondaryNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-white">
      {/* Desktop Navigation */}
      <div className="hidden lg:block bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 font-medium whitespace-nowrap transition-colors relative group ${
                    isActive ? 'text-[#C41E3A]' : 'text-gray-600 hover:text-[#C41E3A]'
                  }`}
                >
                  <span className={`transition-colors ${isActive ? 'text-[#C41E3A]' : 'text-gray-400 group-hover:text-[#C41E3A]'}`}>
                    {tab.icon}
                  </span>
                  {tab.label}
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C41E3A] transform transition-transform duration-300 ease-out origin-center scale-x-0 group-hover:scale-x-100"></span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden bg-white relative z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          {!isMobileMenuOpen && (
            <div className="flex items-center justify-center py-3">
              {/* Menu Button - Centered */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-[#C41E3A] hover:opacity-80 transition-opacity"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          )}

          {isMobileMenuOpen && (
            <div
              className="fixed left-0 right-0 top-[140px] bottom-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          <div
            className={`fixed left-0 top-[140px] bottom-0 w-full bg-white z-50 overflow-y-auto transition-transform duration-700 ease-in-out ${
              isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <nav className="py-4">
              <div className="flex items-center justify-center pb-6 mb-2">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#C41E3A] hover:opacity-80 transition-opacity"
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {tabs.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`w-full flex items-center gap-3 px-6 py-4 font-medium transition-colors relative group ${
                      isActive ? 'text-[#C41E3A]' : 'text-gray-600 hover:text-[#C41E3A]'
                    }`}
                  >
                    <span className={`transition-colors ${isActive ? 'text-[#C41E3A]' : 'text-gray-400 group-hover:text-[#C41E3A]'}`}>
                      {tab.icon}
                    </span>
                    {tab.label}

                    {/* Hover underline only */}
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C41E3A] transform transition-transform duration-300 ease-out origin-center scale-x-0 group-hover:scale-x-100"></span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'accommodation' && <AccommodationSearch />}
      {activeTab === 'package' && <PackageSearch />}
      {activeTab === 'skipass' && <SkiPassSearch />}
      {activeTab === 'rent' && <RentSearch />}
    </div>
  );
};

export default SecondaryNav;
