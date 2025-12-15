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
