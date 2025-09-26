import { useState } from "react";
import { ProductCard } from "../ProductCard";
import { ArrowRight } from "lucide-react";
import { selectProduct } from "../../features/products/productSelectors";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addCart } from "../../features/cart/cartSlice";

export default function ShopCarousel() {
  const products = useSelector(selectProduct);
  const filterdProduct = products.filter((e) => e.isFeatured);
  const dispatch = useDispatch();

  const [visibleCount, setVisibleCount] = useState(4);

  const handleAddCart = (data) => {
    const formData = {
      productId: data._id,
      price: data.price,
      size: data.size,
      color: data.color,
    };
    dispatch(addCart(formData));
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className="px-4 md:px-12 lg:px-20 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-4 sm:mb-0">
          Shop Our Collection
        </h2>
        <Link to={"/products"}><button
                    className="flex items-center gap-2 font-semibold bg-primary text-white px-5 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow ml-[30%] my-3 sm:my-0 md:ml-0"
        >
          Show All Products
          <ArrowRight size={20} />
        </button>
        </Link>
      </div>

      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filterdProduct.slice(0, visibleCount).map((item, index) => (
          <ProductCard
            key={index}
            image={item.images[0]}
            name={item.name}
            description={item.description}
            price={item.price}
            cart={true}
            brand={item.brand}
            onclick={() => handleAddCart(item)}
          />
        ))}
      </div>

      {visibleCount < filterdProduct.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-primary text-white font-semibold text-sm sm:text-base md:text-lg rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
