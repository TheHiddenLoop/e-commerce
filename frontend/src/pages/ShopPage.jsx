import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { selectProduct, selectProductStatus } from "../features/products/productSelectors";
import { ProductCard } from "../components/ProductCard";
import { getProducts } from "../features/products/productSlice";
import { addCart } from "../features/cart/cartSlice";
import LoadingBar from "react-top-loading-bar";
import { Loader2, Filter } from "lucide-react";
import { FilterForm } from "../components/FilterForm";
import { useLocation } from "react-router-dom";

export default function ShopPage() {
  const dispatch = useDispatch();
  const products = useSelector(selectProduct) || [];
  const loading = useSelector(selectProductStatus);
  const location = useLocation();
  const defaultCategory = location.state?.category || "";
  

  const [filters, setFilters] = useState({
    search: "",
    category: defaultCategory,
    brand: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "name",
  });

  const loadingRef = useRef(null);

  // Fetch products from server with filters
  useEffect(() => {
    dispatch(getProducts(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    if (loading === "loading") loadingRef.current.continuousStart();
    else loadingRef.current.complete();
  }, [loading]);

  const handleFilterChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const clearFilters = () =>
    setFilters({ search: "", category: "", brand: "", minPrice: "", maxPrice: "", sortBy: "name" });

  const uniqueCategories = [...new Set(products.map((p) => p.category).filter(Boolean))];
  const uniqueBrands = [...new Set(products.map((p) => p.brand).filter(Boolean))];

  const handleAddCart = (data) => {
    dispatch(addCart({ productId: data._id, price: data.price }));
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[radial-gradient(circle_at_25%_85%,rgba(245,158,11,0.1)_0%,transparent_50%),radial-gradient(circle_at_75%_15%,rgba(244,63,94,0.1)_0%,transparent_50%)] text-textPrimary px-4 md:px-6 lg:px-20 py-6 md:py-10">
      <LoadingBar className="relative top-16" color="var(--primary-color)" ref={loadingRef} shadow={true} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8">
        <aside className="md:col-span-1">
          <FilterForm
            filters={filters}
            handleFilterChange={handleFilterChange}
            clearFilters={clearFilters}
            uniqueCategories={uniqueCategories}
            uniqueBrands={uniqueBrands}
          />
        </aside>
        <main className="md:col-span-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2 sm:mb-0 text-textPrimary">Shop Our Products</h1>
            <p className="text-textSecondary">{products.length} {products.length === 1 ? "product" : "products"} found</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {loading === "loading" ? (
              <div className="col-span-full flex w-full justify-center items-center py-12">
                <Loader2 className="animate-spin w-8 h-8 text-primary" />
              </div>
            ) : products.length > 0 ? (
              products.map((item) => (
                <div key={item._id} className="w-full">
                  <ProductCard
                    id={item._id}
                    image={item.images?.[0]}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    cart={true}
                    buy={true}
                    brand={item.brand}
                    onclick={() => handleAddCart(item)}
                    textColor="text-textPrimary"
                    bgColor="bg-bgPrimary"
                    borderColor="border-border"
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-textSecondary">
                <Filter className="w-12 h-12 mb-4 text-muted-foreground" />
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
