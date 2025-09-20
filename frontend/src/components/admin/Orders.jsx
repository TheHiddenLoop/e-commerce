import { useState } from "react";
import AllOrdersCards from "../AllOrdersCards";
import { CheckCircle, ShoppingCart } from "lucide-react"
const orders = [
  {
    name: "Wireless Headphones",
    user: "John Doe",
    items: 2,
    address: "221B Baker Street, London",
    price: 2999,
    status: "completed",
  },
  {
    name: "Gaming Laptop",
    user: "Jane Smith",
    items: 1,
    address: "742 Evergreen Terrace, Springfield",
    price: 89999,
    status: "pending",
  },
  {
    name: "Smart Watch",
    user: "Guest",
    items: 3,
    address: "No Address Provided",
    price: 4999,
    status: "cancelled",
  },
  {
    name: "Bluetooth Speaker",
    user: "Alex Carter",
    items: 1,
    address: "12 Hudson Yards, New York",
    price: 1999,
    status: "completed",
  },
];

export default function Orders() {
  const [status, setStatus] = useState("pending");

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    console.log(e.target.value); 
  };

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

       <div className="flex flex-col">
        {orders.map((order, index) => (
          <AllOrdersCards
            key={index}
            names={order.name}
            user={order.user}
            items={order.items}
            address={order.address}
            price={order.price}
            status={order.status}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
}