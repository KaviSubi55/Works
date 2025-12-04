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
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-6">
            <Ticket className="w-8 h-8 text-gray-900" />
            <h1 className="text-4xl font-bold text-gray-900">Ski Pass & Activity Passes</h1>
          </div>

          {/* Search Summary - Dynamic values from query params */}
          <SearchSummaryBar
            destination={destination}
            date=""
            guests={guests}
            onEdit={() => window.history.back()}
          />

          {/* Promotional Code Link */}
          <div className="mt-4">
            <button className="text-gray-700 hover:text-[#C41E3A] font-medium underline">
              Promotional code
            </button>
          </div>
        </div>
      </div>

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
