 import { Schema, model, models } from "mongoose";

const VariantSchema = new Schema({
  label: { type: String, required: true },
  price: { type: Number, required: true },
});

const MobileSchema = new Schema(
  {
    name:       { type: String, required: true, trim: true }, // e.g. "Samsung Galaxy A55"
    brand:      { type: String, required: true, trim: true }, // e.g. "Samsung"
    brandSlug:  { type: String, required: true, trim: true }, // e.g. "samsung" → /samsung page
    priceRange: { type: String, required: true },             // e.g. "30k-40k" → /mobile/30k-40k page
    price:      { type: Number, required: true },
    images:     [{ type: String }],
    variants:   [VariantSchema],
    specs:      { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

// Fast filtering on brand & price pages
MobileSchema.index({ brandSlug: 1 });
MobileSchema.index({ priceRange: 1 });

const Mobile = models.Mobile || model("Mobile", MobileSchema);
export default Mobile;