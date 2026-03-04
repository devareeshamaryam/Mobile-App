"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus, Trash2, CheckCircle, ImagePlus, X, Loader2, ArrowLeft } from "lucide-react";

// ── Price range mapper ────────────────────────────────────────────────────────
function getPriceRange(price: number): string {
  if (price < 20000) return "10k-20k";
  if (price < 30000) return "20k-30k";
  if (price < 40000) return "30k-40k";
  if (price < 50000) return "40k-50k";
  return "above-50k";
}

// ── Upload image to Cloudinary ────────────────────────────────────────────────
async function uploadToCloudinary(file: File): Promise<string> {
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
}

// ── Reusable components ───────────────────────────────────────────────────────
const Input = ({ label, value, onChange, placeholder, type = "text", required = false }: any) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type} value={value} onChange={onChange}
      placeholder={placeholder} required={required}
      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-blue-100 transition placeholder-gray-300"
    />
  </div>
);

const Select = ({ label, value, onChange, options, required = false }: any) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      value={value} onChange={onChange} required={required}
      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-blue-100 transition bg-white"
    >
      <option value="">— Select —</option>
      {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-5">
    <div className="bg-gray-50 border-b border-gray-200 px-5 py-3">
      <h3 className="text-sm font-bold text-[#1e3a8a] uppercase tracking-wide">{title}</h3>
    </div>
    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

// ── Category type ─────────────────────────────────────────────────────────────
interface Category { _id: string; name: string; slug: string; }

// ── Form state type ───────────────────────────────────────────────────────────
const initForm = {
  name: "", brand: "", brandSlug: "", price: "",
  // existingImages: already-saved Cloudinary URLs
  existingImages: [] as string[],
  // newImageFiles: fresh files the user picks during edit
  newImageFiles: [] as File[],
  newImagePreviews: [] as string[],
  variants: [{ label: "", price: "" }],
  os: "", ui: "", sim: "", weight: "",
  cameraBack: "", cameraBackVideo: "", cameraFront: "",
  ram: "", rom: "", card: "",
  batteryCapacity: "", batteryCharging: "",
  displayTech: "", displaySize: "", displayResolution: "", displayExtras: "",
  chipset: "", cpu: "", gpu: "",
  net2g: "Yes", net3g: "Yes", net4g: "Yes", net5g: "No",
  wlan: "", bluetooth: "", usb: "", nfc: "No",
  fingerprint: "No", faceUnlock: "Yes", otherSensors: "",
  speaker: "", jack: "Yes",
};

export default function EditMobilePage() {
  const { id }   = useParams<{ id: string }>();
  const router   = useRouter();

  const [form, setForm]             = useState(initForm);
  const [categories, setCategories] = useState<Category[]>([]);
  const [fetching, setFetching]     = useState(true);   // loading mobile data
  const [saving, setSaving]         = useState(false);  // submit in progress
  const [success, setSuccess]       = useState(false);
  const [error, setError]           = useState("");
  const fileInputRef                = useRef<HTMLInputElement>(null);

  // ── 1. Load categories ──────────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => {});
  }, []);

  // ── 2. Load existing mobile and pre-fill form ───────────────────────────────
  useEffect(() => {
    if (!id) return;
    fetch(`/api/mobiles/${id}`)
      .then((r) => { if (!r.ok) throw new Error("Mobile not found"); return r.json(); })
      .then((mobile) => {
        const s = mobile.specs ?? {};
        setForm((f) => ({
          ...f,
          name:      mobile.name      ?? "",
          brand:     mobile.brand     ?? "",
          brandSlug: mobile.brandSlug ?? "",
          price:     String(mobile.price ?? ""),
          existingImages: mobile.images ?? [],
          variants: mobile.variants?.length
            ? mobile.variants.map((v: any) => ({ label: v.label ?? "", price: String(v.price ?? "") }))
            : [{ label: "", price: "" }],
          // Build
          os:     s.Build?.OS     ?? "",
          ui:     s.Build?.UI     ?? "",
          sim:    s.Build?.SIM    ?? "",
          weight: s.Build?.Weight ?? "",
          // Camera
          cameraBack:      s.Camera?.Back         ?? "",
          cameraBackVideo: s.Camera?.["Back Video"]?? "",
          cameraFront:     s.Camera?.Front        ?? "",
          // Memory
          ram:  s.Memory?.RAM  ?? "",
          rom:  s.Memory?.ROM  ?? "",
          card: s.Memory?.Card ?? "",
          // Battery
          batteryCapacity: s.Battery?.Capacity ?? "",
          batteryCharging: s.Battery?.Charging ?? "",
          // Display
          displayTech:       s.Display?.Technology  ?? "",
          displaySize:       s.Display?.Size        ?? "",
          displayResolution: s.Display?.Resolution  ?? "",
          displayExtras:     s.Display?.Extras      ?? "",
          // Processor
          chipset: s.Processor?.Chipset ?? "",
          cpu:     s.Processor?.CPU     ?? "",
          gpu:     s.Processor?.GPU     ?? "",
          // Network
          net2g: s.Network?.["2G"] ?? "Yes",
          net3g: s.Network?.["3G"] ?? "Yes",
          net4g: s.Network?.["4G"] ?? "Yes",
          net5g: s.Network?.["5G"] ?? "No",
          // Connectivity
          wlan:      s.Connectivity?.WLAN      ?? "",
          bluetooth: s.Connectivity?.Bluetooth ?? "",
          usb:       s.Connectivity?.USB       ?? "",
          nfc:       s.Connectivity?.NFC       ?? "No",
          // Sensors
          fingerprint:   s.Sensors?.Fingerprint       ?? "No",
          faceUnlock:    s.Sensors?.["Face Unlock"]   ?? "Yes",
          otherSensors:  s.Sensors?.["Other Sensors"] ?? "",
          // Sound
          speaker: s.Sound?.Speaker       ?? "",
          jack:    s.Sound?.["3.5mm Jack"] ?? "Yes",
        }));
        setFetching(false);
      })
      .catch((e) => { setError(e.message); setFetching(false); });
  }, [id]);

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const set = (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = categories.find((c) => c.name === e.target.value);
    setForm((f) => ({ ...f, brand: selected?.name ?? "", brandSlug: selected?.slug ?? "" }));
  };

  // Remove an already-saved image
  const removeExistingImage = (i: number) =>
    setForm((f) => ({ ...f, existingImages: f.existingImages.filter((_, idx) => idx !== i) }));

  // Add new image files
  const handleImageFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () =>
        setForm((f) => ({
          ...f,
          newImageFiles:    [...f.newImageFiles,    file],
          newImagePreviews: [...f.newImagePreviews, reader.result as string],
        }));
      reader.readAsDataURL(file);
    });
  };

  // Remove a newly added (not yet saved) image
  const removeNewImage = (i: number) =>
    setForm((f) => ({
      ...f,
      newImageFiles:    f.newImageFiles.filter((_, idx) => idx !== i),
      newImagePreviews: f.newImagePreviews.filter((_, idx) => idx !== i),
    }));

  // Variants
  const addVariant    = () => setForm((f) => ({ ...f, variants: [...f.variants, { label: "", price: "" }] }));
  const removeVariant = (i: number) => setForm((f) => ({ ...f, variants: f.variants.filter((_, idx) => idx !== i) }));
  const setVariant    = (i: number, key: "label" | "price", val: string) =>
    setForm((f) => { const v = [...f.variants]; v[i] = { ...v[i], [key]: val }; return { ...f, variants: v }; });

  // ── Submit ───────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      // Upload new images to Cloudinary
      const newUrls: string[] = [];
      for (const file of form.newImageFiles) {
        const url = await uploadToCloudinary(file);
        newUrls.push(url);
      }

      const price      = Number(form.price);
      const priceRange = getPriceRange(price);

      const body = {
        name:      form.name,
        brand:     form.brand,
        brandSlug: form.brandSlug,
        price,
        priceRange,
        // Merge: existing saved URLs + newly uploaded URLs
        images: [...form.existingImages, ...newUrls],
        variants: form.variants
          .filter((v) => v.label && v.price)
          .map((v) => ({ label: v.label, price: Number(v.price) })),
        specs: {
          Build:        { OS: form.os, UI: form.ui, SIM: form.sim, Weight: form.weight },
          Camera:       { Back: form.cameraBack, "Back Video": form.cameraBackVideo, Front: form.cameraFront },
          Memory:       { RAM: form.ram, ROM: form.rom, Card: form.card },
          Battery:      { Capacity: form.batteryCapacity, Charging: form.batteryCharging },
          Display:      { Technology: form.displayTech, Size: form.displaySize, Resolution: form.displayResolution, Extras: form.displayExtras },
          Processor:    { Chipset: form.chipset, CPU: form.cpu, GPU: form.gpu },
          Network:      { "2G": form.net2g, "3G": form.net3g, "4G": form.net4g, "5G": form.net5g },
          Connectivity: { WLAN: form.wlan, Bluetooth: form.bluetooth, USB: form.usb, NFC: form.nfc },
          Sensors:      { Fingerprint: form.fingerprint, "Face Unlock": form.faceUnlock, "Other Sensors": form.otherSensors },
          Sound:        { Speaker: form.speaker, "3.5mm Jack": form.jack },
        },
      };

      const res = await fetch(`/api/mobiles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Update failed, please try again");
      }

      setSuccess(true);
      setTimeout(() => router.push("/admin/all-mobiles"), 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Loading state ────────────────────────────────────────────────────────────
  if (fetching) return (
    <div className="flex items-center justify-center py-32 gap-3 text-gray-400">
      <Loader2 className="w-6 h-6 animate-spin" />
      <span className="text-sm font-medium">Loading mobile data…</span>
    </div>
  );

  const priceNum   = Number(form.price);
  const priceRange = form.price ? getPriceRange(priceNum) : null;
  const priceLabel: Record<string, string> = {
    "10k-20k": "Rs. 10,000 – 20,000", "20k-30k": "Rs. 20,000 – 30,000",
    "30k-40k": "Rs. 30,000 – 40,000", "40k-50k": "Rs. 40,000 – 50,000",
    "above-50k": "Rs. 50,000+",
  };

  const totalImages = form.existingImages.length + form.newImagePreviews.length;

  return (
    <form onSubmit={handleSubmit}>

      {/* ── Back button ── */}
      <button
        type="button"
        onClick={() => router.push("/admin/all-mobiles")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1e3a8a] mb-5 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Back to All Mobiles
      </button>

      {/* ── Page title ── */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800">Edit Mobile</h2>
        <p className="text-xs text-gray-400 mt-0.5">Changes will be saved to database immediately on submit.</p>
      </div>

      {/* ── Error banner ── */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4 mb-6 text-red-700">
          <X className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* ── Success banner ── */}
      {success && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-4 mb-6 text-green-700">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          <div>
            <p className="font-bold text-sm">Mobile successfully updated!</p>
            <p className="text-xs text-green-600">Redirecting to all mobiles…</p>
          </div>
        </div>
      )}

      {/* ── 1. Basic Info ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-5">
        <div className="bg-gray-50 border-b border-gray-200 px-5 py-3">
          <h3 className="text-sm font-bold text-[#1e3a8a] uppercase tracking-wide">Basic Information</h3>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Mobile Name" value={form.name} onChange={set("name")} placeholder="e.g. Samsung Galaxy A55" required />

          {/* Brand */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Brand <span className="text-red-500">*</span>
            </label>
            {categories.length === 0 ? (
              <div className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-500 bg-gray-50">
                {form.brand || "Loading categories…"}
              </div>
            ) : (
              <select
                value={form.brand} onChange={handleBrandChange} required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-blue-100 transition bg-white"
              >
                <option value="">— Brand Chunein —</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            )}
            {form.brandSlug && (
              <p className="text-[10px] text-blue-500 mt-1 font-medium">
                → Brand page: <span className="font-bold">/{form.brandSlug}</span>
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <Input label="Base Price (PKR)" value={form.price} onChange={set("price")} placeholder="e.g. 35000" type="number" required />
            {priceRange && (
              <p className="text-[10px] text-blue-500 mt-1 font-medium">
                → Section: <span className="font-bold">{priceLabel[priceRange]}</span>
                {" "}(slug: <span className="font-bold">{priceRange}</span>)
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── 2. Images ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-5">
        <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#1e3a8a] uppercase tracking-wide">
            Product Images
            <span className="ml-2 text-xs font-normal text-gray-400 normal-case">({totalImages} total)</span>
          </h3>
          <button type="button" onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#1e3a8a] border border-[#1e3a8a] rounded-lg px-3 py-1.5 hover:bg-blue-50 transition">
            <Plus className="w-3.5 h-3.5" /> Add Image
          </button>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden"
          onChange={(e) => handleImageFiles(e.target.files)} />
        <div className="p-5">
          {totalImages === 0 ? (
            <button type="button" onClick={() => fileInputRef.current?.click()}
              className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-10 text-gray-400 hover:border-[#1e3a8a] hover:text-[#1e3a8a] hover:bg-blue-50/30 transition-all">
              <ImagePlus className="w-8 h-8" />
              <p className="text-sm font-medium">Click to select images</p>
            </button>
          ) : (
            <div className="flex flex-wrap gap-3">
              {/* Existing saved images */}
              {form.existingImages.map((src, i) => (
                <div key={`existing-${i}`} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 shadow-sm group">
                  <img src={src} alt={`existing-${i}`} className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeExistingImage(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-3 h-3" />
                  </button>
                  {i === 0 && form.newImagePreviews.length === 0 && (
                    <span className="absolute bottom-0 left-0 right-0 bg-[#1e3a8a]/70 text-white text-[9px] text-center py-0.5 font-semibold">MAIN</span>
                  )}
                </div>
              ))}
              {/* New images (not yet uploaded) */}
              {form.newImagePreviews.map((src, i) => (
                <div key={`new-${i}`} className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-blue-300 shadow-sm group">
                  <img src={src} alt={`new-${i}`} className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeNewImage(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-3 h-3" />
                  </button>
                  <span className="absolute bottom-0 left-0 right-0 bg-blue-500/70 text-white text-[9px] text-center py-0.5 font-semibold">NEW</span>
                </div>
              ))}
              {/* Add more button */}
              <button type="button" onClick={() => fileInputRef.current?.click()}
                className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 text-gray-400 hover:border-[#1e3a8a] hover:text-[#1e3a8a] hover:bg-blue-50/30 transition-all">
                <Plus className="w-5 h-5" />
                <span className="text-[10px] font-medium">Add</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── 3. Variants ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-5">
        <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#1e3a8a] uppercase tracking-wide">Variants / Storage Options</h3>
          <button type="button" onClick={addVariant}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#1e3a8a] border border-[#1e3a8a] rounded-lg px-3 py-1.5 hover:bg-blue-50 transition">
            <Plus className="w-3.5 h-3.5" /> Add Variant
          </button>
        </div>
        <div className="p-5 flex flex-col gap-3">
          {form.variants.map((v, i) => (
            <div key={i} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1 font-medium">Label (e.g. 4GB + 128GB)</label>
                <input value={v.label} onChange={(e) => setVariant(i, "label", e.target.value)} placeholder="2GB + 64GB"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-blue-100" />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1 font-medium">Price (PKR)</label>
                <input value={v.price} onChange={(e) => setVariant(i, "price", e.target.value)} placeholder="12999" type="number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-blue-100" />
              </div>
              {form.variants.length > 1 && (
                <button type="button" onClick={() => removeVariant(i)}
                  className="mt-5 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Specs ── */}
      <Section title="Build">
        <Input label="OS"     value={form.os}     onChange={set("os")}     placeholder="e.g. Android 14" />
        <Input label="UI"     value={form.ui}     onChange={set("ui")}     placeholder="e.g. One UI 6" />
        <Select label="SIM"   value={form.sim}    onChange={set("sim")}    options={["Single SIM", "Dual Nano-SIM", "Dual SIM", "Triple SIM"]} />
        <Input label="Weight" value={form.weight} onChange={set("weight")} placeholder="e.g. 180 g" />
      </Section>

      <Section title="Camera">
        <Input label="Back Camera"  value={form.cameraBack}      onChange={set("cameraBack")}      placeholder="e.g. 50 MP" />
        <Input label="Back Video"   value={form.cameraBackVideo} onChange={set("cameraBackVideo")} placeholder="e.g. 4K@30fps" />
        <Input label="Front Camera" value={form.cameraFront}     onChange={set("cameraFront")}     placeholder="e.g. 13 MP" />
      </Section>

      <Section title="Memory">
        <Input label="RAM"            value={form.ram}  onChange={set("ram")}  placeholder="e.g. 8 GB" />
        <Input label="ROM (Internal)" value={form.rom}  onChange={set("rom")}  placeholder="e.g. 128 GB" />
        <Select label="Memory Card"   value={form.card} onChange={set("card")} options={["MicroSD", "MicroSD (up to 256GB)", "MicroSD (up to 1TB)", "No"]} />
      </Section>

      <Section title="Battery">
        <Input label="Capacity" value={form.batteryCapacity} onChange={set("batteryCapacity")} placeholder="e.g. 5000 mAh" />
        <Input label="Charging" value={form.batteryCharging} onChange={set("batteryCharging")} placeholder="e.g. 25W Fast Charging" />
      </Section>

      <Section title="Display">
        <Select label="Technology" value={form.displayTech}       onChange={set("displayTech")}       options={["IPS LCD", "AMOLED", "Super AMOLED", "OLED", "TFT LCD", "LTPO OLED"]} />
        <Input  label="Size"       value={form.displaySize}       onChange={set("displaySize")}       placeholder='e.g. 6.6"' />
        <Input  label="Resolution" value={form.displayResolution} onChange={set("displayResolution")} placeholder="e.g. 1080 x 2400" />
        <Input  label="Extras"     value={form.displayExtras}     onChange={set("displayExtras")}     placeholder="e.g. 120Hz, Always-on" />
      </Section>

      <Section title="Processor">
        <Input label="Chipset" value={form.chipset} onChange={set("chipset")} placeholder="e.g. Snapdragon 8 Gen 2" />
        <Input label="CPU"     value={form.cpu}     onChange={set("cpu")}     placeholder="e.g. Octa-core" />
        <Input label="GPU"     value={form.gpu}     onChange={set("gpu")}     placeholder="e.g. Adreno 740" />
      </Section>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-5">
        <div className="bg-gray-50 border-b border-gray-200 px-5 py-3">
          <h3 className="text-sm font-bold text-[#1e3a8a] uppercase tracking-wide">Network</h3>
        </div>
        <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {(["net2g", "net3g", "net4g", "net5g"] as const).map((key, i) => (
            <Select key={key} label={["2G", "3G", "4G", "5G"][i]} value={form[key]} onChange={set(key)} options={["Yes", "No"]} />
          ))}
        </div>
      </div>

      <Section title="Connectivity">
        <Input  label="WLAN"      value={form.wlan}      onChange={set("wlan")}      placeholder="e.g. Wi-Fi 802.11 b/g/n" />
        <Input  label="Bluetooth" value={form.bluetooth} onChange={set("bluetooth")} placeholder="e.g. v5.3" />
        <Select label="USB"       value={form.usb}       onChange={set("usb")}       options={["USB Type-C", "Micro USB", "USB 3.0", "USB 2.0"]} />
        <Select label="NFC"       value={form.nfc}       onChange={set("nfc")}       options={["Yes", "No"]} />
      </Section>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-5">
        <div className="bg-gray-50 border-b border-gray-200 px-5 py-3">
          <h3 className="text-sm font-bold text-[#1e3a8a] uppercase tracking-wide">Sensors</h3>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select label="Fingerprint"   value={form.fingerprint}  onChange={set("fingerprint")}  options={["Yes", "No", "Side-mounted", "In-display"]} />
          <Select label="Face Unlock"   value={form.faceUnlock}   onChange={set("faceUnlock")}   options={["Yes", "No"]} />
          <Input  label="Other Sensors" value={form.otherSensors} onChange={set("otherSensors")} placeholder="e.g. Accelerometer, Proximity" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-5">
        <div className="bg-gray-50 border-b border-gray-200 px-5 py-3">
          <h3 className="text-sm font-bold text-[#1e3a8a] uppercase tracking-wide">Sound</h3>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select label="Speaker"    value={form.speaker} onChange={set("speaker")} options={["Mono Speaker", "Stereo Speakers", "Dual Speakers"]} />
          <Select label="3.5mm Jack" value={form.jack}    onChange={set("jack")}    options={["Yes", "No"]} />
        </div>
      </div>

      {/* ── Submit ── */}
      <div className="flex items-center gap-3 pb-10">
        <button
          type="submit" disabled={saving}
          className="bg-[#1e3a8a] hover:bg-blue-900 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-xl text-sm transition shadow-md flex items-center gap-2"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {saving ? "Saving changes…" : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/all-mobiles")}
          className="px-6 py-3 rounded-xl text-sm font-semibold text-gray-500 border border-gray-200 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}