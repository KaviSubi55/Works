'use client';

import React, { useState } from 'react';
import { Ticket, Clock, CheckCircle2, ShoppingCart } from 'lucide-react';

interface SkiPassCardProps {
  id: string;
  title: string;
  location: string;
  type: string;
  duration: string;
  validFor: string;
  features: string[];
  price: number;
  recommended: boolean;
  description: string;
}

const SkiPassCard: React.FC<SkiPassCardProps> = ({
  id,
  title,
  location,
  type,
  duration,
  validFor,
  features,
  price,
  recommended,
  description,
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === id);

    if (existingItemIndex === -1) {
      const cartItem = {
        id,
        name: title,
        location,
        area: location,
        image: '/ski-pass-placeholder.jpg',
        propertyType: type,
        beds: duration,
        price,
        addedAt: new Date().toISOString(),
      };

      cartItems.push(cartItem);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      window.dispatchEvent(new Event('cartUpdated'));

      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        {recommended && (
          <div className="inline-block bg-[#C41E3A] text-white px-3 py-1 rounded-full text-sm font-bold mb-3">
            Recommended
          </div>
        )}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{location}</p>
      </div>

      <div className="p-6 flex-1">
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 text-gray-700">
            <Ticket className="w-5 h-5 text-[#C41E3A]" />
            <span className="font-semibold">{type}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Clock className="w-5 h-5 text-[#C41E3A]" />
            <div>
              <div className="font-semibold">{duration}</div>
              <div className="text-sm text-gray-600">{validFor}</div>
            </div>
          </div>
        </div>

        <p className="text-gray-700 mb-4 text-sm">{description}</p>

        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">Price</div>
            <div className="text-3xl font-bold text-[#C41E3A]">
              {price.toLocaleString()} SEK
            </div>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className={`w-full ${isAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-[#C41E3A] hover:bg-[#A01830]'} text-white px-6 py-3 rounded-full font-bold transition-colors flex items-center justify-center gap-2`}
        >
          <ShoppingCart className="w-5 h-5" />
          {isAdded ? 'Added to Cart!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default SkiPassCard;
