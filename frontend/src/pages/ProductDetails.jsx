import React, { useEffect, useState } from "react";
import { ProductDetailCard } from "../components/ProductDetailCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { singleProduct } from "../features/products/productSelectors";
import { viewProduct } from "../features/products/productSlice";
import { addCart } from "../features/cart/cartSlice";

export function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(singleProduct);

  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (id) dispatch(viewProduct(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (product && product._id) {
      const subtotal = product.price * 1;
      const originalTotal = product.originalPrice
        ? product.originalPrice * 1
        : subtotal;
      const savings = originalTotal - subtotal;
      const shipping = subtotal > 1000 ? 0 : 99;
      const tax = Math.round(subtotal * 0.08);
      const total = subtotal + shipping + tax;

      setOrder({
        subtotal,
        savings,
        shipping,
        tax,
        total,
        itemCount: 1,
        products: [
          {
            id: product._id,
            name: product.name,
            price: product.price,
            image: product?.images?.[0] || null,
            quantity: 1,
            selectedColor: null,
            selectedSize: null,
            lineTotal: product.price,
          },
        ],
      });
    }
  }, [product]);

  const handleAddCart = async (quantity) => {

    const formData = { productId: product._id, price: product.price, size: product.size, color: product.color, quantity: quantity }
    console.log(formData);

    dispatch(addCart(formData));
  }

  const handleBuy = (data) => {
    if (!product) return;
    console.log(data);


    const subtotal = product.price * data.quantity;
    const originalTotal = product.originalPrice
      ? product.originalPrice * data.quantity
      : subtotal;

    const savings = originalTotal - subtotal;
    const shipping = subtotal > 1000 ? 0 : 99;
    const tax = Math.round(subtotal * 0.08);
    const total = subtotal + shipping + tax;

    setOrder((prev) => ({
      ...prev,
      subtotal,
      savings,
      shipping,
      tax,
      total,
      itemCount: 1,
      products: [
        {
          ...prev.products[0],
          quantity: data.quantity,
          selectedColor: data.selectedColor || null,
          selectedSize: data.selectedSize || null,
          lineTotal: product.price * data.quantity,
        },
      ],
    }));
  };

  if (!product || !order) {
    return <div className="p-6">Loading product details...</div>;
  }

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[radial-gradient(circle_at_25%_85%,rgba(245,158,11,0.1)_0%,transparent_50%),radial-gradient(circle_at_75%_15%,rgba(244,63,94,0.1)_0%,transparent_50%)] px-6 md:px-20 py-8">
      <ProductDetailCard
        images={product.images || []}
        name={product.name}
        originalPrice={product.price}
        discountPercent={product.discount}
        description={product.description}
        colors={product.colors || []}
        sizes={product.sizes || []}
        onAddCart={handleAddCart}
        onBuy={handleBuy}
        orderDetails={order}
      />
    </div>
  );
}
