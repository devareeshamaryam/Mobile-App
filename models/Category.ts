import mongoose, { Schema, model, models } from "mongoose";

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  createdAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name:  { type: String, required: true, trim: true },
    slug:  { type: String, required: true, unique: true, lowercase: true, trim: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

export default models.Category ?? model<ICategory>("Category", CategorySchema);