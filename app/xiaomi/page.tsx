'use client';

import React from 'react';
import MobileCard from '../components/MobileCard';

const xiaomiMobiles = [
  {
    id: 1,
    name: 'Xiaomi 14 Ultra',
    price: 449999,
    image: '/mobiles/xiaomi-14-ultra.png',
    brand: 'Xiaomi',
  },
  {
    id: 2,
    name: 'Xiaomi 14',
    price: 299999,
    image: '/mobiles/xiaomi-14.png',
    brand: 'Xiaomi',
  },
  {
    id: 3,
    name: 'Xiaomi 13T Pro',
    price: 229999,
    image: '/mobiles/xiaomi-13t-pro.png',
    brand: 'Xiaomi',
  },
  {
    id: 4,
    name: 'Xiaomi 13T',
    price: 179999,
    image: '/mobiles/xiaomi-13t.png',
    brand: 'Xiaomi',
  },
  {
    id: 5,
    name: 'Redmi Note 13 Pro+',
    price: 119999,
    image: '/mobiles/redmi-note13-pro-plus.png',
    brand: 'Xiaomi',
  },
  {
    id: 6,
    name: 'Redmi Note 13 Pro',
    price: 89999,
    image: '/mobiles/redmi-note13-pro.png',
    brand: 'Xiaomi',
  },
  {
    id: 7,
    name: 'Redmi Note 13',
    price: 59999,
    image: '/mobiles/redmi-note13.png',
    brand: 'Xiaomi',
  },
  {
    id: 8,
    name: 'Redmi 13C',
    price: 34999,
    image: '/mobiles/redmi-13c.png',
    brand: 'Xiaomi',
  },
  {
    id: 9,
    name: 'Redmi A3',
    price: 24999,
    image: '/mobiles/redmi-a3.png',
    brand: 'Xiaomi',
  },
  {
    id: 10,
    name: 'Xiaomi Poco X6 Pro',
    price: 109999,
    image: '/mobiles/poco-x6-pro.png',
    brand: 'Xiaomi',
  },
  {
    id: 11,
    name: 'Xiaomi Poco X6',
    price: 79999,
    image: '/mobiles/poco-x6.png',
    brand: 'Xiaomi',
  },
  {
    id: 12,
    name: 'Xiaomi Poco M6 Pro',
    price: 49999,
    image: '/mobiles/poco-m6-pro.png',
    brand: 'Xiaomi',
  },
];

export default function XiaomiPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-6 py-4">
        <h1 className="text-3xl font-bold   text-gray-800  text-center mb-6">
          Xiaomi Mobiles
        </h1>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-5">
          {xiaomiMobiles.map((mobile) => (
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