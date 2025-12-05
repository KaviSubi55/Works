import React from 'react';
import Link from 'next/link';
import { Building2, Landmark, Home, MapPin, ChevronRight, Coffee, ShoppingBag, Camera, Ship } from 'lucide-react';

export default function StockholmPage() {
  const locations = [
    {
      name: 'Gamla Stan Heritage Hotel',
      area: 'Old Town (Gamla Stan)',
      description: 'Historic boutique hotel in the heart of Gamla Stan. Experience authentic Stockholm charm with cobblestone streets at your doorstep.',
      location: 'City Center',
      beds: '2-4 beds',
      amenities: ['Good choice for air travelers', 'Good choice for train travelers', 'City views'],
    },
    {
      name: 'Södermalm Loft Apartments',
      area: 'Södermalm',
      description: 'Modern loft apartments in trendy Södermalm district. Industrial-chic design with rooftop terrace access.',
      location: 'City Center',
      beds: '2-6 beds',
      amenities: ['Mobile key', 'City views', 'Trendy area'],
    },
    {
      name: 'Waterfront Luxury Suites',
      area: 'Djurgården',
      description: 'Exclusive waterfront suites on the beautiful island of Djurgården. Floor-to-ceiling windows with stunning water views.',
      location: 'Djurgården',
      beds: '2-4 beds',
      amenities: ['Waterfront views', 'Premium amenities', 'Near museums'],
    },
    {
      name: 'Östermalm Grand Residences',
      area: 'Östermalm',
      description: 'Elegant residences in upscale Östermalm neighborhood. Classic Swedish architecture meets modern luxury.',
      location: 'City Center',
      beds: '4-8 beds',
      amenities: ['Premium amenities', 'City views', 'Upscale area'],
    },
    {
      name: 'Kungsholmen Family Apartments',
      area: 'Kungsholmen',
      description: 'Spacious family-friendly apartments on Kungsholmen island. Modern amenities with a cozy atmosphere.',
      location: 'Kungsholmen',
      beds: '4-6 beds',
      amenities: ['Family-friendly', 'Mobile key', 'Near parks'],
    },
    {
      name: 'Vasastan Urban Studios',
      area: 'Vasastan',
      description: 'Contemporary urban studios in central Vasastan. Perfect for couples or solo travelers with minimalist Scandinavian design.',
      location: 'City Center',
      beds: '1-2 beds',
      amenities: ['Budget-friendly', 'Mobile key', 'Central location'],
    },
  ];

  const attractions = [
    { icon: Landmark, name: 'Historic Sites', description: 'Royal Palace, Gamla Stan, City Hall' },
    { icon: Camera, name: 'Museums', description: 'Vasa Museum, ABBA Museum, Skansen' },
    { icon: ShoppingBag, name: 'Shopping', description: 'NK, Mood Gallerian, Design shops' },
    { icon: Ship, name: 'Archipelago', description: 'Island hopping and boat tours' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with winter-home.jpg */}
      <div className="relative h-[500px] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/winter-home.jpg)' }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-12 h-12 text-white" />
              <h1 className="text-6xl font-bold text-white">Stockholm</h1>
            </div>
            <p className="text-2xl text-white font-medium max-w-3xl">
              Scandinavia's Capital of Culture - Experience the Perfect Blend of Historic Charm and Modern Nordic Design
            </p>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Discover Stockholm</h2>
              <p className="text-lg text-gray-700 mb-4">
                Stockholm, the capital of Sweden, is a stunning city spread across 14 islands connected by
                over 50 bridges. Known as the "Venice of the North," Stockholm seamlessly blends medieval
                architecture with contemporary Scandinavian design, creating a unique and captivating atmosphere.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                The city is home to world-renowned museums, including the Vasa Museum and ABBA Museum,
                along with historic landmarks like the Royal Palace and charming cobblestone streets of
                Gamla Stan (Old Town). Stockholm's vibrant culture, innovative cuisine, and beautiful
                waterfront locations make it a must-visit destination year-round.
              </p>
              <p className="text-lg text-gray-700">
                Whether you're exploring trendy Södermalm, upscale Östermalm, or the peaceful island of
                Djurgården, Stockholm offers diverse neighborhoods each with their own character and charm.
                Experience Swedish fika culture, browse design boutiques, and enjoy some of Europe's finest
                dining and entertainment.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {attractions.map((attraction) => (
                <div key={attraction.name} className="bg-gray-50 rounded-lg p-6">
                  <attraction.icon className="w-10 h-10 text-[#C41E3A] mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{attraction.name}</h3>
                  <p className="text-gray-600">{attraction.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Locations Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Premium Accommodations Across Stockholm</h2>
          <p className="text-xl text-gray-600">
            From historic Old Town to trendy Södermalm, find your perfect stay in the Swedish capital
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <div
              key={location.name}
              className="relative rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(/winter-home3.jpg)' }}
              >
                <div className="absolute inset-0 bg-black/50" />
              </div>

              <div className="relative z-10 p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#C41E3A] transition-colors">
                      {location.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{location.area}</span>
                    </div>
                  </div>
                  <Home className="w-6 h-6 text-[#C41E3A]" />
                </div>

                <p className="text-white mb-4 min-h-[60px]">{location.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-white">
                    <MapPin className="w-4 h-4" />
                    <span>{location.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white">
                    <Home className="w-4 h-4" />
                    <span>{location.beds}</span>
                  </div>
                </div>

                <div className="border-t border-white/30 pt-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {location.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/accommodation?destination=Stockholm&location=${encodeURIComponent(location.name)}`}
                    className="flex items-center justify-between text-white font-semibold hover:gap-3 transition-all group bg-[#C41E3A] px-4 py-2 rounded-lg hover:bg-[#A01830]"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Neighborhoods Highlight */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Explore Stockholm's Neighborhoods</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#C41E3A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Landmark className="w-10 h-10 text-[#C41E3A]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Historic Center</h3>
              <p className="text-gray-600">
                Gamla Stan's medieval streets, Royal Palace, and historic landmarks offer a journey through centuries of Swedish history.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#C41E3A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-10 h-10 text-[#C41E3A]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Trendy Districts</h3>
              <p className="text-gray-600">
                Södermalm and Vasastan buzz with hip cafés, vintage shops, and vibrant nightlife in Stockholm's most creative neighborhoods.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#C41E3A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ship className="w-10 h-10 text-[#C41E3A]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Waterfront Living</h3>
              <p className="text-gray-600">
                Djurgården and Kungsholmen offer peaceful island settings with stunning water views and easy access to nature.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-[#C41E3A] to-[#A01830] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Experience Stockholm?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Find the perfect accommodation in the heart of Scandinavia's most beautiful capital city
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/accommodation?destination=Stockholm"
                className="px-8 py-4 bg-white text-[#C41E3A] rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Browse Accommodations
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/package?destination=Stockholm"
                className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors"
              >
                View City Packages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
