import React from 'react';
import Image from 'next/image';

interface PromoCardProps {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  link?: string;
}

const PromoCard: React.FC<PromoCardProps> = ({
  imageUrl,
  imageAlt,
  title,
  description,
  link,
}) => {
  const CardContent = (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
      {/* Image Container */}
      <div className="relative h-64 w-full sm:h-80 md:h-96">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-white via-white to-transparent p-6 sm:p-8">
        <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          {title}
        </h2>
        <p className="text-sm text-gray-700 sm:text-base md:text-lg">
          {description}
        </p>
      </div>
    </div>
  );

  if (link) {
    return (
      <a
        href={link}
        className="block"
        target="_blank"
        rel="noopener noreferrer"
      >
        {CardContent}
      </a>
    );
  }

  return CardContent;
};

export default PromoCard;
