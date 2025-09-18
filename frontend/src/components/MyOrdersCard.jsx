import React from "react";

export default function MyOrdersCard({ product }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border p-3 transition">
      <div className="flex items-center gap-3 flex-1">
        <div className="h-16 w-16 border border-border overflow-hidden rounded-lg shadow-sm">
          <img
            className="h-full w-full object-cover"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="text-sm mt-[-13px]">
          <h3 className="text-textPrimary font-semibold mb-1">{product.name}</h3>
          <p className="text-textSecondary">Category: {product.category}</p>
        </div>
      </div>

      <div className="text-sm text-textSecondary font-medium sm:text-right">
        <p>
          Quantity:{" "}
          <span className="text-textPrimary font-semibold">
            {product.quantity}
          </span>
        </p>
      </div>

      <div className="text-base font-bold text-primary sm:text-right">
        <p>₹{product.price * product.quantity}</p>
      </div>
    </div>
  );
}
