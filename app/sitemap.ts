import { MetadataRoute } from "next";
import { connectDB } from "@/lib/mongodb";
import Mobile from "@/models/Mobile";
import Category from "@/models/Category";

export const revalidate = 3600; // har 1 ghante mein update

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://zmobiles.pk";

  await connectDB();

  // ── Mobiles fetch ──────────────────────────────────────────
  const mobiles = await Mobile.find({}, { brandSlug: 1, _id: 1, updatedAt: 1 }).lean();

  // ── Categories/Brands fetch ────────────────────────────────
  const categories = await Category.find({}, { slug: 1, updatedAt: 1 }).lean();

  // ── Static pages ──────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // ── Brand pages ───────────────────────────────────────────
  const brandPages: MetadataRoute.Sitemap = categories.map((cat: any) => ({
    url: `${base}/${cat.slug}`,
    lastModified: cat.updatedAt ?? new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // ── Mobile detail pages ───────────────────────────────────
  const mobilePages: MetadataRoute.Sitemap = mobiles.map((m: any) => ({
    url: `${base}/${m.brandSlug}/${m._id}`,
    lastModified: m.updatedAt ?? new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...brandPages, ...mobilePages];
}