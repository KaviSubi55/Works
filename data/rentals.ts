export interface Rental {
  id: string;
  title: string;
  location: string;
  destination: 'are' | 'stockholm';
  category: string;
  type: string;
  duration: string;
  features: string[];
  price: number;
  priceUnit: string;
  recommended: boolean;
  description: string;
  images: string[];
}

export const rentals: Rental[] = [
  // Åre Rentals (Ski Equipment)
  {
    id: 'are-rent-1',
    title: 'Premium Ski Package',
    location: 'Åre Village Center',
    destination: 'are',
    category: 'Ski Equipment',
    type: 'Complete Set',
    duration: 'Per day',
    features: ['Top brand skis', 'Boots', 'Poles', 'Helmet', 'Free adjustment'],
    price: 495,
    priceUnit: 'SEK/day',
    recommended: true,
    description: 'Premium ski equipment from leading brands. Includes skis, boots, poles, and safety helmet.',
    images: ['/rent-ski.jpg', '/rent-ski-2.jpg', '/rent-ski-3.jpg'],
  },
  {
    id: 'are-rent-2',
    title: 'Standard Ski Package',
    location: 'Åre Ski Shop',
    destination: 'are',
    category: 'Ski Equipment',
    type: 'Complete Set',
    duration: 'Per day',
    features: ['Quality skis', 'Boots', 'Poles', 'Free storage'],
    price: 295,
    priceUnit: 'SEK/day',
    recommended: true,
    description: 'Quality standard ski equipment suitable for all skill levels.',
    images: ['/rental-ski-standard.jpg', '/rental-ski-standard-2.jpg', '/rental-ski-standard-3.jpg'],
  },
  {
    id: 'are-rent-3',
    title: 'Snowboard Package',
    location: 'Åre Björnen',
    destination: 'are',
    category: 'Snowboard Equipment',
    type: 'Complete Set',
    duration: 'Per day',
    features: ['Snowboard', 'Boots', 'Helmet', 'Wrist guards'],
    price: 395,
    priceUnit: 'SEK/day',
    recommended: true,
    description: 'Complete snowboard package with safety equipment included.',
    images: ['/rental-snowboard.jpg', '/rental-snowboard-2.jpg', '/rental-snowboard-3.jpg'],
  },
  {
    id: 'are-rent-4',
    title: 'Kids Ski Package',
    location: 'Åre Family Center',
    destination: 'are',
    category: 'Kids Equipment',
    type: 'Complete Set',
    duration: 'Per day',
    features: ['Junior skis', 'Boots', 'Poles', 'Helmet', 'Size adjustment'],
    price: 195,
    priceUnit: 'SEK/day',
    recommended: true,
    description: 'Child-sized ski equipment with free size adjustments as they grow.',
    images: ['/rental-kids-ski.jpg', '/rental-kids-ski-2.jpg', '/rental-kids-ski-3.jpg'],
  },
  {
    id: 'are-rent-5',
    title: 'Ski & Snowboard Helmet',
    location: 'Åre Rental Points',
    destination: 'are',
    category: 'Safety Equipment',
    type: 'Individual Item',
    duration: 'Per day',
    features: ['Adjustable fit', 'Safety certified', 'Multiple sizes'],
    price: 95,
    priceUnit: 'SEK/day',
    recommended: false,
    description: 'Safety helmet available in all sizes, certified for skiing and snowboarding.',
    images: ['/rental-helmet.jpg', '/rental-helmet-2.jpg', '/rental-helmet-3.jpg'],
  },
  {
    id: 'are-rent-6',
    title: 'Cross-Country Ski Set',
    location: 'Åre Village',
    destination: 'are',
    category: 'Cross-Country',
    type: 'Complete Set',
    duration: 'Per day',
    features: ['Cross-country skis', 'Boots', 'Poles', 'Trail map'],
    price: 245,
    priceUnit: 'SEK/day',
    recommended: false,
    description: 'Cross-country skiing equipment with access to groomed trails.',
    images: ['/rental-cross-country.jpg', '/rental-cross-country-2.jpg', '/rental-cross-country-3.jpg'],
  },

  // Stockholm Rentals (Bikes, Boats, etc.)
  {
    id: 'stockholm-rent-1',
    title: 'Premium City Bike',
    location: 'Central Stockholm',
    destination: 'stockholm',
    category: 'Bicycle',
    type: 'Premium Bike',
    duration: 'Per day',
    features: ['Geared bike', 'Lock', 'Helmet', 'City map', 'Basket'],
    price: 295,
    priceUnit: 'SEK/day',
    recommended: true,
    description: 'Premium city bike perfect for exploring Stockholm. Includes helmet and lock.',
    images: ['/rental-bike-premium.jpg', '/rental-bike-premium-2.jpg', '/rental-bike-premium-3.jpg'],
  },
  {
    id: 'stockholm-rent-2',
    title: 'Standard City Bike',
    location: 'Multiple Locations',
    destination: 'stockholm',
    category: 'Bicycle',
    type: 'Standard Bike',
    duration: 'Per day',
    features: ['City bike', 'Lock', 'Helmet', 'Basket'],
    price: 195,
    priceUnit: 'SEK/day',
    recommended: true,
    description: 'Comfortable city bike for touring Stockholm at your own pace.',
    images: ['/rental-bike-standard.jpg', '/rental-bike-standard-2.jpg', '/rental-bike-standard-3.jpg'],
  },
  {
    id: 'stockholm-rent-3',
    title: 'Electric Bike',
    location: 'Södermalm',
    destination: 'stockholm',
    category: 'E-Bicycle',
    type: 'Electric Bike',
    duration: 'Per day',
    features: ['E-bike', 'Battery', 'Charger', 'Lock', 'Helmet'],
    price: 495,
    priceUnit: 'SEK/day',
    recommended: true,
    description: 'Electric bike for effortless city exploration. Full-day battery life.',
    images: ['/rental-ebike.jpg', '/rental-ebike-2.jpg', '/rental-ebike-3.jpg'],
  },
  {
    id: 'stockholm-rent-4',
    title: 'Kayak Single',
    location: 'Djurgården',
    destination: 'stockholm',
    category: 'Water Sports',
    type: 'Single Kayak',
    duration: 'Per hour',
    features: ['Kayak', 'Paddle', 'Life vest', 'Waterproof bag'],
    price: 195,
    priceUnit: 'SEK/hour',
    recommended: true,
    description: 'Single kayak rental for exploring Stockholm waterways.',
    images: ['/rental-kayak-single.jpg', '/rental-kayak-single-2.jpg', '/rental-kayak-single-3.jpg'],
  },
  {
    id: 'stockholm-rent-5',
    title: 'Kayak Double',
    location: 'Waterfront',
    destination: 'stockholm',
    category: 'Water Sports',
    type: 'Double Kayak',
    duration: 'Per hour',
    features: ['Tandem kayak', '2 paddles', '2 life vests', 'Waterproof bag'],
    price: 295,
    priceUnit: 'SEK/hour',
    recommended: true,
    description: 'Double kayak perfect for couples or friends to explore together.',
    images: ['/rental-kayak-double.jpg', '/rental-kayak-double-2.jpg', '/rental-kayak-double-3.jpg'],
  },
  {
    id: 'stockholm-rent-6',
    title: 'Boat Rental (Small)',
    location: 'Marina',
    destination: 'stockholm',
    category: 'Boat',
    type: 'Small Motor Boat',
    duration: 'Per day',
    features: ['4-person boat', 'Motor', 'Life vests', 'GPS', 'Fuel included'],
    price: 1495,
    priceUnit: 'SEK/day',
    recommended: false,
    description: 'Small motorboat for island hopping in the Stockholm archipelago.',
    images: ['/rental-boat-small.jpg', '/rental-boat-small-2.jpg', '/rental-boat-small-3.jpg'],
  },
  {
    id: 'stockholm-rent-7',
    title: 'Scooter Rental',
    location: 'City Center',
    destination: 'stockholm',
    category: 'Scooter',
    type: 'Electric Scooter',
    duration: 'Per day',
    features: ['E-scooter', 'Helmet', 'Lock', 'City map'],
    price: 245,
    priceUnit: 'SEK/day',
    recommended: true,
    description: 'Electric scooter for quick and fun city transportation.',
    images: ['/rental-scooter.jpg', '/rental-scooter-2.jpg', '/rental-scooter-3.jpg'],
  },
];

export const getRentalsByDestination = (destination: string): Rental[] => {
  const normalizedDestination = destination.toLowerCase();

  if (normalizedDestination.includes('åre') || normalizedDestination.includes('are')) {
    return rentals.filter(rental => rental.destination === 'are');
  }

  if (normalizedDestination.includes('stockholm')) {
    return rentals.filter(rental => rental.destination === 'stockholm');
  }

  return rentals;
};
