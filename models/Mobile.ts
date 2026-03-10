 import { Schema, model, models } from "mongoose";

const VariantSchema = new Schema({
  label: { type: String, required: true },
  price: { type: Number, required: true },
});

const MobileSchema = new Schema(
  {
    name:        { type: String, required: true, trim: true },
    brand:       { type: String, required: true, trim: true },
    brandSlug:   { type: String, required: true, trim: true },
    priceRange:  { type: String, required: true },
    price:       { type: Number, required: true },
    images:      [{ type: String }],
    variants:    [VariantSchema],
    specs:       { type: Schema.Types.Mixed, default: {} },
    description: { type: String, default: "" },  // ← yeh add kiya
  },
  { timestamps: true }
);

MobileSchema.index({ brandSlug: 1 });
MobileSchema.index({ priceRange: 1 });

const Mobile = models.Mobile || model("Mobile", MobileSchema);
export default Mobile;