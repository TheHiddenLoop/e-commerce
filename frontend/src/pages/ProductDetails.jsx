import React from 'react'
import { ProductDetailCard } from '../components/ProductDetailCard';
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { singleProduct } from "../features/products/productSelectors";
import { viewProduct } from '../features/products/productSlice';
import { addCart } from '../features/cart/cartSlice';


export function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(singleProduct);

  useEffect(() => {
    dispatch(viewProduct(id));
  }, [id, dispatch]);

  console.log(product);

  const handleAddCart = async (quantity) => {

    const formData = { productId: product._id, price: product.price, size: product.size, color: product.color, quantity: quantity }
    console.log(formData);

    dispatch(addCart(formData));
  }


  return (
    <div className="min-h-[calc(100vh-65px)] bg-[radial-gradient(circle_at_25%_85%,rgba(245,158,11,0.1)_0%,transparent_50%),radial-gradient(circle_at_75%_15%,rgba(244,63,94,0.1)_0%,transparent_50%)] px-6 md:px-20 py-8">
      <ProductDetailCard images={product?.images || []} name={product.name} originalPrice={product.price} discountPercent={product.discount} description={product.description}
        colors={product?.colors || []}
        onAddCart={handleAddCart}
      />
    </div>
  )
}
