// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { Ticket } from 'lucide-react';
// import SearchSummaryBar from '@/components/Searchsummarybar';
// import SkiPassCard from '@/components/SkiPassCard';
// import { getSkiPassesByDestination, SkiPass } from '@/data/skipasses';

// export default function SkiPassListingPage() {
//   const searchParams = useSearchParams();
//   const [skipasses, setSkiPasses] = useState<SkiPass[]>([]);
//   const [destination, setDestination] = useState('');
//   const [guests, setGuests] = useState('');

//   useEffect(() => {
//     // Get query parameters
//     const destinationParam = searchParams.get('destination') || 'Åre';
//     const guestsParam = searchParams.get('guests') || 'Add guests';

//     setDestination(destinationParam);
//     setGuests(guestsParam);

//     // Filter ski passes based on destination
//     const filteredSkiPasses = getSkiPassesByDestination(destinationParam);
//     setSkiPasses(filteredSkiPasses);
//   }, [searchParams]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Page Header */}
      

//       {/* Main Content */}
//       <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Section Title */}
//         <h2 className="text-3xl font-bold text-gray-900 mb-6">
//           Available passes in {destination || 'selected destination'}
//         </h2>

//         {/* Ski Pass Listings */}
//         {skipasses.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {skipasses.map((pass) => (
//               <SkiPassCard key={pass.id} {...pass} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-xl text-gray-600">No passes found for the selected destination.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SkiPassCard from '@/components/SkiPassCard';
import { getSkiPassesByDestination, SkiPass } from '@/data/skipasses';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SkiPassListingPage() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [skipasses, setSkiPasses] = useState<SkiPass[]>([]);
  const [destination, setDestination] = useState('Åre');
  const [guests, setGuests] = useState('Add guests');

  // Stable string version of params for dependency
  const paramsString = searchParams?.toString() ?? '';

  useEffect(() => {
    if (!searchParams) return;

    const destinationParam = searchParams.get('destination') ?? 'Åre';
    const guestsParam = searchParams.get('guests') ?? 'Add guests';

    setDestination(destinationParam);
    setGuests(guestsParam);

    setSkiPasses(getSkiPassesByDestination(destinationParam));
  }, [paramsString]); // SAFE dependency

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className=" flex justify-center m-8 text-3xl font-bold text-gray-900 mb-6">
          {t('skipassListing.title')} {destination}
        </h2>

        {skipasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skipasses.map((pass) => (
              <SkiPassCard key={pass.id} {...pass} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              {t('skipassListing.noResults')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
