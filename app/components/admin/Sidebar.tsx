 // components/admin/Sidebar.tsx

'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Plus, Smartphone } from 'lucide-react'

const navLinks = [
  { label: 'Add New Mobile', href: '/admin/add-mobile', icon: Plus },
  { label: 'View All Mobiles', href: '/admin/view-mobiles', icon: Smartphone },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[220px] min-h-screen bg-white border-r border-gray-200 flex flex-col fixed top-0 left-0 bottom-0 z-50">

      {/* Logo */}
      <div className="px-5 py-4 border-b border-gray-200 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          H
        </div>
        <div>
          <p className="text-sm font-bold text-gray-800 leading-tight">Hafeez Centre</p>
          <span className="text-xs text-gray-400">Admin Panel</span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-3 flex flex-col gap-1">
        {navLinks.map(({ label, href, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                ${active
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                }`}
            >
              <Icon size={16} className={active ? 'text-blue-600' : 'text-gray-400'} />
              {label}
            </Link>
          )
        })}
      </nav>

    </aside>
  )
}