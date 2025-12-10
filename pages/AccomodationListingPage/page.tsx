// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { Home } from 'lucide-react';
// import SearchSummaryBar from '@/components/Searchsummarybar';
// import DurationTabs from '@/components/DurationTabs';
// import FilterBar from '@/components/FilterBar';
// import InfoBanner from '@/components/InfoBanner';
// import PropertyCard from '@/components/PropertyCard';
// import { getAccommodationsByDestination, Accommodation } from '@/data/accommodations';

// export default function AccommodationListingPage() {
//   const searchParams = useSearchParams();
//   const [properties, setProperties] = useState<Accommodation[]>([]);
//   const [destination, setDestination] = useState('');
//   const [date, setDate] = useState('');
//   const [guests, setGuests] = useState('');

//   useEffect(() => {
//     // Get query parameters
//     const destinationParam = searchParams.get('destination') || 'Åre';
//     const dateParam = searchParams.get('date') || 'Select date';
//     const guestsParam = searchParams.get('guests') || 'Add guests';

//     setDestination(destinationParam);
//     setDate(dateParam);
//     setGuests(guestsParam);

//     // Filter properties based on destination
//     const filteredProperties = getAccommodationsByDestination(destinationParam);
//     setProperties(filteredProperties);
//   }, [searchParams]);
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Page Header */}
//       <div className="bg-white border-b border-gray-200">
          

//         {/* Section Title */}
//         <h2 className="text-3xl font-bold text-gray-900 mb-6">
//           Accommodations in {destination || 'selected destination'}
//         </h2>

//         {/* Property Listings */}
//         {properties.length > 0 ? (
//           <div className="space-y-6">
//             {properties.map((property) => (
//               <PropertyCard key={property.id} {...property} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-xl text-gray-600">No accommodations found for the selected destination.</p>
//           </div>
//         )}

//         {/* Load More */}
//         <div className="mt-8 text-center">
//           <button className="px-8 py-3 border-2 border-gray-300 rounded-full font-medium text-gray-900 hover:bg-gray-50 transition-colors">
//             Load more properties
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyCard from '@/components/PropertyCard';
import { getAccommodationsByDestination, Accommodation } from '@/data/accommodations';

export default function AccommodationListingPage() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Accommodation[]>([]);
  const [destination, setDestination] = useState('Åre');
  const [date, setDate] = useState('Select date');
  const [guests, setGuests] = useState('Add guests');

  useEffect(() => {
    if (!searchParams) return; // <-- Fix for null

    const destinationParam = searchParams.get('destination') ?? 'Åre';
    const dateParam = searchParams.get('date') ?? 'Select date';
    const guestsParam = searchParams.get('guests') ?? 'Add guests';

    setDestination(destinationParam);
    setDate(dateParam);
    setGuests(guestsParam);

    setProperties(getAccommodationsByDestination(destinationParam));
  }, [searchParams]); 

  return (
    <div className="min-h-screen bg-gray-50 m-8">
      <div className="bg-white border-b border-gray-200 ">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex justify-center m-8">
          Accommodations in {destination}
        </h2>

        {properties.length > 0 ? (
          <div className="space-y-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No accommodations found for the selected destination.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
