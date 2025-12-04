export interface SkiPass {
  id: string;
  title: string;
  location: string;
  destination: 'are' | 'stockholm';
  type: string;
  duration: string;
  validFor: string;
  features: string[];
  price: number;
  recommended: boolean;
  description: string;
}

export const skipasses: SkiPass[] = [
  // Åre Ski Passes
  {
    id: 'are-pass-1',
    title: 'Åre Full Season Pass',
    location: 'All Åre Resorts',
    destination: 'are',
    type: 'Season Pass',
    duration: 'Full Season',
    validFor: 'Nov 2025 - Apr 2026',
    features: ['Unlimited skiing', 'All lifts access', 'Priority lanes', 'Ski storage'],
    price: 8995,
    recommended: true,
    description: 'Complete access to all Åre ski areas for the entire season. Best value for frequent skiers.',
  },
  {
    id: 'are-pass-2',
    title: 'Åre Weekly Pass',
    location: 'Åre Village',
    destination: 'are',
    type: 'Multi-Day Pass',
    duration: '7 days',
    validFor: 'Any consecutive 7 days',
    features: ['All lifts', 'Ski storage', 'Equipment discount 10%'],
    price: 2995,
    recommended: true,
    description: 'Perfect for week-long ski holidays. Includes access to all lifts and gondolas.',
  },
  {
    id: 'are-pass-3',
    title: 'Åre Weekend Pass',
    location: 'Åre Björnen',
    destination: 'are',
    type: 'Weekend Pass',
    duration: '2 days',
    validFor: 'Sat-Sun',
    features: ['Weekend lifts', 'Ski storage'],
    price: 1195,
    recommended: true,
    description: 'Weekend warrior pass for Saturday and Sunday skiing.',
  },
  {
    id: 'are-pass-4',
    title: 'Åre Day Pass',
    location: 'Åre Ski Area',
    destination: 'are',
    type: 'Single Day',
    duration: '1 day',
    validFor: 'Any single day',
    features: ['All lifts', 'Valid 9am-4pm'],
    price: 595,
    recommended: false,
    description: 'Single day access to all lifts and slopes in Åre.',
  },
  {
    id: 'are-pass-5',
    title: 'Åre Family Pass',
    location: 'Åre Family Area',
    destination: 'are',
    type: 'Family Pass',
    duration: '5 days',
    validFor: 'Valid for 2 adults + 2 children',
    features: ['Family zones', 'Beginner slopes', 'Ski school discount'],
    price: 3995,
    recommended: true,
    description: 'Special family package with access for 2 adults and up to 2 children.',
  },
  {
    id: 'are-pass-6',
    title: 'Åre Half-Day Pass',
    location: 'Åre Village',
    destination: 'are',
    type: 'Half Day',
    duration: 'Half day',
    validFor: '9am-1pm or 1pm-4pm',
    features: ['All lifts', 'Flexible timing'],
    price: 395,
    recommended: false,
    description: 'Half-day pass for morning or afternoon skiing sessions.',
  },

  // Stockholm "Activity Passes" (since Stockholm doesn't have skiing)
  {
    id: 'stockholm-pass-1',
    title: 'Stockholm Unlimited City Pass',
    location: 'All Stockholm',
    destination: 'stockholm',
    type: 'City Pass',
    duration: '7 days',
    validFor: 'Any 7 consecutive days',
    features: ['All museums', 'Public transport', 'Boat tours', 'City bike access'],
    price: 1495,
    recommended: true,
    description: 'Complete access to 60+ attractions including museums, tours, and unlimited public transport.',
  },
  {
    id: 'stockholm-pass-2',
    title: 'Stockholm Explorer Pass',
    location: 'Central Stockholm',
    destination: 'stockholm',
    type: 'Activity Pass',
    duration: '3 days',
    validFor: 'Any 3 consecutive days',
    features: ['Major museums', 'Public transport', 'Guided tour'],
    price: 895,
    recommended: true,
    description: 'Three-day pass covering major attractions and unlimited public transportation.',
  },
  {
    id: 'stockholm-pass-3',
    title: 'Stockholm Day Pass',
    location: 'Stockholm City',
    destination: 'stockholm',
    type: 'Single Day',
    duration: '1 day',
    validFor: 'Any single day',
    features: ['Select museums', 'Public transport', 'City walking tour'],
    price: 395,
    recommended: true,
    description: 'One day of exploring Stockholm with public transport and museum access.',
  },
  {
    id: 'stockholm-pass-4',
    title: 'Stockholm Museum Card',
    location: 'Museum District',
    destination: 'stockholm',
    type: 'Museum Pass',
    duration: '5 days',
    validFor: 'Valid for 5 days',
    features: ['All museums', 'Skip-the-line', 'Audio guides'],
    price: 695,
    recommended: false,
    description: 'Access to all Stockholm museums with skip-the-line privileges.',
  },
  {
    id: 'stockholm-pass-5',
    title: 'Stockholm Water Activities Pass',
    location: 'Waterfront',
    destination: 'stockholm',
    type: 'Activity Pass',
    duration: '2 days',
    validFor: 'Any 2 days',
    features: ['Boat tours', 'Kayak rental', 'Ferry access'],
    price: 595,
    recommended: true,
    description: 'Perfect for water enthusiasts. Includes boat tours and kayak rentals.',
  },
  {
    id: 'stockholm-pass-6',
    title: 'Stockholm Family Adventure Pass',
    location: 'All Stockholm',
    destination: 'stockholm',
    type: 'Family Pass',
    duration: '4 days',
    validFor: 'Valid for 2 adults + 3 children',
    features: ['Family attractions', 'Zoo access', 'Theme park', 'Public transport'],
    price: 1795,
    recommended: true,
    description: 'Family-friendly pass with access to zoos, theme parks, and kid-friendly museums.',
  },
];

export const getSkiPassesByDestination = (destination: string): SkiPass[] => {
  const normalizedDestination = destination.toLowerCase();

  if (normalizedDestination.includes('åre') || normalizedDestination.includes('are')) {
    return skipasses.filter(pass => pass.destination === 'are');
  }

  if (normalizedDestination.includes('stockholm')) {
    return skipasses.filter(pass => pass.destination === 'stockholm');
  }

  return skipasses;
};
