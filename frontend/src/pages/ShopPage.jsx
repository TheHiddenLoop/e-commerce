import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../features/products/productSelectors";
import { ProductCard } from "../components/ProductCard";
import { getProducts } from "../features/products/productSlice";
import { useEffect } from "react";
import { addCart } from "../features/cart/cartSlice";

export default function ShopPage() {
  const dispatch = useDispatch();
  const products = useSelector(selectProduct) || [];

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);


  const handleAddCart=async (data) => {
    const formData={ productId:data._id, price:data.price, size:data.size, color:data.color }    
    dispatch(addCart(formData));
  }


  return (
    <div className="min-h-[calc(100vh-65px)] bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.08)_0%,transparent_50%)] text-textPrimary px-6 md:px-20">
      <div className="flex flex-wrap gap-4">
        {products.map((item) => (
          <div key={item._id} className="flex-shrink-0">
            <ProductCard
              image={item.images[0]}
              name={item.name}
              description={item.description}
              price={item.price}
              onclick={()=>handleAddCart(item)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
