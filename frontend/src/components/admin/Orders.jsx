import { useEffect } from "react";
import AllOrdersCards from "../AllOrdersCards";
import { CheckCircle, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { orderesApi, updateStatus } from "../../features/admin/adminSlice";
import { selectOrders } from "../../features/admin/adminSelectores";

export default function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(orderesApi()); 
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    console.log(orderId);
    
    dispatch(updateStatus({ id: orderId, status: newStatus }));
  };
        console.log(orders);


  return (
    <div className="px-14 py-8">
      <div className="flex items-start flex-col gap-3 mb-8">
        <div className="flex items-center gap-3">
          <ShoppingCart className="text-primary w-8 h-8" />
          <div>
            <h1 className="text-3xl font-bold text-textPrimary">All Orders</h1>
          </div>
        </div>
        <p className="text-sm text-textSecondary">
          <CheckCircle className="inline w-4 h-4 mr-1 text-success" />
          Track and manage all your orders from a single place
        </p>
      </div>

      

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <AllOrdersCards
            key={order.orderId}
            names={order.items.map((item) => item.name).join(", ") || ""}
            user={order.buyer?.name || ""}
            items={order.items.reduce((sum, curr) => sum + curr.quantity, 0)}
            address={Object.values(order.shippingAddress).join(", ")}
            price={order.totalPrice || 0}
            status={order.deliveryStatus || ""}
            onStatusChange={(newStatus) => handleStatusChange(order.orderId, newStatus)}
          />
        ))}
      </div>
    </div>
  );
}
