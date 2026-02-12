 'use client';

import Image from 'next/image';
import Link from 'next/link';

interface MobileCardProps {
  id: number;
  image: string;
  name: string;
  price: number;
  brand: string;
}

export default function MobileCard({ id, image, name, price, brand }: MobileCardProps) {
  return (
    <Link href={`/mobile/${id}`}>
      <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-900 w-36">
        
        {/* Mobile Image - Square */}
        <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-2">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Card Content */}
        <div className="px-2 py-1.5">
          <h3 className="font-medium text-gray-800 text-xs mb-1 line-clamp-2 leading-tight group-hover:text-blue-900 transition-colors duration-300">
            {name}
          </h3>
          <span className="text-blue-600 font-bold text-xs group-hover:text-blue-900 transition-colors duration-300">
            Rs. {price.toLocaleString()}
          </span>
        </div>

        {/* Bottom Accent Bar */}
        <div className="h-0.5 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 group-hover:h-1 transition-all duration-300"></div>
      </div>
    </Link>
  );
}