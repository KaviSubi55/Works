// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { Home } from 'lucide-react';
// import SearchSummaryBar from '@/components/Searchsummarybar';
// import RentFilterBar from '@/components/RentFilterBar';
// import RentCard from '@/components/RentCard';
// import { getRentalsByDestination, Rental } from '@/data/rentals';
// import { getCartItems, setCartItems as saveCartItems } from '@/utils/cartUtils';

// export default function RentListingPage() {
//   const searchParams = useSearchParams();
//   const [rentals, setRentals] = useState<Rental[]>([]);
//   const [destination, setDestination] = useState('');
//   const [guests, setGuests] = useState('');

//   useEffect(() => {
//     const destinationParam = searchParams.get('destination') || 'Åre';
//     const guestsParam = searchParams.get('guests') || 'Add guests';

//     setDestination(destinationParam);
//     setGuests(guestsParam);

//     const filteredRentals = getRentalsByDestination(destinationParam);
//     setRentals(filteredRentals);
//   }, [searchParams]);
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Page Header */}
//       <div className="bg-white border-b border-gray-200">
        


//         {/* Section Title */}
//         <h2 className="text-3xl font-bold text-gray-900 mb-6">
//           Rentals available in {destination || 'selected destination'}
//         </h2>

//         {/* Rental Listings */}
//         {rentals.length > 0 ? (
//           <div className="space-y-6">
//             {rentals.map((rental) => (
//               <RentCard
//                 key={rental.id}
//                 id={rental.id}
//                 title={rental.title}
//                 description={rental.description}
//                 images={rental.images}
//                 category={rental.category}
//                 includes={rental.features}
//                 price={rental.price}
//                 buttonText="Add to Cart"
//                 onButtonClick={() => {
//                   const cartItems = getCartItems();

//                   // Check if item already exists in cart
//                   const existingIndex = cartItems.findIndex((item: any) => item.id === rental.id);
//                   if (existingIndex !== -1) {
//                     return; // Item already in cart, don't add again
//                   }

//                   const cartItem = {
//                     id: rental.id,
//                     name: rental.title,
//                     location: rental.location,
//                     area: rental.location,
//                     image: rental.images[0],
//                     propertyType: rental.type,
//                     beds: rental.priceUnit,
//                     price: rental.price,
//                     addedAt: new Date().toISOString(),
//                   };
//                   cartItems.push(cartItem);
//                   saveCartItems(cartItems);
//                   window.dispatchEvent(new Event('cartUpdated'));
//                 }}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-xl text-gray-600">No rentals found for the selected destination.</p>
//           </div>
//         )}


//         {/* Additional Info Section */}
//         <div className="mt-12 bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
//           <div className="flex items-start gap-3">
//             <div className="shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
//               <span className="text-white font-bold text-xl">✓</span>
//             </div>
//             <div>
//               <h3 className="text-lg font-bold text-gray-900 mb-2">
//                 Free equipment adjustment & support
//               </h3>
//               <p className="text-gray-700">
//                 Our experienced staff will help you find the perfect equipment and make any necessary adjustments. 
//                 Need help during your rental? Visit our rental shop anytime during operating hours.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import RentCard from '@/components/RentCard';
import { getRentalsByDestination, Rental } from '@/data/rentals';
import { getCartItems, setCartItems as saveCartItems } from '@/utils/cartUtils';

export default function RentListingPage() {
  const searchParams = useSearchParams();
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [destination, setDestination] = useState('Åre');
  const [guests, setGuests] = useState('Add guests');

  // Stable dependency to avoid invalid hook behavior
  const paramsString = searchParams?.toString() ?? '';

  useEffect(() => {
    if (!searchParams) return;

    const destinationParam = searchParams.get('destination') ?? 'Åre';
    const guestsParam = searchParams.get('guests') ?? 'Add guests';

    setDestination(destinationParam);
    setGuests(guestsParam);

    setRentals(getRentalsByDestination(destinationParam));
  }, [paramsString]);

  return (
    <div className="min-h-screen bg-gray-50 m-8">
      <div className="bg-white border-b border-gray-200">

        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex justify-center m-8">
          Rentals available in {destination}
        </h2>

        {rentals.length > 0 ? (
          <div className="space-y-6">
            {rentals.map((rental) => (
              <RentCard
                key={rental.id}
                id={rental.id}
                title={rental.title}
                description={rental.description}
                images={rental.images}
                category={rental.category}
                includes={rental.features}
                price={rental.price}
                buttonText="Add to Cart"
                onButtonClick={() => {
                  const cartItems = getCartItems();
                  if (!cartItems.some((item: any) => item.id === rental.id)) {
                    cartItems.push({
                      id: rental.id,
                      name: rental.title,
                      location: rental.location,
                      area: rental.location,
                      image: rental.images[0],
                      propertyType: rental.type,
                      beds: rental.priceUnit,
                      price: rental.price,
                      addedAt: new Date().toISOString(),
                    });
                    saveCartItems(cartItems);
                    window.dispatchEvent(new Event('cartUpdated'));
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No rentals found for the selected destination.
            </p>
          </div>
        )}

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
