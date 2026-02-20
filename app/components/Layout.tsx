 // components/Layout.tsx
'use client';

import Header from './Header';
import Sidebar from './Sidebar';
import BrandBar from './BrandBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar sirf desktop par */}
      <Sidebar />
      <Header />
      <BrandBar />
      
      <main className="mt-[124px] md:mt-[73px] md:ml-20 p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}