'use client';

import React from 'react';
import MobileCard from '../components/MobileCard';

const realmeMobiles = [
  {
    id: 1,
    name: 'Realme 13 Pro+',
    price: 119999,
    image: '/mobiles/realme-13-pro-plus.png',
    brand: 'Realme',
  },
  {
    id: 2,
    name: 'Realme 13 Pro',
    price: 89999,
    image: '/mobiles/realme-13-pro.png',
    brand: 'Realme',
  },
  {
    id: 3,
    name: 'Realme 13',
    price: 59999,
    image: '/mobiles/realme-13.png',
    brand: 'Realme',
  },
  {
    id: 4,
    name: 'Realme C67',
    price: 39999,
    image: '/mobiles/realme-c67.png',
    brand: 'Realme',
  },
  {
    id: 5,
    name: 'Realme C65',
    price: 34999,
    image: '/mobiles/realme-c65.png',
    brand: 'Realme',
  },
  {
    id: 6,
    name: 'Realme C55',
    price: 29999,
    image: '/mobiles/realme-c55.png',
    brand: 'Realme',
  },
  {
    id: 7,
    name: 'Realme GT 6',
    price: 189999,
    image: '/mobiles/realme-gt6.png',
    brand: 'Realme',
  },
  {
    id: 8,
    name: 'Realme 12 Pro+',
    price: 109999,
    image: '/mobiles/realme-12-pro-plus.png',
    brand: 'Realme',
  },
  {
    id: 9,
    name: 'Realme Narzo 70 Pro',
    price: 64999,
    image: '/mobiles/realme-narzo-70-pro.png',
    brand: 'Realme',
  },
  {
    id: 10,
    name: 'Realme C35',
    price: 24999,
    image: '/mobiles/realme-c35.png',
    brand: 'Realme',
  },
  {
    id: 11,
    name: 'Realme 11 Pro',
    price: 79999,
    image: '/mobiles/realme-11-pro.png',
    brand: 'Realme',
  },
  {
    id: 12,
    name: 'Realme C30',
    price: 17999,
    image: '/mobiles/realme-c30.png',
    brand: 'Realme',
  },
];

export default function RealmePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-6 py-4">
        <h1 className="text-3xl font-bold  text-gray-800 text-center mb-6">
          Realme Mobiles
        </h1>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-5">
          {realmeMobiles.map((mobile) => (
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