import AccommodationSearch from "@/components/AccomodationSearch";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SecondaryNav from "@/components/SecondaryNav";
import PromoCardGrid from "@/components/PromoCardGrid";
import Image from "next/image";

export default function Home() {
  const promoItems = [
    {
      id: '1',
      imageUrl: '/winter-home.jpg',
      imageAlt: 'Winter home experience',
      title: 'Winter Home Experience',
      description: 'Discover the perfect winter getaway with our cozy accommodations and stunning mountain views.',
    },
    {
      id: '2',
      imageUrl: '/package-adventure.jpg',
      imageAlt: 'Adventure package',
      title: 'Adventure Packages',
      description: 'Exciting adventure packages for thrill-seekers. Experience the best of winter sports and outdoor activities.',
    },
    {
      id: '3',
      imageUrl: '/rent-ski.jpg',
      imageAlt: 'Ski rental',
      title: 'Premium Ski Rentals',
      description: 'Top-quality ski equipment rental services. Get fitted with the best gear for your mountain adventure.',
    },
    {
      id: '4',
      imageUrl: '/rent-snowboard.jpg',
      imageAlt: 'Snowboard rental',
      title: 'Snowboard Rentals',
      description: 'Professional snowboard rental services with expert fitting and guidance for all skill levels.',
    },
    {
      id: '5',
      imageUrl: '/winter-home2.jpg',
      imageAlt: 'Luxury mountain cabin',
      title: 'Luxury Mountain Cabins',
      description: 'Experience ultimate comfort in our premium mountain cabins with panoramic views and modern amenities.',
    },
    {
      id: '6',
      imageUrl: '/package-adventure2.jpg',
      imageAlt: 'Family adventure packages',
      title: 'Family Adventure Packages',
      description: 'Create unforgettable memories with specially designed family packages including activities for all ages.',
    },
    {
      id: '7',
      imageUrl: '/accomodation-stock-6.jpg',
      imageAlt: 'Ski resort accommodations',
      title: 'Ski Resort Accommodations',
      description: 'Stay at the heart of the action with our ski-in ski-out accommodations perfectly located on the slopes.',
    },
    {
      id: '8',
      imageUrl: '/package-stock-5.jpg',
      imageAlt: 'Winter sports packages',
      title: 'Complete Winter Sports Packages',
      description: 'All-inclusive packages combining accommodation, lift passes, and equipment rentals for the ultimate ski vacation.',
    },
    {
      id: '9',
      imageUrl: '/winter-home4.jpg',
      imageAlt: 'Cozy winter retreat',
      title: 'Cozy Winter Retreat',
      description: 'Relax and unwind in our charming winter retreats featuring fireplaces and stunning alpine scenery.',
    },
    {
      id: '10',
      imageUrl: '/rent-ski2.jpg',
      imageAlt: 'Expert ski fitting',
      title: 'Expert Ski Fitting',
      description: 'Get personalized ski fitting and equipment recommendations from our experienced staff for optimal performance.',
    },
    {
      id: '11',
      imageUrl: '/accomodation-stock-3.jpg',
      imageAlt: 'Mountain lodges',
      title: 'Traditional Mountain Lodges',
      description: 'Enjoy authentic alpine hospitality in our traditional mountain lodges with rustic charm and modern comfort.',
    },
    {
      id: '12',
      imageUrl: '/package-adventure3.jpg',
      imageAlt: 'Extreme sports packages',
      title: 'Extreme Sports Adventures',
      description: 'Push your limits with our extreme sports packages featuring off-piste skiing, snowboarding, and more.',
    },
  ];

  return (
    <div className="overflow-x-hidden">
     {/* <Header /> */}
     <SecondaryNav />
     < HeroSection />
     <PromoCardGrid items={promoItems} />
     {/* <Footer />
      */}
    </div>
  );
}
