 import MobileCard from '@/app/components/MobileCard';
import { connectDB } from '@/lib/mongodb';
import Mobile from '@/models/Mobile';

export default async function SamsungPage() {
  await connectDB();
  const mobiles = await Mobile.find({ brandSlug: 'samsung' })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-3 sm:px-6 py-4">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-800 text-center mb-4 sm:mb-6">
          Samsung Mobiles
        </h1>

        {mobiles.length === 0 ? (
          <p className="text-center text-gray-400 mt-20">Abhi koi mobile available nahi hai.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-5">
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