 'use client';

import { useRef, useEffect, useState } from 'react';
import MobileCard from './MobileCard';

interface Mobile {
  id: number;
  image: string;
  name: string;
  price: number;
  brand: string;
}

interface PriceAbove50kSectionProps {
  mobiles: Mobile[];
}

export default function PriceAbove50kSection({ mobiles }: PriceAbove50kSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scroll = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: direction === 'right' ? 180 : -180, behavior: 'smooth' });
  };

  const startAutoScroll = () => {
    autoScrollRef.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      atEnd ? el.scrollTo({ left: 0, behavior: 'smooth' }) : el.scrollBy({ left: 160, behavior: 'smooth' });
    }, 2500);
  };

  useEffect(() => {
    startAutoScroll();
    return () => { if (autoScrollRef.current) clearInterval(autoScrollRef.current); };
  }, []);

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Mobile Phones price in Pakistan {'>'} Rs. 50,000</h2>
          <div className="h-0.5 w-16 bg-gradient-to-r from-blue-600 to-blue-900 rounded-full"></div>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => scroll('left')} disabled={!canScrollLeft}
            className="w-7 h-7 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:bg-blue-900 hover:text-white hover:border-blue-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={() => scroll('right')} disabled={!canScrollRight}
            className="w-7 h-7 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:bg-blue-900 hover:text-white hover:border-blue-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        onMouseEnter={() => { if (autoScrollRef.current) clearInterval(autoScrollRef.current); }}
        onMouseLeave={startAutoScroll}
        className="flex gap-3 overflow-x-auto pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {mobiles.map((mobile) => (
          <div key={mobile.id} className="flex-shrink-0">
            <MobileCard id={mobile.id} image={mobile.image} name={mobile.name} price={mobile.price} brand={mobile.brand} />
          </div>
        ))}
      </div>
    </section>
  );
}