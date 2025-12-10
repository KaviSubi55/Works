import React from 'react';
import PromoCard from '../PromoCard';

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
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {items.map((item) => (
            <PromoCard
              key={item.id}
              imageUrl={item.imageUrl}
              imageAlt={item.imageAlt}
              title={item.title}
              description={item.description}
              link={item.link}
            />
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
