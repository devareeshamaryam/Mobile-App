 'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { X, Search, Smartphone, ChevronRight } from 'lucide-react';

interface Phone {
  _id: string;
  name: string;
  brand: string;
  brandSlug?: string;
  price: number;
  images?: string[];
  variants?: { label: string; price: number }[];
  specs?: Record<string, Record<string, string>>;
}

const MAX_PHONES = 4;

// ── Safely parse specs from Mongoose lean() response ──────────────────────────
function normalizeSpecs(specs: any): Record<string, Record<string, string>> {
  if (!specs || typeof specs !== 'object') return {};
  try {
    return JSON.parse(JSON.stringify(specs));
  } catch {
    return {};
  }
}

function buildSpecMatrix(phones: Phone[]) {
  const categoryMap: Record<string, Set<string>> = {};
  phones.forEach((p) => {
    const specs = normalizeSpecs(p.specs);
    Object.entries(specs).forEach(([cat, rows]) => {
      if (typeof rows !== 'object' || !rows) return;
      if (!categoryMap[cat]) categoryMap[cat] = new Set();
      Object.keys(rows).forEach((k) => categoryMap[cat].add(k));
    });
  });
  return categoryMap;
}

// ── Fetch full phone by ID (includes specs) ───────────────────────────────────
async function fetchFullPhone(id: string): Promise<Phone | null> {
  try {
    const res = await fetch(`/api/mobiles/${id}`);
    if (!res.ok) return null;
    return await res.json(); // existing route returns mobile directly
  } catch {
    return null;
  }
}

// ── SEARCH DROPDOWN ────────────────────────────────────────────────────────────
function PhoneSearchBox({ onSelect, excludeIds }: {
  onSelect: (phone: Phone) => void;
  excludeIds: string[];
}) {
  const [query, setQuery]     = useState('');
  const [results, setResults] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res  = await fetch(`/api/mobiles/search?q=${encodeURIComponent(query)}&limit=8`);
        const data = await res.json();
        setResults((data.phones ?? []).filter((p: Phone) => !excludeIds.includes(p._id)));
      } catch { setResults([]); }
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [query, excludeIds]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setResults([]);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ── When user clicks a search result, fetch FULL data (with specs) ──────────
  async function handleSelect(p: Phone) {
    setQuery('');
    setResults([]);
    setLoading(true);
    const full = await fetchFullPhone(p._id);
    setLoading(false);
    onSelect(full ?? p);
  }

  return (
    <div ref={ref} className="relative w-full">
      <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 bg-white focus-within:border-[#1e3a8a] transition-colors">
        <Search className="w-4 h-4 text-gray-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Mobile..."
          className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"
        />
        {loading && <div className="w-3.5 h-3.5 border-2 border-[#1e3a8a] border-t-transparent rounded-full animate-spin shrink-0" />}
      </div>

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {results.map((p) => (
            <button
              key={p._id}
              onClick={() => handleSelect(p)}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-blue-50 transition-colors text-left"
            >
              {p.images?.[0] ? (
                <div className="relative w-8 h-10 shrink-0">
                  <Image src={p.images[0]} alt={p.name} fill className="object-contain" />
                </div>
              ) : (
                <Smartphone className="w-8 h-8 text-gray-300 shrink-0" />
              )}
              <div>
                <p className="text-sm font-semibold text-gray-800">{p.name}</p>
                <p className="text-xs text-[#1e3a8a] font-medium">
                  Rs. {(p.variants?.[0]?.price ?? p.price ?? 0).toLocaleString('en-PK')}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── PHONE CARD ─────────────────────────────────────────────────────────────────
function PhoneCard({ phone, onRemove, onSelect, excludeIds }: {
  phone: Phone | null;
  onRemove: () => void;
  onSelect: (p: Phone) => void;
  excludeIds: string[];
}) {
  if (!phone) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 p-4 min-h-[220px]">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Enter Model to compare</p>
        <PhoneSearchBox onSelect={onSelect} excludeIds={excludeIds} />
      </div>
    );
  }

  const price = phone.variants?.[0]?.price ?? phone.price ?? 0;
  const image = phone.images?.[0];

  return (
    <div className="flex flex-col items-center gap-2 p-4 relative">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 transition-colors"
      >
        <X className="w-3.5 h-3.5 text-red-500" />
      </button>
      {image ? (
        <div className="relative w-24 h-32 mt-2">
          <Image src={image} alt={phone.name} fill className="object-contain" />
        </div>
      ) : (
        <div className="w-24 h-32 bg-gray-100 rounded-xl flex items-center justify-center mt-2">
          <Smartphone className="w-10 h-10 text-gray-300" />
        </div>
      )}
      <p className="text-sm font-bold text-gray-800 text-center leading-tight">{phone.name}</p>
      <p className="text-sm font-bold text-[#1e3a8a]">Rs. {price.toLocaleString('en-PK')}</p>
    </div>
  );
}

// ── MAIN CONTENT ───────────────────────────────────────────────────────────────
function CompareContent() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const [phones, setPhones]             = useState<(Phone | null)[]>([null, null, null, null]);
  const [loadingSlots, setLoadingSlots] = useState<boolean[]>([false, false, false, false]);

  // Load phones from URL params on mount — full data including specs
  useEffect(() => {
    const ids = [
      searchParams.get('mobile1'),
      searchParams.get('mobile2'),
      searchParams.get('mobile3'),
      searchParams.get('mobile4'),
    ];
    ids.forEach(async (id, i) => {
      if (!id) return;
      setLoadingSlots((prev) => { const n = [...prev]; n[i] = true; return n; });
      const phone = await fetchFullPhone(id);
      if (phone) {
        setPhones((prev) => { const n = [...prev]; n[i] = phone; return n; });
      }
      setLoadingSlots((prev) => { const n = [...prev]; n[i] = false; return n; });
    });
  }, []);

  function updateUrl(updated: (Phone | null)[]) {
    const params = new URLSearchParams();
    updated.forEach((p, i) => { if (p) params.set(`mobile${i + 1}`, p._id); });
    router.replace(`/compare?${params.toString()}`, { scroll: false });
  }

  function handleSelect(index: number, phone: Phone) {
    const updated = [...phones];
    updated[index] = phone;
    setPhones(updated);
    updateUrl(updated);
  }

  function handleRemove(index: number) {
    const updated = phones.filter((_, i) => i !== index);
    while (updated.length < MAX_PHONES) updated.push(null);
    setPhones(updated);
    updateUrl(updated);
  }

  const activePhones  = phones.filter(Boolean) as Phone[];
  const activeCount   = activePhones.length;
  const visibleCount  = Math.min(MAX_PHONES, Math.max(2, activeCount + 1));
  const visiblePhones = phones.slice(0, visibleCount);
  const excludeIds    = activePhones.map((p) => p._id);

  const categoryMap = buildSpecMatrix(activePhones);
  const categories  = Object.keys(categoryMap);
  const gridCols    = ['', '', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4'][visibleCount] ?? 'grid-cols-2';

  return (
    <div className="max-w-6xl mx-auto px-3 md:px-6 py-6">

      <h1 className="text-xl md:text-2xl font-bold text-[#1e3a8a] text-center mb-6 flex items-center justify-center gap-2">
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-[#1e3a8a] stroke-2">
          <rect x="2" y="3" width="8" height="18" rx="1.5"/>
          <rect x="14" y="3" width="8" height="18" rx="1.5"/>
        </svg>
        Mobiles Comparison
      </h1>

      {/* ── PHONE CARDS ── */}
      <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
        <div className={`grid ${gridCols} divide-x divide-gray-100`}>
          {visiblePhones.map((phone, i) => (
            <div key={i} className="min-w-0">
              {loadingSlots[i] ? (
                <div className="flex items-center justify-center min-h-[220px]">
                  <div className="w-8 h-8 border-2 border-[#1e3a8a] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <PhoneCard
                  phone={phone}
                  onRemove={() => handleRemove(i)}
                  onSelect={(p) => handleSelect(i, p)}
                  excludeIds={excludeIds}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── SPECS COMPARISON ── */}
      {categories.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {categories.map((cat) => {
            const keys = Array.from(categoryMap[cat]);
            return (
              <div key={cat}>
                {/* Category header */}
                <div className="px-4 py-3 bg-gray-50 border-y border-gray-100">
                  <h2 className="text-sm font-bold text-[#1e3a8a] italic">{cat}</h2>
                </div>

                {/* Spec key row (centered label) */}
                {keys.map((key, idx) => (
                  <div key={key}>
                    {/* Key label centered */}
                    <div className="text-center py-1.5 border-b border-gray-50 bg-gray-50/30">
                      <span className="text-xs text-gray-400 font-medium">{key}</span>
                    </div>
                    {/* Values row */}
                    <div className={`grid ${gridCols} divide-x divide-gray-100 border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}>
                      {visiblePhones.map((phone, i) => {
                        const specs = normalizeSpecs(phone?.specs);
                        const val   = specs[cat]?.[key];
                        return (
                          <div key={i} className="px-4 py-2.5 min-w-0">
                            <p className={`text-xs md:text-sm leading-snug ${val ? 'text-gray-800 font-medium' : 'text-gray-300'}`}>
                              {val ?? '—'}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {/* ── EMPTY STATE ── */}
      {categories.length === 0 && activeCount === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Smartphone className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 text-sm font-medium">Search for phones above to start comparing</p>
        </div>
      )}

      {/* No specs message */}
      {categories.length === 0 && activeCount > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-400 text-sm font-medium">No specs available for selected phones</p>
        </div>
      )}
    </div>
  );
}

// ── PAGE EXPORT ────────────────────────────────────────────────────────────────
export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b border-gray-200 px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-gray-500 flex-wrap">
          <Link href="/" className="hover:text-[#1e3a8a]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1e3a8a] font-semibold">Compare Mobiles</span>
        </div>
      </div>

      <Suspense fallback={
        <div className="flex items-center justify-center py-24">
          <div className="w-10 h-10 border-2 border-[#1e3a8a] border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <CompareContent />
      </Suspense>
    </div>
  );
}