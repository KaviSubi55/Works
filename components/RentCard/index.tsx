'use client';

import React, { useState, useEffect } from 'react';
import { Package, Info, ShoppingCart } from 'lucide-react';

interface RentCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  includes?: string[];
  price?: number;
  badge?: string;
  infoText?: string;
  buttonText: string;
  onButtonClick?: () => void;
}

const RentCard: React.FC<RentCardProps> = ({
  id,
  title,
  description,
  image,
  category,
  includes,
  price,
  badge,
  infoText,
  buttonText,
  onButtonClick,
}) => {
  const [isInCart, setIsInCart] = useState(false);

  // Check if item is already in cart
  const checkIfInCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const exists = cartItems.some((item: any) => item.id === id);
    setIsInCart(exists);
  };

  useEffect(() => {
    // Check initially
    checkIfInCart();

    // Listen for cart updates
    const handleCartUpdate = () => {
      checkIfInCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [id]);

  const handleClick = () => {
    if (onButtonClick && !isInCart) {
      onButtonClick();
    }
  };
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Image */}
        <div className="md:col-span-5 relative">
          <div className="relative aspect-4/3 bg-gray-200">
            <img
              src={image || '/rent-placeholder.jpg'}
              alt={title}
              className="w-full h-full object-cover"
            />
            {category && (
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {category}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-7 flex flex-col p-6">
          {/* Badge */}
          {badge && (
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mb-3 self-start">
              <Info className="w-4 h-4" />
              {badge}
            </div>
          )}

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>

          {/* Description */}
          <p className="text-gray-700 mb-4 leading-relaxed">{description}</p>

          {/* Includes */}
          {includes && includes.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-900">Includes:</span>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {includes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Info Text */}
          {infoText && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="text-blue-800 text-sm">{infoText}</p>
            </div>
          )}

          {/* Price and Button */}
          <div className="mt-auto flex items-center justify-between">
            {price && (
              <div>
                <div className="text-sm text-gray-600">From</div>
                <div className="text-3xl font-bold text-[#C41E3A]">
                  {price.toLocaleString()} SEK
                </div>
                <div className="text-sm text-gray-600">per day</div>
              </div>
            )}

            <button
              onClick={handleClick}
              disabled={isInCart}
              className={`${
                isInCart
                  ? 'bg-green-600 hover:bg-green-700 cursor-default'
                  : 'bg-[#C41E3A] hover:bg-[#A01830]'
              } text-white px-8 py-3 rounded-full font-bold transition-colors shadow-lg flex items-center gap-2`}
            >
              {isInCart && <ShoppingCart className="w-5 h-5" />}
              {isInCart ? 'Added!' : buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentCard;
