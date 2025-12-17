// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { Home } from 'lucide-react';
// import SearchSummaryBar from '@/components/Searchsummarybar';
// import PackageFilterBar from '@/components/PackageFilterBar';
// import PackageCard from '@/components/PackageCard';
// import { getPackagesByDestination, Package } from '@/data/packages';

// export default function PackagePage() {
//   const searchParams = useSearchParams();
//   const [packages, setPackages] = useState<Package[]>([]);
//   const [destination, setDestination] = useState('');
//   const [guests, setGuests] = useState('');

//   useEffect(() => {
//     // Get query parameters
//     const destinationParam = searchParams.get('destination') || 'Åre';
//     const guestsParam = searchParams.get('guests') || 'Add guests';

//     setDestination(destinationParam);
//     setGuests(guestsParam);

//     // Filter packages based on destination
//     const filteredPackages = getPackagesByDestination(destinationParam);
//     setPackages(filteredPackages);
//   }, [searchParams]);
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Page Header */}
//       <div className="bg-white border-b border-gray-200">
     

//         {/* Section Title */}
//         <h2 className="text-3xl font-bold text-gray-900 mb-6">
//           Packages in {destination || 'selected destination'}
//         </h2>

//         {/* Package Listings */}
//         {packages.length > 0 ? (
//           <div className="space-y-6">
//             {packages.map((pkg) => (
//               <PackageCard key={pkg.id} {...pkg} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-xl text-gray-600">No packages found for the selected destination.</p>
//           </div>
//         )}

//         {/* Load More */}
//         <div className="mt-8 text-center">
//           <button className="px-8 py-3 border-2 border-gray-300 rounded-full font-medium text-gray-900 hover:bg-gray-50 transition-colors">
//             Load more packages
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PackageCard from '@/components/PackageCard';
import { getPackagesByDestination, Package } from '@/data/packages';
import { Tag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

function PackageListingContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [packages, setPackages] = useState<Package[]>([]);
  const [destination, setDestination] = useState('Åre');
  const [guests, setGuests] = useState('Add guests');

  // Convert searchParams to a stable string so the dependency array is valid
  const paramsString = searchParams?.toString() ?? '';

  useEffect(() => {
    if (!searchParams) return;

    const destinationParam = searchParams.get('destination') ?? 'Åre';
    const guestsParam = searchParams.get('guests') ?? 'Add guests';

    setDestination(destinationParam);
    setGuests(guestsParam);

    setPackages(getPackagesByDestination(destinationParam));
  }, [paramsString]); // <-- SAFE dependency

  return (
    <div className="min-h-screen bg-gray-50 mt-8">
      <div className="bg-white border-b border-gray-200">
        <h2 className="flex text-3xl font-bold text-gray-800 mb-8 justify-center items-center">
          {t('packageListing.title')} {destination}
        </h2>

        {packages.length > 0 ? (
          <div className="space-y-16">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} {...pkg} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-xl text-gray-600">
              {t('packageListing.noResults')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PackagePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 mt-8"><div className="text-center py-12">Loading...</div></div>}>
      <PackageListingContent />
    </Suspense>
  );
}
