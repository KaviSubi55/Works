'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Ticket } from 'lucide-react';
import SearchSummaryBar from '@/components/Searchsummarybar';
import SkiPassCard from '@/components/SkiPassCard';
import { getSkiPassesByDestination, SkiPass } from '@/data/skipasses';

export default function SkiPassListingPage() {
  const searchParams = useSearchParams();
  const [skipasses, setSkiPasses] = useState<SkiPass[]>([]);
  const [destination, setDestination] = useState('');
  const [guests, setGuests] = useState('');

  useEffect(() => {
    // Get query parameters
    const destinationParam = searchParams.get('destination') || 'Åre';
    const guestsParam = searchParams.get('guests') || 'Add guests';

    setDestination(destinationParam);
    setGuests(guestsParam);

    // Filter ski passes based on destination
    const filteredSkiPasses = getSkiPassesByDestination(destinationParam);
    setSkiPasses(filteredSkiPasses);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Available passes in {destination || 'selected destination'}
        </h2>

        {/* Ski Pass Listings */}
        {skipasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skipasses.map((pass) => (
              <SkiPassCard key={pass.id} {...pass} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No passes found for the selected destination.</p>
          </div>
        )}
      </div>
    </div>
  );
}
