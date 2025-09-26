import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

export function ProductDetailCard({ images, name, sizes, originalPrice, discountPercent, description, colors, onAddCart, onBuy, orderDetails }) {
  const discountedPrice = originalPrice - (originalPrice * discountPercent) / 100;

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
  setSelectedColor(null);
  setSelectedImage(null);
  setSelectedSize(null);

  if (images && images.length > 0) {
    setSelectedImage(images[0]);
  }
  if (colors && colors.length > 0) {
    setSelectedColor(colors[0]);
  }
  if (sizes && sizes.length > 0) {
    setSelectedSize(sizes[0]); // ✅ correct setter
  }
}, [images, colors, sizes]); 


  return (
    <div className="text-textPrimary flex flex-col lg:flex-row gap-6 lg:p-6">
      <div className="w-full lg:w-[55%] flex flex-col">
        {selectedImage && (
          <motion.img
            key={selectedImage}
            src={selectedImage}
            alt="Main Product"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[70vh] w-full object-cover rounded-xl shadow-md"
          />
        )}
      </div>

      <div className="flex flex-col w-full lg:w-[45%]">
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
            {name}
          </h1>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-warning">
              {[...Array(4)].map((_, i) => (
                <Star key={i} size={16} className="sm:w-5 sm:h-5" fill="gold" stroke="gold" />
              ))}
              <Star size={16} className="sm:w-5 sm:h-5" />
            </div>
            <span className="text-xs sm:text-sm text-textSecondary">(120 reviews)</span>
          </div>

          <div className="flex items-center gap-3 mb-3 font-semibold">
            <span className="text-lg sm:text-xl lg:text-2xl text-success">
              ₹ {new Intl.NumberFormat("en-IN").format(discountedPrice)}
            </span>
            <span className="text-sm sm:text-lg text-error line-through">
              ₹ {originalPrice}
            </span>
            <span className="text-xs sm:text-sm bg-warning text-white px-2 py-0.5 rounded">
              {discountPercent}% OFF
            </span>
          </div>

          <p className="text-xs sm:text-sm text-textSecondary mb-3">
            {description}
          </p>

          <ul className="list-disc list-inside text-xs sm:text-sm text-textSecondary mb-4 space-y-1">
            <li>High-quality durable material</li>
            <li>Available in multiple colors</li>
            <li>1-year warranty included</li>
          </ul>

          <div className="flex items-center gap-3 mb-4">
            {colors.map((color, i) => (
              <span
                key={i}
                onClick={() => setSelectedColor(color)}
                className={`h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center rounded-full border cursor-pointer transition ${selectedColor === color ? "ring-2 ring-primary" : "border-border"
                  }`}
                style={{ backgroundColor: color.toLowerCase() }}
              >
                {selectedColor === color && (
                  <span className="text-white text-[10px] sm:text-xs">✔</span>
                )}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-4">
            {sizes.map((size, i) => (
              <span
                key={i}
                onClick={() => setSelectedSize(size)}
                className={`h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full border cursor-pointer transition text-sm sm:text-base
                  ${selectedSize === size ? "bg-primary text-white ring-2 ring-primary" : "border-border text-gray-700"}
                `}
              >
                {size}
              </span>
            ))}
          </div>


          <div className="flex items-center gap-3 mb-4">
            <span className="font-medium text-sm sm:text-base">Quantity:</span>
            <div className="flex items-center border rounded-lg bg-bgPrimary">
              <button
                className="px-2 sm:px-3 py-1 text-sm sm:text-lg"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="px-3 sm:px-4">{quantity}</span>
              <button
                className="px-2 sm:px-3 py-1 text-sm sm:text-lg"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <div className="flex items-center gap-2 sm:gap-3 mb-3">
            {images.map((img, i) => (
              <motion.img
                key={i}
                src={img}
                alt={`Thumbnail ${i}`}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(img)}
                className={`h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 object-cover cursor-pointer rounded border transition ${selectedImage === img ? "ring-2 ring-primary" : "border-border"
                  }`}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onAddCart(quantity)}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-primary text-white rounded-lg sm:rounded-xl shadow hover:opacity-90"
            >
              Add to Cart
            </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onBuy({ selectedColor, quantity, selectedSize })}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-accent text-white rounded-lg sm:rounded-xl shadow hover:opacity-90"
              >
                Buy Now
              </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
