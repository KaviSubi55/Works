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
    <div className="group relative h-full w-full flex-shrink-0 overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative h-[400px] w-full">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Text Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="mb-2 text-xl font-bold leading-tight sm:text-2xl">
            {title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-gray-100 sm:text-base">
            {description}
          </p>
        </div>
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
