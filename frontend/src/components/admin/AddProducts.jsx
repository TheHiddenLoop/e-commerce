import React, { useState } from "react";
import PlainInputField from "../UI/PlainInputField";
import { categories } from "../../libs/product";
import { Upload, Plus, Tag, Box, DollarSign, Percent, Hash, Layers, ShoppingBag, Star, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../features/admin/adminSlice";
import { selectAdminProductStatus } from "../../features/admin/adminSelectores";

export default function AddProducts() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    features: "",
    brand: "",
    price: "",
    discount: "",
    stock: "",
    sizes: "",
    colors: "",
    material: "",
    tags: "",
    category: "",
    subCategory: "",
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector(selectAdminProductStatus);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setFormData((p) => ({ ...p, category: value, subCategory: "" }));
      return;
    }
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length < 2 || files.length > 5) {
      setErrors("Select between 2 and 5 images");
      setImages([]);
    } else {
      setErrors("");
      setImages(files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length < 2 || images.length > 5) {
      setErrors("Select between 2 and 5 images");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    images.forEach((img) => data.append("images", img));
    dispatch(addProduct(data));
  };


  const selectedCategory = categories.find((c) => c.name === formData.category);

  return (
    <div className="my-6 space-y-10">
      <h2 className="text-2xl text-textPrimary font-semibold flex items-center gap-2">
        <Plus className="w-6 h-6 text-primary" /> Add a Product
      </h2>

      <section className="bg-[radial-gradient(circle_at_30%_70%,rgba(139,92,246,0.1)_0%,transparent_50%),radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.1)_0%,transparent_50%)] p-6 rounded-xl shadow-skin">
        <h3 className="text-xl text-textPrimary font-semibold mb-4 flex items-center gap-2">
          <Box className="w-5 h-5 text-primary" /> Basic Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <PlainInputField name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" icon={ShoppingBag} />
          <PlainInputField name="description" value={formData.description} onChange={handleChange} placeholder="Description" icon={Tag} />
          <PlainInputField name="features" value={formData.features} onChange={handleChange} placeholder="Key Features" icon={Layers} />
          <PlainInputField name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" icon={Tag} />
          <PlainInputField type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" icon={DollarSign} />
          <PlainInputField type="number" name="discount" value={formData.discount} onChange={handleChange} placeholder="Discount (%)" icon={Percent} />
          <PlainInputField type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Available Stock" icon={Box} />
          <PlainInputField name="sizes" value={formData.sizes} onChange={handleChange} placeholder="Sizes (comma separated)" icon={Layers} />
          <PlainInputField name="colors" value={formData.colors} onChange={handleChange} placeholder="Colors (comma separated)" icon={Layers} />
          <PlainInputField name="material" value={formData.material} onChange={handleChange} placeholder="Material" icon={Layers} />
          <PlainInputField name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" icon={Tag} />
        </div>
      </section>

      <section className="bg-bgSecondary p-6 rounded-xl shadow-skin">
        <h3 className="text-xl text-textPrimary font-semibold mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" /> Category & Images
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-3 rounded-lg bg-bgPrimary border border-border text-textPrimary focus:border-primary focus:ring-1 focus:ring-[var(--bg-glass)] outline-none text-sm"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            disabled={!formData.category}
            className="w-full px-3 py-3 rounded-lg bg-bgPrimary border border-border text-textPrimary focus:border-primary focus:ring-1 focus:ring-[var(--bg-glass)] outline-none text-sm disabled:opacity-50"
          >
            <option value="">
              {formData.category ? "Select Sub Category" : "Select Category First"}
            </option>
            {selectedCategory?.subcategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6">
          <label className="text-textPrimary text-sm font-semibold flex items-center gap-2">
            <Upload className="w-4 h-4 text-primary" /> Upload Images (2-5)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full mt-2 text-sm text-textSecondary
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-primary file:text-white
                       hover:file:bg-opacity-80"
          />
          {errors && <p className="text-error text-sm mt-2">{errors}</p>}
        </div>
      </section>

      <section className="bg-bgSecondary p-6 rounded-xl shadow-skin flex justify-end">
        <button
          disabled={loading === "loading"}
          onClick={handleSubmit}
          className="px-8 py-3 rounded-lg bg-primary text-white hover:opacity-90 transition-skin flex items-center gap-2"
        >
          {loading === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          Add Product
        </button>
      </section>
    </div>
  );
}
