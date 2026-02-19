 import { notFound } from 'next/navigation';
import { getPhoneById, ALL_PHONES } from '@/lib/allPhones';
import MobileDetailPage from '@/app/components/Mobiledetailpage';

interface Props {
  params: Promise<{ id: string }>;  // ← Promise type
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;  // ← await karo
  const phone = getPhoneById(Number(id));
  if (!phone) return { title: 'Not Found' };
  return {
    title: `${phone.name} Price in Pakistan — Hafeez Centre`,
    description: `${phone.name} latest price in Pakistan is Rs. ${phone.price.toLocaleString()}.`,
  };
}

export function generateStaticParams() {
  return ALL_PHONES.map((p) => ({ id: String(p.id) }));
}

export default async function PhonePage({ params }: Props) {
  const { id } = await params;  // ← await karo
  const phone = getPhoneById(Number(id));
  if (!phone) notFound();
  return <MobileDetailPage phone={phone!} />;
}