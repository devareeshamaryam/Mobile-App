 'use client';

import React from 'react';
import MobileCard from '../components/MobileCard';

// Vivo mobiles data
const vivoMobiles = [
  {
    id: 1,
    name: 'Vivo Y28s 5G',
    price: 54999,
    image: '/mobiles/vivo-y28s-5g.png',
    brand: 'Vivo',
  },
  {
    id: 2,
    name: 'Vivo Y18s',
    price: 34999,
    image: '/mobiles/vivo-y18s.png',
    brand: 'Vivo',
  },
  {
    id: 3,
    name: 'Vivo V30e',
    price: 89999,
    image: '/mobiles/vivo-v30e.png',
    brand: 'Vivo',
  },
  {
    id: 4,
    name: 'Vivo V30 Pro',
    price: 149999,
    image: '/mobiles/vivo-v30-pro.png',
    brand: 'Vivo',
  },
  {
    id: 5,
    name: 'Vivo Y200',
    price: 64999,
    image: '/mobiles/vivo-y200.png',
    brand: 'Vivo',
  },
  {
    id: 6,
    name: 'Vivo Y100',
    price: 49999,
    image: '/mobiles/vivo-y100.png',
    brand: 'Vivo',
  },
  {
    id: 7,
    name: 'Vivo X100 Pro',
    price: 299999,
    image: '/mobiles/vivo-x100-pro.png',
    brand: 'Vivo',
  },
  {
    id: 8,
    name: 'Vivo X100',
    price: 229999,
    image: '/mobiles/vivo-x100.png',
    brand: 'Vivo',
  },
  {
    id: 9,
    name: 'Vivo V29e',
    price: 79999,
    image: '/mobiles/vivo-v29e.png',
    brand: 'Vivo',
  },
  {
    id: 10,
    name: 'Vivo Y27s',
    price: 44999,
    image: '/mobiles/vivo-y27s.png',
    brand: 'Vivo',
  },
  {
    id: 11,
    name: 'Vivo Y16',
    price: 29999,
    image: '/mobiles/vivo-y16.png',
    brand: 'Vivo',
  },
  {
    id: 12,
    name: 'Vivo T2x 5G',
    price: 39999,
    image: '/mobiles/vivo-t2x-5g.png',
    brand: 'Vivo',
  },
];

export default function VivoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-6 py-4">
        {/* Page Title */}
        <h1 className="text-3xl font-bold   text-gray-800  text-center mb-6">
          Vivo Mobiles
        </h1>

        {/* Mobile Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-5">
          {vivoMobiles.map((mobile) => (
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