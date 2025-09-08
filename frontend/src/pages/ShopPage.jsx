import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectProduct } from "../features/products/productSelectors";
import { ProductCard } from "../components/ProductCard";
import { getProducts } from "../features/products/productSlice";
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
    <div className="min-h-[calc(100vh-65px)] bg-Secondary text-textPrimary px-6 md:px-20 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="bg-Secondary p-4 md:col-span-1">
          <h1 className="text-xl font-semibold mb-4">Filter Area</h1>
          <p className="text-gray-400 text-sm">
            (Filters like price, category, color, size can go here)
          </p>
        </div>

        <div className="md:col-span-3">
          <h1 className="text-2xl md:text-3xl font-semibold mb-6">Shop Our Products</h1>

          <div className="flex flex-wrap gap-6">
            {products.length > 0 ? (
              products.map((item) => (
                <div
                  key={item._id}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.33%-16px)] lg:w-[calc(25%-18px)]"
                >
                  <ProductCard
                    id={item._id}
                    image={item.images?.[0]}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    cart={true}
                    buy={true}
                    onclick={() => handleAddCart(item)}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-lg mt-10">No products available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
