 import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Smartphone } from "lucide-react";
import MobileCard from "@/app/components/MobileCard"; // ← Sirf ye add hua

// ── Types ──────────────────────────────────────────────────────────────────────
interface Phone {
  _id: string;
  name: string;
  brand: string;
  brandSlug: string;
  price: number;
  priceRange?: string;
  images?: string[];
  image?: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

interface Props {
  params: Promise<{ brand: string }>;
}

// ── Base URL helper ────────────────────────────────────────────────────────────
function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL)           return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

// ── Data fetchers ──────────────────────────────────────────────────────────────
async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/categories`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const categories: Category[] = await res.json();
    return categories.find((c) => c.slug === slug) ?? null;
  } catch {
    return null;
  }
}

async function getPhonesByBrand(brandSlug: string): Promise<Phone[]> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/mobiles?brand=${brandSlug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

// ── Metadata ───────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props) {
  const { brand } = await params;
  const category  = await getCategoryBySlug(brand);
  if (!category) return { title: "Brand Not Found" };
  return {
    title:       `${category.name} Mobile Prices in Pakistan 2026 — Hafeez Centre`,
    description: `Latest ${category.name} mobile prices in Pakistan. Compare specs and prices.`,
  };
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default async function BrandPage({ params }: Props) {
  const { brand }  = await params;
  const category   = await getCategoryBySlug(brand);

  if (!category) notFound();

  const phones = await getPhonesByBrand(brand);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-200 px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-gray-500 flex-wrap">
          <Link href="/" className="hover:text-[#1e3a8a]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1e3a8a] font-semibold">{category.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">

        {/* ── Brand Hero ── */}
        <div className="bg-white rounded-xl shadow-sm mb-6 px-6 py-5 flex items-center gap-5">
          {category.image ? (
            <div className="relative w-16 h-16 shrink-0">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-[#1e3a8a]">
                {category.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{category.name} Mobiles</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {phones.length > 0
                ? `${phones.length} mobile${phones.length > 1 ? "s" : ""} available`
                : "No mobiles listed yet"}
            </p>
          </div>
        </div>

        {/* ── Phones Grid ── */}
        {phones.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-16 flex flex-col items-center justify-center gap-3 text-gray-400">
            <Smartphone className="w-12 h-12 opacity-20" />
            <p className="text-sm font-medium">No {category.name} mobiles added yet.</p>
          </div>
        ) : (
          // ← Sirf yahan card replace hua, baaki sab same
 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0">            {phones.map((phone) => (
              <MobileCard
                key={phone._id}
                id={phone._id as any}
                name={phone.name}
                price={phone.price}
                image={phone.images?.[0] ?? phone.image ?? '/placeholder.png'}
                brand={phone.brandSlug}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}