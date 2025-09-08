import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

export function ProductCard({ id, name, description, image, price,onclick, buy, cart, onbuy }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={`flex flex-col bg-bgPrimary rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-700 transform w-full sm:h-[500px] max-w-xs sm:max-w-[14rem] md:max-w-[15rem] 
        ${inView ? "fade-in" : ""}`}
    >
      <div className="p-3">
        <div className="h-56 md:h-64 rounded-md w-full overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform rounded-md duration-500 hover:scale-105"
          />
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-lg font-semibold text-textPrimary mb-1">{name}</h3>
          <p className="text-sm text-textSecondary mb-3">{description}</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-primary font-bold text-lg">{price}</p>
          <div className="flex gap-2">
            {buy && <Link to={`/product-details/${id}`}>
              <button onClick={onbuy} className="btn-gradient text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition">
             Buy
          </button>
            </Link>}
          {cart && <button onClick={onclick} className="btn-gradient text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition">
            Cart
          </button>}
          </div>
        </div>
      </div>
    </div>
  );
}
