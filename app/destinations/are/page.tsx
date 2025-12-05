'use client';

import React from 'react';
import Link from 'next/link';
import { Mountain, Snowflake, Home, MapPin, ChevronRight, Ski, TreePine, Coffee } from 'lucide-react';

export default function ArePage() {
  const locations = [
    {
      name: 'Brown Hill',
      area: 'Åre Village',
      description: 'Apartment accommodation within walking distance of the ski slopes and village square. Perfect for families and groups.',
      distance: '470-490 m slope/lift',
      beds: '4-8 beds',
      amenities: ['Mobile key', 'Good choice for air travelers', 'Good choice for train travelers'],
    },
    {
      name: 'Högåsstigen',
      area: 'Bear (Björnen)',
      description: 'Located in Västra Björnen with the best location in the mountains. Optimal conditions for skiing and accommodation in the middle of the ski system.',
      distance: '0-50 m slope/lift',
      beds: '4-6 beds',
      amenities: ['Ski in/ski out', 'Mountain views'],
    },
    {
      name: 'Tott Mountain Lodge',
      area: 'Tott Village',
      description: 'Luxurious mountain lodge with panoramic views of the Åre valley. Features private sauna, fireplace, and fully equipped kitchen.',
      distance: '200-250 m slope/lift',
      beds: '6-10 beds',
      amenities: ['Ski in/ski out', 'Sauna', 'Mountain views'],
    },
    {
      name: 'Fjällby Apartments',
      area: 'Åre Björnen',
      description: 'Cozy apartments in the heart of Åre Björnen. Walking distance to restaurants, shops, and ski lifts with traditional Swedish charm.',
      distance: '300-350 m slope/lift',
      beds: '2-4 beds',
      amenities: ['Mobile key', 'Ski storage'],
    },
    {
      name: 'Åreskutan View Chalets',
      area: 'Duved',
      description: 'Stunning chalets with direct views of Åreskutan mountain. Modern Scandinavian design with premium facilities.',
      distance: '100-150 m slope/lift',
      beds: '4-6 beds',
      amenities: ['Ski in/ski out', 'Sauna', 'Fireplace'],
    },
  ];

  const activities = [
    { icon: Ski, name: 'Alpine Skiing', description: 'World-class slopes and ski system' },
    { icon: Snowflake, name: 'Snow Parks', description: 'SkiStar Fun Rides and Snow Parks' },
    { icon: TreePine, name: 'Cross-Country', description: 'Extensive cross-country trails' },
    { icon: Coffee, name: 'Après-Ski', description: 'Vibrant village atmosphere' },
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
              <Mountain className="w-12 h-12 text-white" />
              <h1 className="text-6xl font-bold text-white">Åre</h1>
            </div>
            <p className="text-2xl text-white font-medium max-w-3xl">
              Sweden's Premier Ski Destination - Experience World-Class Winter Sports in the Heart of the Scandinavian Mountains
            </p>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Welcome to Åre</h2>
              <p className="text-lg text-gray-700 mb-4">
                Åre is Scandinavia's largest ski resort and one of Europe's most renowned winter destinations.
                Located in the heart of the Swedish mountains, Åre offers an unparalleled combination of
                world-class skiing, stunning natural beauty, and authentic Scandinavian culture.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                With over 100 slopes, 44 lifts, and a vertical drop of 890 meters, Åre provides exceptional
                skiing for all levels. The resort has hosted multiple World Cup events and World Championships,
                cementing its status as a world-class destination.
              </p>
              <p className="text-lg text-gray-700">
                Beyond skiing, Åre offers a vibrant village atmosphere with excellent restaurants, cozy cafés,
                and legendary après-ski venues. The combination of top-tier facilities and genuine Swedish
                hospitality makes Åre a perfect destination for your winter holiday.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {activities.map((activity) => (
                <div key={activity.name} className="bg-gray-50 rounded-lg p-6">
                  <activity.icon className="w-10 h-10 text-[#C41E3A] mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.name}</h3>
                  <p className="text-gray-600">{activity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Locations Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Locations & Accommodations</h2>
          <p className="text-xl text-gray-600">
            Explore our top accommodations across Åre's most sought-after areas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <div
              key={location.name}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-[#C41E3A] transition-colors">
                      {location.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{location.area}</span>
                    </div>
                  </div>
                  <Home className="w-6 h-6 text-[#C41E3A]" />
                </div>

                <p className="text-gray-700 mb-4 min-h-[60px]">{location.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Ski className="w-4 h-4" />
                    <span>{location.distance}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Home className="w-4 h-4" />
                    <span>{location.beds}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {location.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/accommodation?destination=Åre&location=${encodeURIComponent(location.name)}`}
                    className="flex items-center justify-between text-[#C41E3A] font-semibold hover:gap-3 transition-all group"
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

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-[#C41E3A] to-[#A01830] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Book Your Åre Adventure?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover incredible accommodation options and start planning your perfect mountain getaway
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/accommodation?destination=Åre"
                className="px-8 py-4 bg-white text-[#C41E3A] rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Browse Accommodations
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/package?destination=Åre"
                className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors"
              >
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
