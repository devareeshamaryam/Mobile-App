 import MobileCard from '@/app/components/MobileCard';
import { connectDB } from '@/lib/mongodb';
import Mobile from '@/models/Mobile';

export default async function VivoPage() {
  await connectDB();
  const mobiles = await Mobile.find({ brandSlug: 'vivo' })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-6 py-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Vivo Mobiles
        </h1>

        {mobiles.length === 0 ? (
          <p className="text-center text-gray-400 mt-20">Abhi koi mobile available nahi hai.</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-5">
            {mobiles.map((mobile: any) => (
              <MobileCard
                key={mobile._id.toString()}
                id={mobile._id.toString()}
                name={mobile.name}
                price={mobile.price}
                image={mobile.images?.[0] ?? '/placeholder.png'}
                brand={mobile.brand}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}