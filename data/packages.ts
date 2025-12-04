export interface Package {
  id: string;
  title: string;
  location: string;
  destination: 'are' | 'stockholm';
  images: string[];
  days: number;
  dates?: string;
  propertyType: string;
  includes: string;
  recommended: boolean;
  price: number;
  multipleArrivalDates?: boolean;
  description: string;
}

export const packages: Package[] = [
  // Åre Packages
  {
    id: 'are-pkg-1',
    title: 'Åre Ski Week Adventure',
    location: 'Åre Village',
    destination: 'are',
    images: ['/package-are-1.jpg', '/package-are-2.jpg'],
    days: 7,
    propertyType: 'Apartment',
    includes: 'incl. SkiPass + Ski rental',
    recommended: true,
    price: 5995,
    multipleArrivalDates: true,
    description: 'Complete week package in Åre with accommodation, ski pass, and equipment rental. Perfect for families.',
  },
  {
    id: 'are-pkg-2',
    title: 'Weekend Escape to Åre',
    location: 'Åre Björnen',
    destination: 'are',
    images: ['/package-are-3.jpg', '/package-are-4.jpg'],
    days: 3,
    dates: 'Feb. 14 - Feb. 17',
    propertyType: 'Lodge',
    includes: 'incl. SkiPass + Breakfast',
    recommended: true,
    price: 2995,
    description: 'Romantic weekend getaway with ski pass and breakfast included. Stay in a cozy mountain lodge.',
  },
  {
    id: 'are-pkg-3',
    title: 'Åre Family Winter Holiday',
    location: 'Duved',
    destination: 'are',
    images: ['/package-are-5.jpg', '/package-are-6.jpg'],
    days: 5,
    propertyType: 'Chalet',
    includes: 'incl. SkiPass + Ski school',
    recommended: true,
    price: 7995,
    multipleArrivalDates: true,
    description: 'Family package with ski lessons for children, ski passes, and spacious chalet accommodation.',
  },
  {
    id: 'are-pkg-4',
    title: 'Åre Extended Stay',
    location: 'Tott',
    destination: 'are',
    images: ['/package-are-7.jpg', '/package-are-8.jpg'],
    days: 10,
    propertyType: 'Apartment',
    includes: 'incl. SkiPass + Parking',
    recommended: false,
    price: 8995,
    multipleArrivalDates: true,
    description: 'Extended ski holiday with full amenities. Perfect for those wanting an extended mountain stay.',
  },
  {
    id: 'are-pkg-5',
    title: 'Åre Ski & Spa Package',
    location: 'Åre Village',
    destination: 'are',
    images: ['/package-are-9.jpg', '/package-are-10.jpg'],
    days: 4,
    propertyType: 'Hotel',
    includes: 'incl. SkiPass + Spa access',
    recommended: true,
    price: 4595,
    description: 'Relaxing package combining skiing with spa treatments. Includes daily spa access.',
  },

  // Stockholm Packages
  {
    id: 'stockholm-pkg-1',
    title: 'Stockholm City Explorer',
    location: 'Gamla Stan',
    destination: 'stockholm',
    images: ['/package-stockholm-1.jpg', '/package-stockholm-2.jpg'],
    days: 3,
    propertyType: 'Hotel',
    includes: 'incl. City Pass + Breakfast',
    recommended: true,
    price: 2795,
    multipleArrivalDates: true,
    description: 'Explore Stockholm with included city pass for all major attractions and museums.',
  },
  {
    id: 'stockholm-pkg-2',
    title: 'Stockholm Weekend Getaway',
    location: 'Södermalm',
    destination: 'stockholm',
    images: ['/package-stockholm-3.jpg', '/package-stockholm-4.jpg'],
    days: 2,
    dates: 'Mar. 8 - Mar. 10',
    propertyType: 'Apartment',
    includes: 'incl. Welcome dinner',
    recommended: true,
    price: 1995,
    description: 'Quick weekend escape to trendy Södermalm with welcome dinner at a local restaurant.',
  },
  {
    id: 'stockholm-pkg-3',
    title: 'Stockholm Cultural Week',
    location: 'Östermalm',
    destination: 'stockholm',
    images: ['/package-stockholm-5.jpg', '/package-stockholm-6.jpg'],
    days: 7,
    propertyType: 'Suite',
    includes: 'incl. Museum passes + Guided tours',
    recommended: true,
    price: 5995,
    multipleArrivalDates: true,
    description: 'Immersive cultural experience with museum passes and guided city tours.',
  },
  {
    id: 'stockholm-pkg-4',
    title: 'Stockholm Waterfront Experience',
    location: 'Djurgården',
    destination: 'stockholm',
    images: ['/package-stockholm-7.jpg', '/package-stockholm-8.jpg'],
    days: 4,
    propertyType: 'Waterfront Suite',
    includes: 'incl. Boat tour + Breakfast',
    recommended: true,
    price: 3895,
    description: 'Waterfront stay with archipelago boat tour and daily breakfast included.',
  },
  {
    id: 'stockholm-pkg-5',
    title: 'Stockholm Business & Leisure',
    location: 'Kungsholmen',
    destination: 'stockholm',
    images: ['/package-stockholm-9.jpg', '/package-stockholm-10.jpg'],
    days: 5,
    propertyType: 'Business Suite',
    includes: 'incl. Co-working access + WiFi',
    recommended: false,
    price: 4295,
    multipleArrivalDates: true,
    description: 'Perfect for digital nomads. Includes co-working space access and high-speed internet.',
  },
  {
    id: 'stockholm-pkg-6',
    title: 'Stockholm Family Fun',
    location: 'Vasastan',
    destination: 'stockholm',
    images: ['/package-stockholm-11.jpg', '/package-stockholm-12.jpg'],
    days: 4,
    propertyType: 'Family Apartment',
    includes: 'incl. Zoo passes + Kid activities',
    recommended: true,
    price: 3495,
    description: 'Family-friendly package with passes to Skansen Zoo and children activities.',
  },
];

export const getPackagesByDestination = (destination: string): Package[] => {
  const normalizedDestination = destination.toLowerCase();

  if (normalizedDestination.includes('åre') || normalizedDestination.includes('are')) {
    return packages.filter(pkg => pkg.destination === 'are');
  }

  if (normalizedDestination.includes('stockholm')) {
    return packages.filter(pkg => pkg.destination === 'stockholm');
  }

  return packages;
};
