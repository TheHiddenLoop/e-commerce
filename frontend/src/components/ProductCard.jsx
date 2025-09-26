import placeHolder from "../assets/fallback.svg"
import { useInView } from "react-intersection-observer"
import { Link } from "react-router-dom"
import { Plus, ShoppingBag } from "lucide-react"

export function ProductCard({
  id,
  name,
  image,
  price,
  brand,
  onclick,
  buy,
  cart,
  onbuy,
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <div
      ref={ref}
      className={` bg-bgPrimary rounded-2xl shadow-sm hover:shadow-md transition-all duration-700 w-full h-[350px] max-w-[280px] overflow-hidden ${inView ? "fade-in" : ""
        }`}
    >
      <div className="relative bg-sky-300 h-48 max-w-[280px] overflow-hidden">
        <img
          src={image || placeHolder}
          alt={name}
          onError={(e) => {
            e.currentTarget.src = placeHolder; 
          }}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="p-4 flex flex-col h-[150px]">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-poppins font-semibold text-textPrimary text-base leading-tight mb-1">
                {name}
              </h3>
              <p className="text-sm text-textSecondary mt-3">{brand}</p>
            </div>

            {cart && (
              <button
                onClick={onclick}
                className="w-6 h-6 rounded-full bg-primary text-white hover:bg-accent transition-colors duration-200 flex items-center justify-center ml-3 flex-shrink-0"
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="font-poppins font-bold text-lg text-textPrimary">
            ₹{price}
          </span>
          <div className="flex gap-2">
            {buy && (
              <Link to={`/product-details/${id}`}>
                <button
                  onClick={onbuy}
                  className="bg-primary hover:bg-accent text-white h-[30px] w-[40px] rounded-lg text-sm font-medium flex items-center justify-center transition-colors duration-200"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
