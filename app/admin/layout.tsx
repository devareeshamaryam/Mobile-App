 // app/admin/layout.tsx

import Sidebar from "../components/admin/Sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-[220px] flex-1">
        {children}
      </main>
    </div>
  )
}