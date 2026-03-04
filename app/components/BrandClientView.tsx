 "use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import MobileCard from "@/app/components/MobileCard";

interface Phone {
  _id: string;
  name: string;
  brand: string;
  brandSlug: string;
  price: number;
  priceRange?: string;
  images?: string[];
  image?: string;
  specs?: {
    Memory?: { RAM?: string };
  };
  condition?: string;
}

interface Props {
  phones: Phone[];
  brandName: string;
}

// ── Price range buckets ────────────────────────────────────────────────────────
const PRICE_RANGES = [
  { label: "Under 20k",    min: 0,      max: 20000  },
  { label: "20k – 30k",   min: 20000,  max: 30000  },
  { label: "30k – 40k",   min: 30000,  max: 40000  },
  { label: "40k – 50k",   min: 40000,  max: 50000  },
  { label: "Above 50k",   min: 50000,  max: Infinity },
];

const SORT_OPTIONS = [
  { label: "Default",         value: "default"    },
  { label: "Price: Low → High", value: "price_asc"  },
  { label: "Price: High → Low", value: "price_desc" },
];

// ── Section wrapper ───────────────────────────────────────────────────────────
function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-gray-100 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{title}</p>
      {children}
    </div>
  );
}

// ── Checkbox row ──────────────────────────────────────────────────────────────
function CheckRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group py-0.5">
      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all
        ${checked ? "bg-[#1e3a8a] border-[#1e3a8a]" : "border-gray-300 group-hover:border-[#1e3a8a]"}`}
        onClick={onChange}>
        {checked && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
          <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>}
      </div>
      <span className={`text-sm transition-colors ${checked ? "text-[#1e3a8a] font-semibold" : "text-gray-600 group-hover:text-gray-900"}`}>
        {label}
      </span>
    </label>
  );
}

export default function BrandClientView({ phones, brandName }: Props) {
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedRAMs,        setSelectedRAMs        ] = useState<string[]>([]);
  const [selectedConditions,  setSelectedConditions  ] = useState<string[]>([]);
  const [sortBy,              setSortBy              ] = useState("default");
  const [sidebarOpen,         setSidebarOpen         ] = useState(false);

  // ── Derive unique RAM values from data ─────────────────────────────────────
  const availableRAMs = useMemo(() => {
    const rams = phones
      .map((p) => p.specs?.Memory?.RAM)
      .filter(Boolean) as string[];
    return [...new Set(rams)].sort();
  }, [phones]);

  // ── Derive unique conditions ───────────────────────────────────────────────
  const availableConditions = useMemo(() => {
    const conds = phones.map((p) => p.condition).filter(Boolean) as string[];
    return [...new Set(conds)];
  }, [phones]);

  // ── Toggle helpers ─────────────────────────────────────────────────────────
  const toggle = (arr: string[], val: string, set: (v: string[]) => void) =>
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  // ── Active filter count ────────────────────────────────────────────────────
  const activeCount =
    selectedPriceRanges.length + selectedRAMs.length + selectedConditions.length +
    (sortBy !== "default" ? 1 : 0);

  // ── Clear all ─────────────────────────────────────────────────────────────
  const clearAll = () => {
    setSelectedPriceRanges([]);
    setSelectedRAMs([]);
    setSelectedConditions([]);
    setSortBy("default");
  };

  // ── Filtered + sorted phones ───────────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = [...phones];

    // Price range filter
    if (selectedPriceRanges.length > 0) {
      result = result.filter((p) =>
        selectedPriceRanges.some((label) => {
          const range = PRICE_RANGES.find((r) => r.label === label);
          return range && p.price >= range.min && p.price < range.max;
        })
      );
    }

    // RAM filter
    if (selectedRAMs.length > 0) {
      result = result.filter((p) =>
        selectedRAMs.includes(p.specs?.Memory?.RAM ?? "")
      );
    }

    // Condition filter
    if (selectedConditions.length > 0) {
      result = result.filter((p) =>
        selectedConditions.includes(p.condition ?? "")
      );
    }

    // Sort
    if (sortBy === "price_asc")  result.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") result.sort((a, b) => b.price - a.price);

    return result;
  }, [phones, selectedPriceRanges, selectedRAMs, selectedConditions, sortBy]);

  // ── Sidebar content (shared between desktop + mobile) ──────────────────────
  const SidebarContent = () => (
    <div className="p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#1e3a8a]" />
          <span className="text-sm font-bold text-gray-800">Filters</span>
          {activeCount > 0 && (
            <span className="bg-[#1e3a8a] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-xs text-red-400 hover:text-red-600 font-semibold transition-colors">
            Clear all
          </button>
        )}
      </div>

      {/* Sort */}
      <FilterSection title="Sort By">
        <div className="flex flex-col gap-1">
          {SORT_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all
                  ${sortBy === opt.value ? "border-[#1e3a8a]" : "border-gray-300 group-hover:border-[#1e3a8a]"}`}
                onClick={() => setSortBy(opt.value)}
              >
                {sortBy === opt.value && <div className="w-2 h-2 rounded-full bg-[#1e3a8a]" />}
              </div>
              <span className={`text-sm transition-colors ${sortBy === opt.value ? "text-[#1e3a8a] font-semibold" : "text-gray-600"}`}>
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="flex flex-col gap-1">
          {PRICE_RANGES.map((r) => (
            <CheckRow
              key={r.label}
              label={r.label}
              checked={selectedPriceRanges.includes(r.label)}
              onChange={() => toggle(selectedPriceRanges, r.label, setSelectedPriceRanges)}
            />
          ))}
        </div>
      </FilterSection>

      {/* RAM */}
      {availableRAMs.length > 0 && (
        <FilterSection title="RAM">
          <div className="flex flex-col gap-1">
            {availableRAMs.map((ram) => (
              <CheckRow
                key={ram}
                label={ram}
                checked={selectedRAMs.includes(ram)}
                onChange={() => toggle(selectedRAMs, ram, setSelectedRAMs)}
              />
            ))}
          </div>
        </FilterSection>
      )}

      {/* Condition */}
      {availableConditions.length > 0 && (
        <FilterSection title="Condition">
          <div className="flex flex-col gap-1">
            {availableConditions.map((c) => (
              <CheckRow
                key={c}
                label={c}
                checked={selectedConditions.includes(c)}
                onChange={() => toggle(selectedConditions, c, setSelectedConditions)}
              />
            ))}
          </div>
        </FilterSection>
      )}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-start">

      {/* ── Phones Grid ───────────────────────────────────────────────────── */}
      <div className="w-full lg:min-w-0">
        {/* Mobile filter button */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <p className="text-sm text-gray-500">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 text-sm font-semibold text-[#1e3a8a] border border-[#1e3a8a] rounded-lg px-3 py-1.5 hover:bg-blue-50 transition"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters {activeCount > 0 && `(${activeCount})`}
          </button>
        </div>

        {/* Result count — desktop */}
        <p className="hidden lg:block text-xs text-gray-400 mb-2 font-medium">
          {filtered.length} of {phones.length} mobiles
        </p>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-16 flex flex-col items-center justify-center gap-3 text-gray-400">
            <SlidersHorizontal className="w-10 h-10 opacity-20" />
            <p className="text-sm font-medium">No mobiles match your filters.</p>
            <button onClick={clearAll} className="text-xs text-[#1e3a8a] font-semibold underline">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {filtered.map((phone) => (
              <MobileCard
                key={phone._id}
                id={phone._id}
                name={phone.name}
                price={phone.price}
                image={phone.images?.[0] ?? phone.image ?? "/placeholder.png"}
                brand={phone.brand}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Right Sidebar — Desktop ────────────────────────────────────────── */}
      <aside className="hidden lg:block w-52 shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 self-start sticky top-4">
        <SidebarContent />
      </aside>

      {/* ── Right Sidebar — Mobile drawer ─────────────────────────────────── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className="font-bold text-gray-800">Filters</span>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <SidebarContent />
            <div className="p-5 border-t border-gray-100">
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-full bg-[#1e3a8a] text-white font-bold py-2.5 rounded-xl text-sm"
              >
                Show {filtered.length} results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}