// app/admin/view-mobiles/page.tsx

'use client'
import { useState, useEffect } from 'react'
import { Search, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Mobile {
  _id: string
  name: string
  brand: { name: string }
  price: number
  ram: string
  storage: string
  status: 'active' | 'inactive'
}

export default function ViewAllMobilesPage() {
  const [mobiles, setMobiles] = useState<Mobile[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const fetchMobiles = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/mobiles')
    const data = await res.json()
    if (data.success) setMobiles(data.data)
    setLoading(false)
  }

  useEffect(() => { fetchMobiles() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Is mobile ko delete karna chahte ho?')) return
    await fetch(`/api/admin/mobiles/${id}`, { method: 'DELETE' })
    fetchMobiles()
  }

  const filtered = mobiles.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Topbar */}
      <div className="bg-white border-b border-gray-200 px-8 h-14 flex items-center justify-between">
        <h1 className="text-base font-semibold text-gray-800">
          All Mobiles
          <span className="ml-2 text-xs text-gray-400 font-normal">({mobiles.length} total)</span>
        </h1>
        <Link
          href="/admin/add-mobile"
          className="flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Mobile
        </Link>
      </div>

      {/* Content */}
      <div className="p-8">

        {/* Search */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-64 mb-5">
          <Search size={14} className="text-gray-400 flex-shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search mobile..."
            className="text-sm outline-none text-gray-700 placeholder-gray-400 w-full"
          />
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Mobile</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Brand</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Price</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">RAM / Storage</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-sm text-gray-400">Loading...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-sm text-gray-400">Koi mobile nahi mila</td>
                </tr>
              ) : (
                filtered.map((mobile) => (
                  <tr key={mobile._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-5 py-3.5 text-sm font-medium text-gray-800">{mobile.name}</td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                        {mobile.brand?.name || '—'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-blue-600">
                      Rs. {mobile.price?.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-500">
                      {mobile.ram} / {mobile.storage}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                        mobile.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          mobile.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                        {mobile.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                          <Pencil size={12} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(mobile._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}