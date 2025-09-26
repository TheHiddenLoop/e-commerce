import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    subCategory: { type: String, trim: true },
    brand: { type: String, trim: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    sizes: { type: [String], default: [] },
    colors: { type: [String], default: [] },
    material: { type: String, trim: true },
    images: { type: [String], default: [] },
    stock: { type: Number, required: true, default: 0 },
    sku: { type: String, trim: true, unique: true },
    tags: { type: [String], default: [] },
    rating: { type: Number, default: 0 },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: { type: String, trim: true },
        rating: { type: Number },
        comment: { type: String, trim: true },
        date: { type: Date, default: Date.now }
      }
    ],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
