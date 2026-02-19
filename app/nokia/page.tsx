'use client';

import React from 'react';
import MobileCard from '../components/MobileCard';

const nokiaMobiles = [
  {
    id: 1,
    name: 'Nokia G42 5G',
    price: 49999,
    image: '/mobiles/nokia-g42-5g.png',
    brand: 'Nokia',
  },
  {
    id: 2,
    name: 'Nokia G22',
    price: 34999,
    image: '/mobiles/nokia-g22.png',
    brand: 'Nokia',
  },
  {
    id: 3,
    name: 'Nokia G21',
    price: 29999,
    image: '/mobiles/nokia-g21.png',
    brand: 'Nokia',
  },
  {
    id: 4,
    name: 'Nokia C32',
    price: 22999,
    image: '/mobiles/nokia-c32.png',
    brand: 'Nokia',
  },
  {
    id: 5,
    name: 'Nokia C22',
    price: 18999,
    image: '/mobiles/nokia-c22.png',
    brand: 'Nokia',
  },
  {
    id: 6,
    name: 'Nokia C12',
    price: 14999,
    image: '/mobiles/nokia-c12.png',
    brand: 'Nokia',
  },
  {
    id: 7,
    name: 'Nokia X30 5G',
    price: 89999,
    image: '/mobiles/nokia-x30-5g.png',
    brand: 'Nokia',
  },
  {
    id: 8,
    name: 'Nokia XR21',
    price: 109999,
    image: '/mobiles/nokia-xr21.png',
    brand: 'Nokia',
  },
  {
    id: 9,
    name: 'Nokia G310 5G',
    price: 44999,
    image: '/mobiles/nokia-g310-5g.png',
    brand: 'Nokia',
  },
  {
    id: 10,
    name: 'Nokia C210',
    price: 12999,
    image: '/mobiles/nokia-c210.png',
    brand: 'Nokia',
  },
  {
    id: 11,
    name: 'Nokia 105 4G',
    price: 5999,
    image: '/mobiles/nokia-105-4g.png',
    brand: 'Nokia',
  },
  {
    id: 12,
    name: 'Nokia 110 4G',
    price: 7999,
    image: '/mobiles/nokia-110-4g.png',
    brand: 'Nokia',
  },
];

export default function NokiaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-6 py-4">
        <h1 className="text-3xl font-bold  text-gray-800  text-center mb-6">
          Nokia Mobiles
        </h1>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-5">
          {nokiaMobiles.map((mobile) => (
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