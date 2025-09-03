export function ProductCard({ name, description, image, price }) {
  return (
    <div className="flex flex-col bg-bgPrimary rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full sm:h-[500px] max-w-xs sm:max-w-[14rem] md:max-w-[15rem]">
      
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
          <button className="btn-gradient text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
