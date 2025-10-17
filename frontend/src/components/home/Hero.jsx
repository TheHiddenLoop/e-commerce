import { useEffect, useState } from "react";
import { selectProduct } from "../../features/products/productSelectors";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
export function Hero() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const products = useSelector(selectProduct);
    const images = products
  .map(e => e.images?.[1] || e.images?.[0] || null)
  .filter(Boolean);

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className="relative bg-gradient-to-b from-primary/10 via-background to-background  py-16 md:py-24 md:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

                <div className="space-y-6 animate-fadeIn">
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        ✨ Fresh Arrivals Just Landed
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                        Elevate Your Style with <span className="text-primary">CltX</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                        Discover exclusive collections crafted to blend innovation, quality, and timeless appeal.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link to="/products">
                            <button className="px-6 py-3 bg-primary text-white rounded-xl font-semibold shadow hover:shadow-lg transition-transform transform hover:scale-105">
                                Shop Now
                            </button>
                        </Link>
                        <a href="#review" className="px-6 py-3 border border-primary text-primary rounded-xl font-semibold hover:bg-primary/10 transition-transform transform hover:scale-105">
                            Watch Story
                        </a>
                    </div>
                </div>

                <div className="flex-1 w-full max-w-md md:max-w-md transition-opacity duration-700 slide-in-right">
                    <div className="relative glass rounded-2xl p-4 float">
                        <div className="aspect-square rounded-xl overflow-hidden relative w-full">
                            {images.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`Fashion Hero ${index}`}
                                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out
                                        ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"}
                                    `}
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80";
                                    }}
                                />
                            ))}
                        </div>

                        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    </div>
                </div>

            </div>
        </section>
    );
}
