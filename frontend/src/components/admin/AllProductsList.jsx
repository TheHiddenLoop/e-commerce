import { ShoppingBag, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allSellingProducts, removeProduct } from "../../features/admin/adminSlice";
import { selectAllProducts, selectAdminProductStatus } from "../../features/admin/adminSelectores";
import LoadingBar from "react-top-loading-bar";



export default function AllProductsPage() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const loading = useSelector(selectAdminProductStatus);
  

  const loadingRef = useRef(null);

  useEffect(() => {
    if (loading === "loading") {
      loadingRef.current.continuousStart();
    } else {
      loadingRef.current.complete();
    }
  }, [loading]);


  useEffect(() => {
    dispatch(allSellingProducts());
  }, [dispatch]);

  const handleDelete=(id)=>{
    dispatch(removeProduct(id));
  }

  return (
    <main className=" w-full bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 p-8">
      <LoadingBar className="relative top-16" color="#8B5CF6" ref={loadingRef} shadow={true} />

      <section className="max-w-6xl mx-auto bg-bgPrimary/70 backdrop-blur  p-8 space-y-6">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-7 h-7 text-primary" />
          <h1 className="text-3xl font-bold text-textPrimary">All Products</h1>
        </div>

        <p className="text-textSecondary">
          Browse and manage your inventory effortlessly. Keep track of every product with ease.
        </p>

        <div className="px-4">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 text-textPrimary text-sm font-semibold">
                  <th className="p-3 text-left border border-border">Image</th>
                  <th className="p-3 text-left border border-border">Name</th>
                  <th className="p-3 text-left border border-border">Category</th>
                  <th className="p-3 text-left border border-border">Price (₹)</th>
                  <th className="p-3 text-left border border-border">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product._id}
                    className={`transition-colors ${index % 2 === 0
                      ? "bg-bgSecondary/40 hover:bg-bgSecondary/60"
                      : "bg-transparent hover:bg-bgSecondary/50"
                      }`}
                  >
                    <td className="p-3 border border-border w-20">
                      <img
                        src={product?.images[0]}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded"
                      />
                    </td>
                    <td className="p-3 border border-border font-medium text-textPrimary">
                      {product.name}
                    </td>
                    <td className="p-3 border border-border text-textSecondary">
                      {product.category}
                    </td>
                    <td className="p-3 border w-[150px] border-border font-semibold text-textPrimary">
                      ₹{product.price}
                    </td>
                    <td className="p-3 w-[50px] border border-border">
                      <button
                      onClick={()=>handleDelete(product._id)}
                        className="bg-transparent border border-border rounded-lg text-textPrimary p-2 hover:bg-red-500 hover:border-red-400 transition-colors"
                        aria-label={`Delete ${product.name}`}
                      >
                        <X className="w-5 h-5" />
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {products.length === 0 && (
              <div className="text-center py-6 text-textSecondary">
                No products found.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
