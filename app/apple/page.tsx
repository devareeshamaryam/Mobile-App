'use client';

import React from 'react';
import MobileCard from '../components/MobileCard';

const appleMobiles = [
  {
    id: 1,
    name: 'Apple iPhone 16 Pro Max',
    price: 549999,
    image: '/mobiles/iphone-16-pro-max.png',
    brand: 'Apple',
  },
  {
    id: 2,
    name: 'Apple iPhone 16 Pro',
    price: 469999,
    image: '/mobiles/iphone-16-pro.png',
    brand: 'Apple',
  },
  {
    id: 3,
    name: 'Apple iPhone 16 Plus',
    price: 419999,
    image: '/mobiles/iphone-16-plus.png',
    brand: 'Apple',
  },
  {
    id: 4,
    name: 'Apple iPhone 16',
    price: 359999,
    image: '/mobiles/iphone-16.png',
    brand: 'Apple',
  },
  {
    id: 5,
    name: 'Apple iPhone 15 Pro Max',
    price: 499999,
    image: '/mobiles/iphone-15-pro-max.png',
    brand: 'Apple',
  },
  {
    id: 6,
    name: 'Apple iPhone 15 Pro',
    price: 429999,
    image: '/mobiles/iphone-15-pro.png',
    brand: 'Apple',
  },
  {
    id: 7,
    name: 'Apple iPhone 15 Plus',
    price: 379999,
    image: '/mobiles/iphone-15-plus.png',
    brand: 'Apple',
  },
  {
    id: 8,
    name: 'Apple iPhone 15',
    price: 319999,
    image: '/mobiles/iphone-15.png',
    brand: 'Apple',
  },
  {
    id: 9,
    name: 'Apple iPhone 14',
    price: 269999,
    image: '/mobiles/iphone-14.png',
    brand: 'Apple',
  },
  {
    id: 10,
    name: 'Apple iPhone 14 Plus',
    price: 299999,
    image: '/mobiles/iphone-14-plus.png',
    brand: 'Apple',
  },
  {
    id: 11,
    name: 'Apple iPhone 13',
    price: 219999,
    image: '/mobiles/iphone-13.png',
    brand: 'Apple',
  },
  {
    id: 12,
    name: 'Apple iPhone SE 3rd Gen',
    price: 149999,
    image: '/mobiles/iphone-se-3.png',
    brand: 'Apple',
  },
];

export default function ApplePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-6 py-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Apple iPhones
        </h1>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-5">
          {appleMobiles.map((mobile) => (
            <MobileCard
              key={mobile.id}
              id={mobile.id}
              name={mobile.name}
              price={mobile.price}
              image={mobile.image}
              brand={mobile.brand}
            />
          ))}
        </div>
      </main>
    </div>
  );
}