'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Home } from 'lucide-react';
import SearchSummaryBar from '@/components/Searchsummarybar';
import RentFilterBar from '@/components/RentFilterBar';
import RentCard from '@/components/RentCard';
import { getRentalsByDestination, Rental } from '@/data/rentals';

export default function RentListingPage() {
  const searchParams = useSearchParams();
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [destination, setDestination] = useState('');
  const [guests, setGuests] = useState('');

  useEffect(() => {
    const destinationParam = searchParams.get('destination') || 'Åre';
    const guestsParam = searchParams.get('guests') || 'Add guests';

    setDestination(destinationParam);
    setGuests(guestsParam);

    const filteredRentals = getRentalsByDestination(destinationParam);
    setRentals(filteredRentals);
  }, [searchParams]);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-6">
            <Home className="w-8 h-8 text-gray-900" />
            <h1 className="text-4xl font-bold text-gray-900">Rent Equipment</h1>
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
              Discount code
            </button>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-center text-blue-800 text-sm">
            📍 Pick up your equipment at the rental shop in your selected destination
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <div className="mb-8">
          <RentFilterBar />
        </div>

        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Rentals available in {destination || 'selected destination'}
        </h2>

        {/* Rental Listings */}
        {rentals.length > 0 ? (
          <div className="space-y-6">
            {rentals.map((rental) => (
              <RentCard
                key={rental.id}
                id={rental.id}
                title={rental.title}
                description={rental.description}
                image={rental.image}
                category={rental.category}
                includes={rental.features}
                price={rental.price}
                buttonText="Add to Cart"
                onButtonClick={() => {
                  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

                  // Check if item already exists in cart
                  const existingIndex = cartItems.findIndex((item: any) => item.id === rental.id);
                  if (existingIndex !== -1) {
                    return; // Item already in cart, don't add again
                  }

                  const cartItem = {
                    id: rental.id,
                    name: rental.title,
                    location: rental.location,
                    area: rental.location,
                    image: rental.image,
                    propertyType: rental.type,
                    beds: rental.priceUnit,
                    price: rental.price,
                    addedAt: new Date().toISOString(),
                  };
                  cartItems.push(cartItem);
                  localStorage.setItem('cartItems', JSON.stringify(cartItems));
                  window.dispatchEvent(new Event('cartUpdated'));
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No rentals found for the selected destination.</p>
          </div>
        )}

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="px-8 py-3 border-2 border-gray-300 rounded-full font-medium text-gray-900 hover:bg-gray-50 transition-colors">
            Show more equipment
          </button>
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">✓</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Free equipment adjustment & support
              </h3>
              <p className="text-gray-700">
                Our experienced staff will help you find the perfect equipment and make any necessary adjustments. 
                Need help during your rental? Visit our rental shop anytime during operating hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
