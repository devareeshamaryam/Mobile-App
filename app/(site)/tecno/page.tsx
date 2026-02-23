'use client';

import React from 'react';
import MobileCard from '../components/MobileCard';

const tecnoMobiles = [
  {
    id: 1,
    name: 'Tecno Camon 30 Pro 5G',
    price: 79999,
    image: '/mobiles/tecno-camon30-pro-5g.png',
    brand: 'Tecno',
  },
  {
    id: 2,
    name: 'Tecno Camon 30 5G',
    price: 59999,
    image: '/mobiles/tecno-camon30-5g.png',
    brand: 'Tecno',
  },
  {
    id: 3,
    name: 'Tecno Camon 20 Pro',
    price: 54999,
    image: '/mobiles/tecno-camon20-pro.png',
    brand: 'Tecno',
  },
  {
    id: 4,
    name: 'Tecno Camon 20',
    price: 39999,
    image: '/mobiles/tecno-camon20.png',
    brand: 'Tecno',
  },
  {
    id: 5,
    name: 'Tecno Phantom X2 Pro',
    price: 149999,
    image: '/mobiles/tecno-phantom-x2-pro.png',
    brand: 'Tecno',
  },
  {
    id: 6,
    name: 'Tecno Phantom X2',
    price: 109999,
    image: '/mobiles/tecno-phantom-x2.png',
    brand: 'Tecno',
  },
  {
    id: 7,
    name: 'Tecno Pop 8',
    price: 19999,
    image: '/mobiles/tecno-pop8.png',
    brand: 'Tecno',
  },
  {
    id: 8,
    name: 'Tecno Pop 7 Pro',
    price: 17999,
    image: '/mobiles/tecno-pop7-pro.png',
    brand: 'Tecno',
  },
  {
    id: 9,
    name: 'Tecno Spark 20 Pro+',
    price: 44999,
    image: '/mobiles/tecno-spark20-pro-plus.png',
    brand: 'Tecno',
  },
  {
    id: 10,
    name: 'Tecno Spark 20 Pro',
    price: 34999,
    image: '/mobiles/tecno-spark20-pro.png',
    brand: 'Tecno',
  },
  {
    id: 11,
    name: 'Tecno Spark 20',
    price: 24999,
    image: '/mobiles/tecno-spark20.png',
    brand: 'Tecno',
  },
  {
    id: 12,
    name: 'Tecno Pova 6 Pro 5G',
    price: 69999,
    image: '/mobiles/tecno-pova6-pro-5g.png',
    brand: 'Tecno',
  },
];

export default function TecnoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-6 py-4">
        <h1 className="text-3xl font-bold   text-gray-800  text-center mb-6">
          Tecno Mobiles
        </h1>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-5">
          {tecnoMobiles.map((mobile) => (
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