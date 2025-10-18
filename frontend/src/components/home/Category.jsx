import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { CategoryCard } from "../CategoryCard";
import { categories } from "../../libs/product";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { selectProduct } from "../../features/products/productSelectors";
import { Link } from "react-router-dom";

export function Category() {
    const carouselRef = useRef(null);

    const products = useSelector(selectProduct);

    const filteredProduct = Array.isArray(products)
  ? products.reduce((acc, e) => {
      const category = e?.category || "Unknown";
      const image = e?.images?.[0] || null;

      if (!acc.some(item => item.category === category)) {
        acc.push({ category, image });
      }
      return acc;
    }, [])
  : [];




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
        <div className="px-4 md:px-20 py-8 ">
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

            <div className="relative overflow-hidden">
                <div
                    ref={carouselRef}
                    className="scrollBar flex gap-6 overflow-x-auto scroll-smooth no-scrollbar sm:mx-5 py-2"
                >
                    {filteredProduct.map((item, index) => (
                        <div key={index} className="flex-shrink-0">
                            <CategoryCard
                                image={item.image}
                                category={item.category}
                            />
                        </div>
                    ))}
                </div>
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
