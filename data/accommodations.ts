export interface Accommodation {
  id: string;
  name: string;
  location: string;
  area: string;
  destination: 'are' | 'stockholm';
  images: string[];
  vacancies: number;
  description: string;
  propertyType: string;
  beds: string;
  distance: string;
  rating?: number;
  amenities: string[];
  price: number;
}

export const accommodations: Accommodation[] = [
  // Åre Accommodations
  {
    id: 'are-1',
    name: 'Brown Hill',
    location: 'Åre Village',
    area: 'Åre',
    destination: 'are',
    images: [
      '/accomodation-brown-hill.jpg',
      '/accomodation-brown-hill1.jpg',
      '/accomodation-brown-hill2.jpg',
    ],
    vacancies: 2,
    description:
      'This apartment accommodation is within walking distance of the ski slopes and the village square. The apartments are suitable for both larger groups and families and are located close to the SkiStarshop, grocery store, bakery, restaurant and popular nightclub in the middle of the area.',
    propertyType: 'Apartment',
    beds: '4-8 beds',
    distance: '470-490 m slope/lift',
    rating: 4,
    amenities: ['Good choice for air travelers', 'Good choice for train travelers', 'Mobile key'],
    price: 1695,
  },
  {
    id: 'are-2',
    name: 'Högåsstigen',
    location: 'Bear',
    area: 'Åre',
    destination: 'are',
    images: [
      '/accomodation-brown-hill.jpg',
      '/accomodation-brown-hill1.jpg',
    ],
    vacancies: 1,
    description:
      'Högåsstigen is located in Västra Björnen, an area with the best location in the mountains. Optimal conditions for skiing and accommodation in the middle of the ski system. Fantastic views of the top of Åreskutan to the west and Renfjället and Lake Åresjön to the south.',
    propertyType: 'Apartment',
    beds: '4-6 beds',
    distance: '0-50 m slope/lift',
    rating: 4,
    amenities: ['Ski in/ski out', 'Good choice for train travelers', 'Mountain views'],
    price: 2195,
  },
  {
    id: 'are-3',
    name: 'Tott Mountain Lodge',
    location: 'Tott Village',
    area: 'Åre',
    destination: 'are',
    images: [
      '/accomodation-brown-hill.jpg',
      '/accomodation-brown-hill1.jpg',
      '/accomodation-brown-hill2.jpg',
    ],
    vacancies: 3,
    description:
      'Luxurious mountain lodge with panoramic views of the Åre valley. Features a private sauna, fireplace, and fully equipped kitchen. Perfect for families looking for a premium mountain experience with easy access to the slopes.',
    propertyType: 'Lodge',
    beds: '6-10 beds',
    distance: '200-250 m slope/lift',
    rating: 5,
    amenities: ['Ski in/ski out', 'Good choice for air travelers', 'Mountain views', 'Sauna'],
    price: 3495,
  },
  {
    id: 'are-4',
    name: 'Fjällby Apartments',
    location: 'Åre Björnen',
    area: 'Åre',
    destination: 'are',
    images: [
      '/accomodation-brown-hill.jpg',
      '/accomodation-brown-hill1.jpg',
    ],
    vacancies: 4,
    description:
      'Cozy apartments located in the heart of Åre Björnen. Walking distance to restaurants, shops, and ski lifts. Modern amenities with traditional Swedish charm. Ideal for couples and small families.',
    propertyType: 'Apartment',
    beds: '2-4 beds',
    distance: '300-350 m slope/lift',
    rating: 4,
    amenities: ['Good choice for train travelers', 'Mobile key', 'Ski storage'],
    price: 1295,
  },
  {
    id: 'are-5',
    name: 'Åreskutan View Chalets',
    location: 'Duved',
    area: 'Åre',
    destination: 'are',
    images: [
      '/accomodation-brown-hill.jpg',
      '/accomodation-brown-hill1.jpg',
      '/accomodation-brown-hill2.jpg',
    ],
    vacancies: 2,
    description:
      'Stunning chalets with direct views of Åreskutan mountain. Each chalet features modern Scandinavian design, private balcony, and premium facilities. Perfect for those seeking tranquility and natural beauty.',
    propertyType: 'Chalet',
    beds: '4-6 beds',
    distance: '100-150 m slope/lift',
    rating: 5,
    amenities: ['Ski in/ski out', 'Mountain views', 'Sauna', 'Fireplace'],
    price: 2895,
  },

  // Stockholm Accommodations
  {
    id: 'stockholm-1',
    name: 'Gamla Stan Heritage Hotel',
    location: 'Old Town',
    area: 'Stockholm',
    destination: 'stockholm',
    images: [
      '/accomodation-brown-hill.jpg',
      '/accomodation-brown-hill1.jpg',
      '/accomodation-brown-hill2.jpg',
    ],
    vacancies: 5,
    description:
      'Historic boutique hotel in the heart of Gamla Stan. Experience authentic Stockholm charm with cobblestone streets at your doorstep. Walking distance to Royal Palace, museums, and waterfront restaurants.',
    propertyType: 'Hotel',
    beds: '2-4 beds',
    distance: 'City Center',
    rating: 5,
    amenities: ['Good choice for air travelers', 'Good choice for train travelers', 'City views'],
    price: 1895,
  },
  {
    id: 'stockholm-2',
    name: 'Södermalm Loft Apartments',
    location: 'Södermalm',
    area: 'Stockholm',
    destination: 'stockholm',
    images: [
      '/accomodation-brown-hill.jpg',
      '/accomodation-brown-hill1.jpg',
    ],
    vacancies: 3,
    description:
      'Modern loft apartments in trendy Södermalm district. Featuring industrial-chic design, fully equipped kitchens, and rooftop terrace. Close to hip cafes, vintage shops, and vibrant nightlife.',
    propertyType: 'Apartment',
    beds: '2-6 beds',
    distance: 'City Center',
    rating: 4,
    amenities: ['Good choice for train travelers', 'Mobile key', 'City views'],
    price: 1595,
  },
  {
    id: 'stockholm-3',
    name: 'Waterfront Luxury Suites',
    location: 'Djurgården',
    area: 'Stockholm',
    destination: 'stockholm',
    images: [
      '/accomodation-brown-hill.jpg',
      '/accomodation-brown-hill1.jpg',
      '/accomodation-brown-hill2.jpg',
    ],
    vacancies: 2,
    description:
      'Exclusive waterfront suites on the beautiful island of Djurgården. Floor-to-ceiling windows with stunning water views. Walking distance to Vasa Museum, Skansen, and scenic nature trails.',
    propertyType: 'Suite',
    beds: '2-4 beds',
    distance: 'Djurgården',
    rating: 5,
    amenities: ['Waterfront views', 'Good choice for air travelers', 'Premium amenities'],
    price: 2695,
  },
  {
    id: 'stockholm-4',
    name: 'Östermalm Grand Residences',
    location: 'Östermalm',
    area: 'Stockholm',
    destination: 'stockholm',
    images: [
      '/accomodation-brown-hill.jpg',
      '/accomodation-brown-hill1.jpg',
    ],
    vacancies: 4,
    description:
      'Elegant residences in upscale Östermalm neighborhood. Classic Swedish architecture meets modern luxury. Near Stureplan, exclusive shopping, and fine dining restaurants.',
    propertyType: 'Apartment',
    beds: '4-8 beds',
    distance: 'City Center',
    rating: 5,
    amenities: ['Good choice for air travelers', 'City views', 'Premium amenities'],
    price: 2295,
  },
  {
    id: 'stockholm-5',
    name: 'Kungsholmen Family Apartments',
    location: 'Kungsholmen',
    area: 'Stockholm',
    destination: 'stockholm',
    images: [
      '/accomodation-brown-hill.jpg',
      '/accomodation-brown-hill1.jpg',
      '/accomodation-brown-hill2.jpg',
    ],
    vacancies: 6,
    description:
      'Spacious family-friendly apartments on Kungsholmen island. Modern amenities with a cozy atmosphere. Close to parks, waterfront promenades, and Stockholm City Hall.',
    propertyType: 'Apartment',
    beds: '4-6 beds',
    distance: 'Kungsholmen',
    rating: 4,
    amenities: ['Good choice for train travelers', 'Mobile key', 'Family-friendly'],
    price: 1495,
  },
  {
    id: 'stockholm-6',
    name: 'Vasastan Urban Studios',
    location: 'Vasastan',
    area: 'Stockholm',
    destination: 'stockholm',
    images: [
      '/accomodation-brown-hill.jpg',
      '/accomodation-brown-hill1.jpg',
    ],
    vacancies: 8,
    description:
      'Contemporary urban studios in central Vasastan. Perfect for couples or solo travelers. Walking distance to Odenplan metro station, parks, and local eateries. Minimalist Scandinavian design.',
    propertyType: 'Studio',
    beds: '1-2 beds',
    distance: 'City Center',
    rating: 4,
    amenities: ['Good choice for train travelers', 'Mobile key', 'Budget-friendly'],
    price: 995,
  },
];

export const getAccommodationsByDestination = (destination: string): Accommodation[] => {
  const normalizedDestination = destination.toLowerCase();

  if (normalizedDestination.includes('åre') || normalizedDestination.includes('are')) {
    return accommodations.filter(acc => acc.destination === 'are');
  }

  if (normalizedDestination.includes('stockholm')) {
    return accommodations.filter(acc => acc.destination === 'stockholm');
  }

  return accommodations;
};
