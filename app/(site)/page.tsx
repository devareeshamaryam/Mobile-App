 import LatestMobilesSection from '../components/LatestMobilesSection';
import PriceAbove50kSection from '../components/PriceAbove50kSection';
import Price40to50kSection from '../components/Price40to50kSection';
import DiscoverMoreResponsive from '../components/Discovermoreresponsive';
import Price30to40kSection from '../components/Price30to40ksection';
import Price20to30kSection from '../components/Price20to30ksection';
import Price10to20kSection from '../components/Price10to20ksection';
import { connectDB } from '@/lib/mongodb';
import Mobile from '@/models/Mobile';

// Helper: MongoDB doc → component-friendly object
function toCard(m: any) {
  return {
    id:    m._id.toString(),
    name:  m.name,
    price: m.price,
    image: m.images?.[0] ?? '/placeholder.png',
    brand: m.brand,
  };
}

export default async function Home() {
  await connectDB();

  // Fetch all price ranges in parallel
  const [
    latestRaw,
    above50kRaw,
    p40to50kRaw,
    p30to40kRaw,
    p20to30kRaw,
    p10to20kRaw,
  ] = await Promise.all([
    Mobile.find({}).sort({ createdAt: -1 }).limit(20).lean(),
    Mobile.find({ price: { $gte: 50000 } }).sort({ createdAt: -1 }).limit(20).lean(),
    Mobile.find({ price: { $gte: 40000, $lt: 50000 } }).sort({ createdAt: -1 }).limit(20).lean(),
    Mobile.find({ price: { $gte: 30000, $lt: 40000 } }).sort({ createdAt: -1 }).limit(20).lean(),
    Mobile.find({ price: { $gte: 20000, $lt: 30000 } }).sort({ createdAt: -1 }).limit(20).lean(),
    Mobile.find({ price: { $gte: 10000, $lt: 20000 } }).sort({ createdAt: -1 }).limit(20).lean(),
  ]);

  const latestMobiles  = latestRaw.map(toCard);
  const above50kMobiles = above50kRaw.map(toCard);
  const between40to50k = p40to50kRaw.map(toCard);
  const between30to40k = p30to40kRaw.map(toCard);
  const between20to30k = p20to30kRaw.map(toCard);
  const between10to20k = p10to20kRaw.map(toCard);

  return (
    <>
      {/* Latest Mobiles */}
      <LatestMobilesSection mobiles={latestMobiles} />

      {/* Above 50k */}
      <PriceAbove50kSection mobiles={above50kMobiles} />

      {/* 40k - 50k */}
      <Price40to50kSection mobiles={between40to50k} />

      <DiscoverMoreResponsive />

      {/* 30k - 40k */}
      <Price30to40kSection mobiles={between30to40k} />

      {/* 20k - 30k */}
      <Price20to30kSection mobiles={between20to30k} />

      {/* 10k - 20k */}
      <Price10to20kSection mobiles={between10to20k} />
    </>
  );
}