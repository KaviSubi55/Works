'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white">
      {/* Top Red Section with Destinations */}
      <div className="bg-[#C41E3A]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Peakster Vacation Club */}
          <div className="text-center mb-6">
            <Link
              href="/vacation-club"
              className="text-white text-lg hover:underline"
            >
              {t('footer.vacationClub')}
            </Link>
          </div>

          {/* Destinations */}
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {/* ÅRE */}
            <Link
              href="/destination/are"
              className="text-white hover:opacity-80 transition-opacity"
            >
              <span className="text-2xl font-bold tracking-wider">{t('footer.are')}</span>
            </Link>

            {/* STOCKHOLM */}
            <Link
              href="/destination/stockholm"
              className="text-white hover:opacity-80 transition-opacity"
            >
              <span className="text-2xl font-bold tracking-wider">{t('footer.stockholm')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom White Section with Logo and Company Info */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Peakster Logo */}
          <div className="text-center mb-4">
            <Link href="/" className="inline-block">
              <div className="text-4xl font-bold text-[#C41E3A] tracking-tight">
                peakster
              </div>
            </Link>
          </div>

          {/* Company Information */}
          <div className="text-center text-gray-600 text-sm">
            <p>{t('footer.companyInfo')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
