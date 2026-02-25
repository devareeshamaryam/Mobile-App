 'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Smartphone } from 'lucide-react';
import type { Phone } from '@/lib/allPhones';
import DiscoverMoreResponsive from './Discovermoreresponsive';

export default function MobileDetailPage({ phone }: { phone: Phone }) {
  const [activeImg, setActiveImg] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);

  const images = phone.images && phone.images.length > 0
    ? phone.images
    : phone.image
    ? [phone.image]
    : [];

  const specs = phone.specs ?? {};
  const categories = Object.keys(specs);
  const brandSlug = phone.brand.toLowerCase();

  // ✅ FIX: variants exist kare, empty na ho, aur us index pe item bhi ho
  const displayPrice =
    phone.variants && phone.variants.length > 0 && phone.variants[selectedVariant]
      ? phone.variants[selectedVariant].price
      : phone.price ?? 0;

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `${phone.name} - Rs. ${displayPrice.toLocaleString('en-PK')} - Check price & specs!`;

  const shareLinks = [
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + pageUrl)}`,
      bg: 'bg-green-500 hover:bg-green-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.112 1.523 5.84L.057 23.886a.5.5 0 0 0 .611.61l6.101-1.458A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.878 9.878 0 0 1-5.031-1.378l-.36-.214-3.733.892.924-3.644-.235-.374A9.861 9.861 0 0 1 2.1 12C2.1 6.534 6.534 2.1 12 2.1c5.465 0 9.9 4.434 9.9 9.9 0 5.465-4.435 9.9-9.9 9.9z"/>
        </svg>
      ),
    },
    {
      name: 'X',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`,
      bg: 'bg-black hover:bg-gray-800',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
      bg: 'bg-blue-600 hover:bg-blue-700',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`,
      bg: 'bg-sky-500 hover:bg-sky-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(phone.name)}`,
      bg: 'bg-blue-700 hover:bg-blue-800',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-gray-500 flex-wrap">
          <Link href="/" className="hover:text-[#1e3a8a]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/${brandSlug}`} className="hover:text-[#1e3a8a]">{phone.brand}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1e3a8a] font-semibold">{phone.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 md:px-6 py-6">

        {/* ── TOP CARD ── */}
        <div className="bg-white rounded-xl shadow-sm mb-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Image with arrows always visible */}
            <div className="flex flex-col items-center justify-center relative min-h-[340px]">

              {/* Left Arrow */}
              <button
                onClick={() => setActiveImg(i => i === 0 ? images.length - 1 : i - 1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full shadow flex items-center justify-center hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] transition-all z-10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Image */}
              {images[activeImg] ? (
                <div className="relative w-52 h-72">
                  <Image src={images[activeImg]} alt={phone.name} fill className="object-contain" priority />
                </div>
              ) : (
                <div className="w-52 h-72 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-20 h-20 text-gray-300" />
                </div>
              )}

              {/* Right Arrow */}
              <button
                onClick={() => setActiveImg(i => i === images.length - 1 ? 0 : i + 1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full shadow flex items-center justify-center hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] transition-all z-10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dots */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-4">
                  {images.map((_, i) => (
                    <button key={i} onClick={() => setActiveImg(i)}
                      className={`rounded-full transition-all ${i === activeImg ? 'w-5 h-2 bg-[#1e3a8a]' : 'w-2 h-2 bg-gray-300'}`} />
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{phone.name}</h1>

              {/* Price */}
              <div className="mb-1">
                <p className="text-sm text-gray-500 font-medium mb-1">Price</p>
                <p className="text-3xl font-bold text-[#1e3a8a]">
                  Rs. {displayPrice.toLocaleString('en-PK')}
                </p>
              </div>

              {/* Variants */}
              {phone.variants && phone.variants.length > 0 && (
                <div className="mt-5 mb-4">
                  <p className="text-sm text-gray-500 font-medium mb-2">Variants Price</p>
                  <div className="flex flex-col gap-2">
                    {phone.variants.slice(0, 1).map((v, i) => (
                      <div
                        key={i}
                        className="inline-flex items-center gap-6 px-4 py-2.5 rounded-lg border border-[#1e3a8a] bg-blue-50 text-sm font-medium w-fit"
                      >
                        <span className="text-[#1e3a8a] font-semibold">{v.label}</span>
                        <span className="text-gray-800 font-bold">
                          RS. {v.price.toLocaleString('en-PK')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── SPECIFICATIONS ── */}
        {categories.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <h2 className="text-xl font-bold text-gray-800 text-center py-5 border-b border-gray-100">
              Specifications
            </h2>
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {categories.map((cat) => (
                  <div key={cat} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 text-center">
                      <h3 className="text-sm font-bold text-[#1e3a8a]">{cat}</h3>
                    </div>
                    <table className="w-full text-sm">
                      <tbody>
                        {Object.entries(specs[cat]).map(([key, val], idx) => (
                          <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-4 py-2.5 text-gray-400 font-medium w-2/5 align-top">{key}</td>
                            <td className="px-4 py-2.5 text-gray-800 align-top">{val as string}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── SOCIAL SHARE ── */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-base font-bold text-[#1e3a8a] text-center mb-4">Social Share</h3>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {shareLinks.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${s.bg}`}
                title={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── DISCOVER MORE ── */}
        <DiscoverMoreResponsive />

        {/* Back */}
        <div className="flex justify-center">
          <Link href={`/${brandSlug}`} className="flex items-center gap-1.5 text-sm text-[#1e3a8a] font-semibold hover:underline">
            <ChevronLeft className="w-4 h-4" />
            Back to {phone.brand} Mobiles
          </Link>
        </div>

      </div>
    </div>
  );
}