import { useState, useEffect } from "react";
import { X, Plus, Minus } from 'lucide-react';

export const CartCard = ({ 
  product, 
  onQuantityChange, 
  onRemove,
  onVariantChange
}) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const [selectedSize, setSelectedSize] = useState(product.selectedSize || product.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.selectedColor || product.colors?.[0] || "");

  useEffect(() => {
    if (onVariantChange) {
      onVariantChange(product.id, { selectedColor, selectedSize });
    }
  }, [selectedColor, selectedSize]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
      onQuantityChange(product.id, newQuantity);
    }
  };

  const handleDecrement = () => handleQuantityChange(quantity - 1);
  const handleIncrement = () => handleQuantityChange(quantity + 1);
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    handleQuantityChange(value);
  };

  return (
    <div className="rounded-lg border border-border bg-bgPrimary p-4 shadow-skin transition-skin hover:shadow-lg md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <div className="shrink-0 md:order-1">
          <img 
            className="h-20 w-20 rounded-lg object-cover transition-skin hover:scale-105" 
            src={product.image} 
            alt={product.name}
          />
        </div>

        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center">
            <button 
              type="button"
              onClick={handleDecrement}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-bgSecondary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-skin"
            >
              <Minus className="h-3 w-3 text-textPrimary" />
            </button>
            
            <input 
              type="number"
              value={quantity}
              onChange={handleInputChange}
              min="1"
              max={product.stock}
              className="w-12 text-center text-sm font-medium text-textPrimary bg-transparent border-0 focus:outline-none focus:ring-0"
            />
            
            <button 
              type="button"
              onClick={handleIncrement}
              disabled={quantity >= product.stock}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-bgSecondary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/30 transition-skin"
            >
              <Plus className="h-3 w-3 text-textPrimary" />
            </button>
          </div>
          
          <div className="text-end md:order-4 md:w-32 ml-4">
            <p className="text-base font-bold text-textPrimary">
              ₹{(product.price * quantity).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <h3 className="text-base font-medium text-textPrimary hover:text-primary cursor-pointer transition-skin line-clamp-2">
            {product.name}
          </h3>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 bg-primary/10 text-primary rounded-md font-medium">
              {product.brand}
            </span>
            <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-md">
              {product.category}
            </span>
            {!product.inStock && (
              <span className="px-2 py-1 bg-error/10 text-error rounded-md">
                Out of Stock
              </span>
            )}
          </div>

          {product.originalPrice > product.price && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-textSecondary line-through">
                ${product.originalPrice}
              </span>
              <span className="text-sm font-medium text-success">
                Save ${product.originalPrice - product.price}
              </span>
            </div>
          )}

          <div className="flex items-center gap-4 flex-wrap">
            <button 
              type="button"
              onClick={onRemove}
              className="inline-flex items-center text-sm font-medium text-error hover:text-error/80 transition-skin"
            >
              <X className="mr-1.5 h-4 w-4" />
              Remove
            </button>

            {product.colors?.length > 0 && (
              <div className="flex items-center gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`h-6 w-6 rounded-full border-2 transition ${
                      selectedColor === color
                        ? "border-primary scale-110"
                        : "border-border"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            )}

            {product.sizes?.length > 0 && (
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="px-2 py-1 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
