 import { notFound } from 'next/navigation';
import MobileDetailPage from '@/app/components/Mobiledetailpage';

interface Props {
  params: Promise<{ brand: string; id: string }>;
}

// ── Fetch helper ──────────────────────────────────────────────────────────────
async function getMobileById(id: string) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    const res = await fetch(`${baseUrl}/api/mobiles/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props) {
  const { brand, id } = await params;
  const phone = await getMobileById(id);

  if (!phone) return { title: 'Not Found' };

  return {
    title: `${phone.name} Price in Pakistan — Hafeez Centre`,
    description: `${phone.name} latest price in Pakistan is Rs. ${Number(phone.price).toLocaleString()}.`,
    alternates: {
      canonical: `https://zmobiles.pk/${brand}/${id}`,
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function PhonePage({ params }: Props) {
  const { id } = await params;
  const phone = await getMobileById(id);

  if (!phone) notFound();

  return <MobileDetailPage phone={phone} />;
}