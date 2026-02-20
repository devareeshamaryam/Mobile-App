 // components/BrandBar.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

const brands = [
  { name: 'Samsung', logo: '/image.png' },
  { name: 'Vivo', logo: '/vivo (1).svg' },
  { name: 'Oppo', logo: '/oppo1.svg' },
  { name: 'Realme', logo: '/realme.svg' },
  { name: 'Apple', logo: '/apple(1).svg' },
  { name: 'Xiaomi', logo: '/xiaomi (1).svg' },
  { name: 'Infinix', logo: '/infinix (1).svg' },
  { name: 'Tecno', logo: '/tecno (1).svg' },
  { name: 'Nokia', logo: '/nokia (1).svg' },
];

const bgColors = [
  'bg-blue-50',
  'bg-blue-50',
  'bg-green-50',
  'bg-yellow-50',
  'bg-gray-100',
  'bg-orange-50',
  'bg-blue-50',
  'bg-blue-50',
  'bg-blue-50',
];

export default function BrandBar() {
  return (
    <div className="fixed top-[52px] left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-sm md:hidden">
      <div
        className="flex gap-3 px-3 py-2 overflow-x-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {brands.map((brand, index) => (
          <Link
            key={brand.name}
            href={`/${brand.name.toLowerCase()}`}
            className="flex flex-col items-center gap-1 flex-shrink-0"
          >
            {/* Circle — light bg taake logo clearly dike */}
            <div className={`w-12 h-12 rounded-full ${bgColors[index]} border border-gray-200 flex items-center justify-center shadow-sm`}>
              <Image
                src={brand.logo}
                alt={brand.name}
                width={32}
                height={32}
                className="object-contain"  
              />
            </div>
            <span className="text-[9px] text-gray-600 font-medium whitespace-nowrap">
              {brand.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}