import MyOrdersCard from "../components/MyOrdersCard";
import { useDispatch, useSelector } from "react-redux";
import { allOrders } from "../features/order/OrderSlice";
import { selectOrder, selectOrderStatus } from "../features/order/orderSelectors";
import { useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";


export default function OrderHistory() {
  const dispatch=useDispatch();
  const loading = useSelector(selectOrderStatus);
  const loadingRef = useRef(null);

  const orders = useSelector(selectOrder);

  useEffect(() => {
    if (loading === "loading") {
      loadingRef.current.continuousStart();
    } else {
      loadingRef.current.complete();
    }
  }, [loading]);

  useEffect(()=>{
    dispatch(allOrders());
  },[dispatch]);
  

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.05)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.05)_0%,transparent_50%)] text-textPrimary px-6 md:px-20 py-8">
      <LoadingBar className="relative top-16" color="#8B5CF6" ref={loadingRef} shadow={true} />

      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">My Orders</h2>
        <p className="text-textSecondary text-sm md:text-base">
          Track and manage all your recent purchases
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="border border-border rounded-2xl shadow-skin bg-bg-[radial-gradient(circle_at_25%_85%,rgba(245,158,11,0.1)_0%,transparent_50%),radial-gradient(circle_at_75%_15%,rgba(244,63,94,0.1)_0%,transparent_50%)] p-4 md:p-6"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-6 border-b border-border pb-4">
              <div>
                <h3 className="text-sm md:text-base font-semibold">
                  Order ID:{" "}
                  <span className="text-info">#{order.orderId}</span>
                </h3>
                <p className="text-xs text-textSecondary">
                  Placed on: {new Date(order.date).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 items-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === "Delivered"
                      ? "bg-success/10 text-success"
                      : order.status === "Shipped"
                      ? "bg-warning/10 text-warning"
                      : order.status === "Cancelled"
                      ? "bg-error/10 text-error"
                      : "bg-info/10 text-info"
                  }`}
                >
                  {order.status}
                </span>

                <span className="text-sm font-medium text-success">
                  Payment: {order.paymentMethod}
                </span>
                <span className="text-sm font-bold text-primary">
                  Total: ₹{order.totalAmount}
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              {order.products.map((product) => (
                <MyOrdersCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
