import { useInView } from "react-intersection-observer";

export function CategoryCard({ image, category }) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <div ref={ref} className={`flex flex-col bg-bgPrimary rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-[20rem] sm:max-w-[14rem] md:max-w-[15rem] ${inView ? "fade-in" : ""}`}>

            <div className="h-52 sm:h-56 md:h-40 w-full overflow-hidden">
                <img
                    src={image}
                    alt={category}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>

            <div className="p-4 flex flex-col flex-1 justify-center text-center gap-3">
                <h3 className="text-lg font-semibold text-textPrimary line-clamp-1">
                    {category}
                </h3>
                <button className="self-center w-fit bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-primary/50">
                    Find More
                </button>
            </div>

        </div>
    );
}
