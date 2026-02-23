 'use client';

import React from 'react';
import MobileCard from '../components/MobileCard';

const oppoMobiles = [
  {
    id: 1,
    name: 'Oppo Reno 12 Pro',
    price: 149999,
    image: '/mobiles/oppo-reno12-pro.png',
    brand: 'Oppo',
  },
  {
    id: 2,
    name: 'Oppo Reno 12',
    price: 109999,
    image: '/mobiles/oppo-reno12.png',
    brand: 'Oppo',
  },
  {
    id: 3,
    name: 'Oppo A3 Pro',
    price: 69999,
    image: '/mobiles/oppo-a3-pro.png',
    brand: 'Oppo',
  },
  {
    id: 4,
    name: 'Oppo A60',
    price: 49999,
    image: '/mobiles/oppo-a60.png',
    brand: 'Oppo',
  },
  {
    id: 5,
    name: 'Oppo Find X7 Ultra',
    price: 449999,
    image: '/mobiles/oppo-find-x7-ultra.png',
    brand: 'Oppo',
  },
  {
    id: 6,
    name: 'Oppo Reno 11 Pro',
    price: 129999,
    image: '/mobiles/oppo-reno11-pro.png',
    brand: 'Oppo',
  },
  {
    id: 7,
    name: 'Oppo A18',
    price: 29999,
    image: '/mobiles/oppo-a18.png',
    brand: 'Oppo',
  },
  {
    id: 8,
    name: 'Oppo A58',
    price: 44999,
    image: '/mobiles/oppo-a58.png',
    brand: 'Oppo',
  },
  {
    id: 9,
    name: 'Oppo Reno 10 Pro+',
    price: 159999,
    image: '/mobiles/oppo-reno10-pro-plus.png',
    brand: 'Oppo',
  },
  {
    id: 10,
    name: 'Oppo A78',
    price: 59999,
    image: '/mobiles/oppo-a78.png',
    brand: 'Oppo',
  },
  {
    id: 11,
    name: 'Oppo A17',
    price: 24999,
    image: '/mobiles/oppo-a17.png',
    brand: 'Oppo',
  },
  {
    id: 12,
    name: 'Oppo A57',
    price: 34999,
    image: '/mobiles/oppo-a57.png',
    brand: 'Oppo',
  },
];

export default function OppoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-6 py-4">
        <h1 className="text-3xl font-bold  text-gray-800  text-center mb-6">
          Oppo Mobiles
        </h1>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-5">
          {oppoMobiles.map((mobile) => (
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