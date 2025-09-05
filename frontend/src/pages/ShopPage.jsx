import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../features/products/productSelectors";
import { ProductCard } from "../components/ProductCard";
import { getProducts } from "../features/products/productSlice";
import { useEffect } from "react";

export default function ShopPage() {
  const dispatch = useDispatch();
  const products = useSelector(selectProduct) || [];

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Hi There</h1>
      <div className="flex flex-wrap gap-4">
        {products.map((item) => (
          <div key={item._id} className="flex-shrink-0">
            <ProductCard
              image={item.images[0]}
              name={item.name}
              description={item.description}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
