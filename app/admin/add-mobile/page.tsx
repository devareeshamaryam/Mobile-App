 "use client";

import { useState } from "react";
import { Plus, Trash2, CheckCircle } from "lucide-react";

/* ── Reusable input components ── */
const Input = ({ label, value, onChange, placeholder, type = "text", required = false }: any) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-blue-100 transition placeholder-gray-300"
    />
  </div>
);

const Select = ({ label, value, onChange, options }: any) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-blue-100 transition bg-white"
    >
      <option value="">— Select —</option>
      {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

/* ── Section Card ── */
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-5">
    <div className="bg-gray-50 border-b border-gray-200 px-5 py-3">
      <h3 className="text-sm font-bold text-[#1e3a8a] uppercase tracking-wide">{title}</h3>
    </div>
    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

/* ── Initial State ── */
const initForm = {
  // Basic
  name: "", brand: "", price: "", image: "",
  // Variants
  variants: [{ label: "", price: "" }],
  // Build
  os: "", ui: "", sim: "", weight: "",
  // Camera
  cameraBack: "", cameraBackVideo: "", cameraFront: "",
  // Memory
  ram: "", rom: "", card: "",
  // Battery
  batteryCapacity: "", batteryCharging: "",
  // Display
  displayTech: "", displaySize: "", displayResolution: "", displayExtras: "",
  // Processor
  chipset: "", cpu: "", gpu: "",
  // Network
  net2g: "Yes", net3g: "Yes", net4g: "Yes", net5g: "No",
  // Connectivity
  wlan: "", bluetooth: "", usb: "", nfc: "No",
  // Sensors
  fingerprint: "No", faceUnlock: "Yes", otherSensors: "",
  // Sound
  speaker: "", jack: "Yes",
};

export default function AddMobilePage() {
  const [form, setForm] = useState(initForm);
  const [success, setSuccess] = useState(false);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  /* Variants helpers */
  const addVariant = () => setForm(f => ({ ...f, variants: [...f.variants, { label: "", price: "" }] }));
  const removeVariant = (i: number) => setForm(f => ({ ...f, variants: f.variants.filter((_, idx) => idx !== i) }));
  const setVariant = (i: number, key: "label" | "price", val: string) =>
    setForm(f => {
      const v = [...f.variants];
      v[i] = { ...v[i], [key]: val };
      return { ...f, variants: v };
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mobile = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      name: form.name,
      brand: form.brand,
      price: Number(form.price),
      image: form.image,
      variants: form.variants.filter(v => v.label && v.price).map(v => ({ label: v.label, price: Number(v.price) })),
      specs: {
        Build: { OS: form.os, UI: form.ui, SIM: form.sim, Weight: form.weight },
        Camera: { Back: form.cameraBack, "Back Video": form.cameraBackVideo, Front: form.cameraFront },
        Memory: { RAM: form.ram, ROM: form.rom, Card: form.card },
        Battery: { Capacity: form.batteryCapacity, Charging: form.batteryCharging },
        Display: { Technology: form.displayTech, Size: form.displaySize, Resolution: form.displayResolution, Extras: form.displayExtras },
        Processor: { Chipset: form.chipset, CPU: form.cpu, GPU: form.gpu },
        Network: { "2G": form.net2g, "3G": form.net3g, "4G": form.net4g, "5G": form.net5g },
        Connectivity: { WLAN: form.wlan, Bluetooth: form.bluetooth, USB: form.usb, NFC: form.nfc },
        Sensors: { Fingerprint: form.fingerprint, "Face Unlock": form.faceUnlock, "Other Sensors": form.otherSensors },
        Sound: { Speaker: form.speaker, "3.5mm Jack": form.jack },
      },
    };
    const existing = JSON.parse(localStorage.getItem("mobiles") || "[]");
    localStorage.setItem("mobiles", JSON.stringify([...existing, mobile]));
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setForm(initForm); }, 3500);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Success */}
      {success && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-4 mb-6 text-green-700">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          <div>
            <p className="font-bold text-sm">Mobile Added Successfully!</p>
            <p className="text-xs text-green-600">It will now appear in View All Mobiles.</p>
          </div>
        </div>
      )}

      {/* ── 1. Basic Info ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-5">
        <div className="bg-gray-50 border-b border-gray-200 px-5 py-3">
          <h3 className="text-sm font-bold text-[#1e3a8a] uppercase tracking-wide">Basic Information</h3>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Mobile Name" value={form.name} onChange={set("name")} placeholder="e.g. Tecno Pop 8" required />
          <Input label="Brand" value={form.brand} onChange={set("brand")} placeholder="e.g. Tecno, Samsung, Vivo" required />
          <Input label="Base Price (PKR)" value={form.price} onChange={set("price")} placeholder="e.g. 12999" type="number" required />
          <Input label="Image URL" value={form.image} onChange={set("image")} placeholder="https://..." />
        </div>
      </div>

      {/* ── 2. Variants ── */}
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
                <input
                  value={v.label}
                  onChange={e => setVariant(i, "label", e.target.value)}
                  placeholder="2GB + 64GB"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1 font-medium">Price (PKR)</label>
                <input
                  value={v.price}
                  onChange={e => setVariant(i, "price", e.target.value)}
                  placeholder="12999"
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-blue-100"
                />
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

      {/* ── 3. Build ── */}
      <Section title="Build">
        <Input label="OS" value={form.os} onChange={set("os")} placeholder="e.g. Android 13 Go" />
        <Input label="UI" value={form.ui} onChange={set("ui")} placeholder="e.g. HiOS 13" />
        <Select label="SIM" value={form.sim} onChange={set("sim")} options={["Single SIM", "Dual Nano-SIM", "Dual SIM", "Triple SIM"]} />
        <Input label="Weight" value={form.weight} onChange={set("weight")} placeholder="e.g. 180 g" />
      </Section>

      {/* ── 4. Camera ── */}
      <Section title="Camera">
        <Input label="Back Camera" value={form.cameraBack} onChange={set("cameraBack")} placeholder="e.g. 8 MP" />
        <Input label="Back Video" value={form.cameraBackVideo} onChange={set("cameraBackVideo")} placeholder="e.g. 1080p@30fps" />
        <Input label="Front Camera" value={form.cameraFront} onChange={set("cameraFront")} placeholder="e.g. 5 MP" />
      </Section>

      {/* ── 5. Memory ── */}
      <Section title="Memory">
        <Input label="RAM" value={form.ram} onChange={set("ram")} placeholder="e.g. 2 GB" />
        <Input label="ROM (Internal)" value={form.rom} onChange={set("rom")} placeholder="e.g. 64 GB" />
        <Select label="Memory Card" value={form.card} onChange={set("card")} options={["MicroSD", "MicroSD (up to 256GB)", "MicroSD (up to 1TB)", "No"]} />
      </Section>

      {/* ── 6. Battery ── */}
      <Section title="Battery">
        <Input label="Capacity" value={form.batteryCapacity} onChange={set("batteryCapacity")} placeholder="e.g. 5000 mAh" />
        <Input label="Charging" value={form.batteryCharging} onChange={set("batteryCharging")} placeholder="e.g. 10W Charging" />
      </Section>

      {/* ── 7. Display ── */}
      <Section title="Display">
        <Select label="Technology" value={form.displayTech} onChange={set("displayTech")} options={["IPS LCD", "AMOLED", "Super AMOLED", "OLED", "TFT LCD", "LTPO OLED"]} />
        <Input label="Size" value={form.displaySize} onChange={set("displaySize")} placeholder='e.g. 6.6"' />
        <Input label="Resolution" value={form.displayResolution} onChange={set("displayResolution")} placeholder="e.g. 720 x 1612" />
        <Input label="Extras" value={form.displayExtras} onChange={set("displayExtras")} placeholder="e.g. 90Hz, Always-on" />
      </Section>

      {/* ── 8. Processor ── */}
      <Section title="Processor">
        <Input label="Chipset" value={form.chipset} onChange={set("chipset")} placeholder="e.g. Unisoc T606 (12nm)" />
        <Input label="CPU" value={form.cpu} onChange={set("cpu")} placeholder="e.g. Octa-core" />
        <Input label="GPU" value={form.gpu} onChange={set("gpu")} placeholder="e.g. Mali-G57" />
      </Section>

      {/* ── 9. Network ── */}
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

      {/* ── 10. Connectivity ── */}
      <Section title="Connectivity">
        <Input label="WLAN" value={form.wlan} onChange={set("wlan")} placeholder="e.g. Wi-Fi 802.11 b/g/n" />
        <Input label="Bluetooth" value={form.bluetooth} onChange={set("bluetooth")} placeholder="e.g. v5.0" />
        <Select label="USB" value={form.usb} onChange={set("usb")} options={["USB Type-C", "Micro USB", "USB 3.0", "USB 2.0"]} />
        <Select label="NFC" value={form.nfc} onChange={set("nfc")} options={["Yes", "No"]} />
      </Section>

      {/* ── 11. Sensors ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-5">
        <div className="bg-gray-50 border-b border-gray-200 px-5 py-3">
          <h3 className="text-sm font-bold text-[#1e3a8a] uppercase tracking-wide">Sensors</h3>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select label="Fingerprint" value={form.fingerprint} onChange={set("fingerprint")} options={["Yes", "No", "Side-mounted", "In-display"]} />
          <Select label="Face Unlock" value={form.faceUnlock} onChange={set("faceUnlock")} options={["Yes", "No"]} />
          <Input label="Other Sensors" value={form.otherSensors} onChange={set("otherSensors")} placeholder="e.g. Accelerometer, Proximity" />
        </div>
      </div>

      {/* ── 12. Sound ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-5">
        <div className="bg-gray-50 border-b border-gray-200 px-5 py-3">
          <h3 className="text-sm font-bold text-[#1e3a8a] uppercase tracking-wide">Sound</h3>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select label="Speaker" value={form.speaker} onChange={set("speaker")} options={["Mono Speaker", "Stereo Speakers", "Dual Speakers"]} />
          <Select label="3.5mm Jack" value={form.jack} onChange={set("jack")} options={["Yes", "No"]} />
        </div>
      </div>

      {/* ── Submit ── */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="bg-[#1e3a8a] hover:bg-blue-900 text-white font-bold px-8 py-3 rounded-xl text-sm transition shadow-md"
        >
          + Add Mobile
        </button>
        <button
          type="button"
          onClick={() => setForm(initForm)}
          className="border border-gray-300 text-gray-600 font-medium px-6 py-3 rounded-xl text-sm hover:bg-gray-50 transition"
        >
          Reset Form
        </button>
      </div>
    </form>
  );
}