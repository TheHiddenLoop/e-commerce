import { useRef } from "react";
import { ProductCard } from "../ProductCard";
import { products } from "../../libs/product";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export default function ShopCarousel() {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const scrollAmount = carousel.querySelector("div").offsetWidth + 24; 

    carousel.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="px-4 md:px-20 py-8 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-4 sm:mb-0">
          Shop Our Collection
        </h2>
        <button
          className="flex items-center gap-2 font-semibold bg-primary text-white px-5 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow ml-[30%] my-3 sm:my-0 md:ml-0"
        >
          Show All Products
          <ArrowRight size={20} />
        </button>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={carouselRef}
          className="scrollBar flex gap-6 overflow-x-auto scroll-smooth no-scrollbar sm:mx-5 md:mx-20 py-2"
        >
          {products.map((item, index) => (
            <div key={index} className="flex-shrink-0"> 
              <ProductCard
                image={item.image}
                name={item.name}
                description={item.description}
                price={item.price}
              />
            </div>
          ))}
        </div>

        <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-bg-secondary pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-bg-secondary pointer-events-none" />
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => scroll("left")}
          className="p-2 bg-border hover:bg-ring rounded-lg shadow-md transition w-20 flex items-center justify-center text-textPrimary"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="p-2 bg-border hover:bg-ring rounded-lg shadow-md transition w-20 flex items-center justify-center text-textPrimary"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}