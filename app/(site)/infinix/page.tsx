'use client';

import React from 'react';
import MobileCard from '../components/MobileCard';

const infinixMobiles = [
  {
    id: 1,
    name: 'Infinix Zero 40 5G',
    price: 89999,
    image: '/mobiles/infinix-zero40-5g.png',
    brand: 'Infinix',
  },
  {
    id: 2,
    name: 'Infinix Zero 30 5G',
    price: 69999,
    image: '/mobiles/infinix-zero30-5g.png',
    brand: 'Infinix',
  },
  {
    id: 3,
    name: 'Infinix Note 40 Pro',
    price: 59999,
    image: '/mobiles/infinix-note40-pro.png',
    brand: 'Infinix',
  },
  {
    id: 4,
    name: 'Infinix Note 40',
    price: 44999,
    image: '/mobiles/infinix-note40.png',
    brand: 'Infinix',
  },
  {
    id: 5,
    name: 'Infinix Note 30 Pro',
    price: 49999,
    image: '/mobiles/infinix-note30-pro.png',
    brand: 'Infinix',
  },
  {
    id: 6,
    name: 'Infinix Hot 40 Pro',
    price: 34999,
    image: '/mobiles/infinix-hot40-pro.png',
    brand: 'Infinix',
  },
  {
    id: 7,
    name: 'Infinix Hot 40',
    price: 27999,
    image: '/mobiles/infinix-hot40.png',
    brand: 'Infinix',
  },
  {
    id: 8,
    name: 'Infinix Smart 8 Pro',
    price: 22999,
    image: '/mobiles/infinix-smart8-pro.png',
    brand: 'Infinix',
  },
  {
    id: 9,
    name: 'Infinix Smart 8',
    price: 17999,
    image: '/mobiles/infinix-smart8.png',
    brand: 'Infinix',
  },
  {
    id: 10,
    name: 'Infinix GT 20 Pro',
    price: 74999,
    image: '/mobiles/infinix-gt20-pro.png',
    brand: 'Infinix',
  },
  {
    id: 11,
    name: 'Infinix Hot 30i',
    price: 19999,
    image: '/mobiles/infinix-hot30i.png',
    brand: 'Infinix',
  },
  {
    id: 12,
    name: 'Infinix Note 30',
    price: 39999,
    image: '/mobiles/infinix-note30.png',
    brand: 'Infinix',
  },
];

export default function InfinixPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-6 py-4">
        <h1 className="text-3xl font-bold  text-gray-800  text-center mb-6">
          Infinix Mobiles
        </h1>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-5">
          {infinixMobiles.map((mobile) => (
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