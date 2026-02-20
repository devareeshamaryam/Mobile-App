 'use client';

import React from 'react';
import MobileCard from '../components/MobileCard';

const samsungMobiles = [
  { id: 1, name: 'Samsung Galaxy S24 FE', price: 206999, image: '/mobiles/samsung-s24-fe.png', brand: 'Samsung' },
  { id: 2, name: 'Samsung Galaxy A06', price: 26999, image: '/mobiles/samsung-a06.png', brand: 'Samsung' },
  { id: 3, name: 'Samsung Galaxy Z Flip 6 5G', price: 384999, image: '/mobiles/samsung-z-flip-6.png', brand: 'Samsung' },
  { id: 4, name: 'Samsung Galaxy Z Fold 6 5G', price: 604999, image: '/mobiles/samsung-z-fold-6.png', brand: 'Samsung' },
  { id: 5, name: 'Samsung Galaxy A16', price: 45999, image: '/mobiles/samsung-a16.png', brand: 'Samsung' },
  { id: 6, name: 'Samsung Galaxy S23 FE', price: 189999, image: '/mobiles/samsung-s23-fe.png', brand: 'Samsung' },
  { id: 7, name: 'Samsung Galaxy A55', price: 119999, image: '/mobiles/samsung-a55.png', brand: 'Samsung' },
  { id: 8, name: 'Samsung Galaxy A35', price: 89999, image: '/mobiles/samsung-a35.png', brand: 'Samsung' },
  { id: 9, name: 'Samsung Galaxy S24 Ultra', price: 429999, image: '/mobiles/samsung-s24-ultra.png', brand: 'Samsung' },
  { id: 10, name: 'Samsung Galaxy A25', price: 64999, image: '/mobiles/samsung-a25.png', brand: 'Samsung' },
  { id: 11, name: 'Samsung Galaxy M35', price: 74999, image: '/mobiles/samsung-m35.png', brand: 'Samsung' },
  { id: 12, name: 'Samsung Galaxy A15', price: 39999, image: '/mobiles/samsung-a15.png', brand: 'Samsung' },
];

export default function SamsungPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-3 sm:px-6 py-4">

        {/* Page Title */}
        <h1 className="text-xl sm:text-3xl font-bold text-gray-800 text-center mb-4 sm:mb-6">
          Samsung Mobiles
        </h1>

        {/* 
          Mobile:  2 columns  (achha readable size)
          Tablet:  3-4 columns
          Desktop: 5-7 columns
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-5">
          {samsungMobiles.map((mobile) => (
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