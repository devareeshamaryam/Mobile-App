// app/admin/add-mobile/page.tsx

'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface Brand {
  _id: string
  name: string
}

export default function AddMobilePage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({
    name: '',
    brand: '',
    price: '',
    ram: '4GB',
    storage: '64GB',
    status: 'active',
    description: '',
  })

  useEffect(() => {
    fetch('/api/admin/brands')
      .then((r) => r.json())
      .then((d) => { if (d.success) setBrands(d.data) })
  }, [])

  const set = (key: string, val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.brand || !form.price) {
      setError('Name, Brand aur Price required hain')
      return
    }
    setLoading(true)
    setError('')
    setSuccess('')

    const res = await fetch('/api/admin/mobiles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: Number(form.price) }),
    })
    const data = await res.json()
    setLoading(false)

    if (data.success) {
      setSuccess('✅ Mobile successfully add ho gaya!')
      setForm({ name: '', brand: '', price: '', ram: '4GB', storage: '64GB', status: 'active', description: '' })
    } else {
      setError(data.message || 'Kuch error hua')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Topbar */}
      <div className="bg-white border-b border-gray-200 px-8 h-14 flex items-center gap-3">
        <Link href="/admin" className="text-gray-400 hover:text-gray-600 transition">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-base font-semibold text-gray-800">Add New Mobile</h1>
      </div>

      {/* Form */}
      <div className="p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-5">

          {/* Mobile Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Mobile Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="e.g. Samsung Galaxy A06"
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* Brand */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Brand <span className="text-red-500">*</span>
            </label>
            <select
              value={form.brand}
              onChange={(e) => set('brand', e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white"
            >
              <option value="">Brand select karo...</option>
              {brands.map((b) => (
                <option key={b._id} value={b._id}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Price + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Price (PKR) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
                placeholder="e.g. 18999"
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</label>
              <select
                value={form.status}
                onChange={(e) => set('status', e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* RAM + Storage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">RAM</label>
              <select
                value={form.ram}
                onChange={(e) => set('ram', e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white"
              >
                {['2GB', '3GB', '4GB', '6GB', '8GB', '12GB', '16GB'].map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Storage</label>
              <select
                value={form.storage}
                onChange={(e) => set('storage', e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white"
              >
                {['32GB', '64GB', '128GB', '256GB', '512GB'].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={4}
              placeholder="Mobile ki specs, features..."
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none"
            />
          </div>

          {/* Messages */}
          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
          )}
          {success && (
            <p className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2">{success}</p>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <Link
              href="/admin/view-mobiles"
              className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? 'Saving...' : 'Save Mobile'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}