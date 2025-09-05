import { useEffect, useState } from "react";
// import { images } from "../../libs/imageSample"
import { selectProduct } from "../../features/products/productSelectors";
import { useSelector } from "react-redux";
export function Hero() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const products=useSelector(selectProduct);
    const images=products.map(e=>{
        if(e.images && e.images.length >= 1){
            return e.images[1]
        }
    })
    
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className="relative overflow-hidden py-16 md:py-24 md:px-20">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">

                <div className={`flex-1 max-w-xl space-y-6 transition-opacity duration-700 ${isVisible ? "slide-in-left" : "opacity-0"}`}>
                    <div className="inline-flex items-center px-3 py-1.5 rounded-full glass text-sm">
                        <div className="w-2 h-2 bg-accent rounded-full mr-2 pulse" />
                        <span>✨ New Collection Available</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
                        <span className="text-gradient">CltX</span> <br />
                        <span className="text-textPrimary">Your Destination for</span> <br />
                        <span className="text-primary">Trendy & Timeless Fashion</span>
                    </h1>
                    <p className="text-lg text-textSecondary mt-4 max-w-xl">
                        From everyday essentials to statement pieces, CltX brings you designs that
                        blend innovation, quality, and unmatched style.
                    </p>


                    <div className="flex justify-center sm:justify-start sm:flex-row gap-8 md:gap-4 pt-2">
                        <button className="btn-gradient text-white px-6 py-3 rounded-xl font-semibold text-base shadow-md hover:shadow-lg transition">
                            Shop Collection
                        </button>
                        <button className="glass text-primary px-6 py-3 rounded-xl font-semibold text-base hover:bg-opacity-30 transition">
                            Watch Story
                        </button>
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
