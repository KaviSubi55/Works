'use client';

import AccommodationSearch from "@/components/AccomodationSearch";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SecondaryNav from "@/components/SecondaryNav";
import PromoCardGrid from "@/components/PromoCardGrid";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  const promoItems = [
    {
      id: '1',
      imageUrl: '/winter-home.jpg',
      imageAlt: t('promo.winterHome'),
      title: t('promo.winterHome'),
      description: t('promo.winterHomeDesc'),
    },
    {
      id: '2',
      imageUrl: '/package-adventure.jpg',
      imageAlt: t('promo.adventurePackages'),
      title: t('promo.adventurePackages'),
      description: t('promo.adventurePackagesDesc'),
    },
    {
      id: '3',
      imageUrl: '/rent-ski.jpg',
      imageAlt: t('promo.skiRentals'),
      title: t('promo.skiRentals'),
      description: t('promo.skiRentalsDesc'),
    },
    {
      id: '4',
      imageUrl: '/rent-snowboard.jpg',
      imageAlt: t('promo.snowboardRentals'),
      title: t('promo.snowboardRentals'),
      description: t('promo.snowboardRentalsDesc'),
    },
    {
      id: '5',
      imageUrl: '/winter-home2.jpg',
      imageAlt: t('promo.luxuryCabins'),
      title: t('promo.luxuryCabins'),
      description: t('promo.luxuryCabinsDesc'),
    },
    {
      id: '6',
      imageUrl: '/package-adventure2.jpg',
      imageAlt: t('promo.familyPackages'),
      title: t('promo.familyPackages'),
      description: t('promo.familyPackagesDesc'),
    },
    {
      id: '7',
      imageUrl: '/accomodation-stock-6.jpg',
      imageAlt: t('promo.skiResort'),
      title: t('promo.skiResort'),
      description: t('promo.skiResortDesc'),
    },
    {
      id: '8',
      imageUrl: '/package-stock-5.jpg',
      imageAlt: t('promo.winterSports'),
      title: t('promo.winterSports'),
      description: t('promo.winterSportsDesc'),
    },
    {
      id: '9',
      imageUrl: '/winter-home4.jpg',
      imageAlt: t('promo.cozyRetreat'),
      title: t('promo.cozyRetreat'),
      description: t('promo.cozyRetreatDesc'),
    },
    {
      id: '10',
      imageUrl: '/rent-ski2.jpg',
      imageAlt: t('promo.expertFitting'),
      title: t('promo.expertFitting'),
      description: t('promo.expertFittingDesc'),
    },
    {
      id: '11',
      imageUrl: '/accomodation-stock-3.jpg',
      imageAlt: t('promo.mountainLodges'),
      title: t('promo.mountainLodges'),
      description: t('promo.mountainLodgesDesc'),
    },
    {
      id: '12',
      imageUrl: '/package-adventure3.jpg',
      imageAlt: t('promo.extremeSports'),
      title: t('promo.extremeSports'),
      description: t('promo.extremeSportsDesc'),
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
