"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, X, CheckCircle, AlertCircle, Loader2, Tag } from "lucide-react";

export default function AddCategoryPage() {
  const router = useRouter();

  const [name, setName]           = useState("");
  const [slug, setSlug]           = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-generate slug from name
  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(val.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
  };

  // Image select
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError(null);
  };

  // Upload image to Cloudinary
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );
    if (!res.ok) throw new Error("Image upload failed");
    const data = await res.json();
    return data.secure_url;
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError("Category name is required"); return; }

    setSubmitting(true);
    setError(null);

    try {
      let imageUrl = "";

      if (imageFile) {
        setUploading(true);
        imageUrl = await uploadImage(imageFile);
        setUploading(false);
      }

      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), slug, image: imageUrl }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to add category");

      setSuccess(true);
      setTimeout(() => router.push("/admin/all-categories"), 1500);
    } catch (err: any) {
      setError(err.message);
      setUploading(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

        {/* Form Header */}
        <div className="px-8 py-5 border-b border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 bg-yellow-50 rounded-lg flex items-center justify-center">
            <Tag className="w-5 h-5 text-yellow-500" />
          </div>
          <div>
            <p className="font-bold text-gray-800 text-sm">New Category</p>
            <p className="text-xs text-gray-400">Brand / Category details</p>
          </div>
        </div>

        <div className="p-8 space-y-6">

          {/* Success */}
          {success && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <p className="text-sm text-emerald-700 font-medium">Category added! Redirecting…</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
              Category Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Apple, Samsung, Intel…"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all"
            />
          </div>

          {/* Slug (auto + editable) */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
              Slug <span className="text-gray-400 font-normal normal-case">(auto-generated)</span>
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#1e3a8a]/20 focus-within:border-[#1e3a8a] transition-all">
              <span className="px-3 py-2.5 bg-gray-50 border-r border-gray-200 text-xs text-gray-400 font-mono select-none">
                /
              </span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="apple"
                className="flex-1 px-3 py-2.5 text-sm text-gray-700 font-mono focus:outline-none bg-white"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">This will be the brand page URL: /{slug || "brand-name"}</p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
              Brand Logo / Image
            </label>

            {imagePreview ? (
              <div className="relative w-full h-44 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden group">
                <Image src={imagePreview} alt="preview" fill className="object-contain p-4" />
                <button
                  type="button"
                  onClick={() => { setImageFile(null); setImagePreview(""); }}
                  className="absolute top-2 right-2 w-7 h-7 bg-white border border-gray-200 rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:border-red-200 hover:text-red-500"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-44 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-yellow-400 hover:bg-yellow-50/40 transition-all group"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
                  <Upload className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 transition-colors" />
                </div>
                <p className="text-sm text-gray-400 group-hover:text-yellow-600 transition-colors font-medium">
                  Click to upload logo
                </p>
                <p className="text-xs text-gray-300">PNG, JPG up to 5MB</p>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="px-8 py-5 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50">
          <button
            type="button"
            onClick={() => router.push("/admin/all-categories")}
            className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting || success}
            className="px-6 py-2.5 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-sm shadow-sm disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {(submitting || uploading) && <Loader2 className="w-4 h-4 animate-spin" />}
            {uploading ? "Uploading image…" : submitting ? "Saving…" : "Add Category"}
          </button>
        </div>
      </form>
    </div>
  );
}