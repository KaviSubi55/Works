'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Home } from 'lucide-react';
import SearchSummaryBar from '@/components/Searchsummarybar';
import DurationTabs from '@/components/DurationTabs';
import FilterBar from '@/components/FilterBar';
import InfoBanner from '@/components/InfoBanner';
import PropertyCard from '@/components/PropertyCard';
import { getAccommodationsByDestination, Accommodation } from '@/data/accommodations';

export default function AccommodationListingPage() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Accommodation[]>([]);
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('');

  useEffect(() => {
    // Get query parameters
    const destinationParam = searchParams.get('destination') || 'Åre';
    const dateParam = searchParams.get('date') || 'Select date';
    const guestsParam = searchParams.get('guests') || 'Add guests';

    setDestination(destinationParam);
    setDate(dateParam);
    setGuests(guestsParam);

    // Filter properties based on destination
    const filteredProperties = getAccommodationsByDestination(destinationParam);
    setProperties(filteredProperties);
  }, [searchParams]);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative h-[300px] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/winter-home.jpg)' }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Find Your Perfect Accommodation</h1>
            <p className="text-xl text-white">Discover amazing places to stay for your mountain getaway</p>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-6">
            <Home className="w-8 h-8 text-gray-900" />
            <h1 className="text-4xl font-bold text-gray-900">Find accommodation</h1>
          </div>

          {/* Search Summary - Dynamic values from query params */}
          <SearchSummaryBar
            destination={destination}
            date={date}
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

      {/* Duration Selection */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <DurationTabs />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <div className="mb-6">
          <FilterBar />
        </div>

        {/* Info Banner */}
        <div className="mb-8">
          <InfoBanner />
        </div>

        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Accommodations in {destination || 'selected destination'}
        </h2>

        {/* Property Listings */}
        {properties.length > 0 ? (
          <div className="space-y-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No accommodations found for the selected destination.</p>
          </div>
        )}

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="px-8 py-3 border-2 border-gray-300 rounded-full font-medium text-gray-900 hover:bg-gray-50 transition-colors">
            Load more properties
          </button>
        </div>
      </div>
    </div>
  );
}
