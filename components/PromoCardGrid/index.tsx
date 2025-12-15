'use client';

import React, { useRef, useState, useEffect } from 'react';
import PromoCard from '../PromoCard';
import { useLanguage } from '@/contexts/LanguageContext';

interface PromoItem {
  id: string;
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  link?: string;
}

interface PromoCardGridProps {
  items: PromoItem[];
}

const PromoCardGrid: React.FC<PromoCardGridProps> = ({ items }) => {
  const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

      // Show left arrow if not at the start
      setShowLeftArrow(scrollLeft > 0);

      // Show right arrow if not at the end (with small threshold for rounding)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      // Check initial position
      checkScrollPosition();

      // Add scroll event listener
      scrollContainer.addEventListener('scroll', checkScrollPosition);

      // Add resize event listener to recalculate on window resize
      window.addEventListener('resize', checkScrollPosition);

      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, [items]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative bg-linear-to-br from-gray-50 to-gray-100 py-12 sm:py-16 lg:py-6 mt-4 mb-10">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Navigation Buttons */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 sm:left-8"
            aria-label={t('carousel.scrollLeft')}
          >
            <svg
              className="h-6 w-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 sm:right-8"
            aria-label={t('carousel.scrollRight')}
          >
            <svg
              className="h-6 w-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide flex gap-6 overflow-x-auto scroll-smooth px-2 py-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="w-[85vw] shrink-0 sm:w-[45vw] lg:w-[30vw] xl:w-[25vw]"
            >
              <PromoCard
                imageUrl={item.imageUrl}
                imageAlt={item.imageAlt}
                title={item.title}
                description={item.description}
                link={item.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoCardGrid;

// Example usage:
// 
// const promoItems: PromoItem[] = [
//   {
//     id: '1',
//     imageUrl: '/images/skiing.jpg',
//     imageAlt: 'Family skiing in Trysil',
//     title: 'New! Spend 2 days in Trysil or Sälen',
//     description: 'Even more in a regular SkiPass of 3+ days. 2 of the days can be used in Trysil or Sälen, just 45 minutes',
//     link: 'https://www.skistar.com/sv/boende/hotel-lodge/gratis-mat-for-barn/'
//   },
//   {
//     id: '2',
//     imageUrl: '/images/restaurant.jpg',
//     imageAlt: 'Family dining at restaurant',
//     title: 'Good news for rumbling stomachs!',
//     description: 'From the 2025/26 winter season, children up to 6 years old eat free* at selected restaurants at SkiStar Lodge and hotels.',
//   }
// ];
//
// <PromoCardGrid items={promoItems} />
