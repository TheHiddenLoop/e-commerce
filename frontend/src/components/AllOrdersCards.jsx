import box from "../assets/box.png";

export default function AllOrdersCards({ names, user, items, address, price, status, onStatusChange }) {

  const handleSelectChange = (e) => {
    // Normalize first letter uppercase to match enum
    const newStatus = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase();
    onStatusChange(newStatus);
  };

  return (
    <div className="grid grid-cols-[80px,1fr,80px,80px,140px] items-start
                    border-2 border-border rounded-lg p-3 my-3 w-full bg-bgPrimary text-textPrimary gap-4">
      <div className="h-20 w-20">
        <img src={box} alt="product" className="h-full w-full object-cover rounded-md" />
      </div>

      <div>
        <h4 className="font-semibold">Product Name: {names}</h4>
        <div className="mt-1 text-sm">
          <h3 className="font-medium">{user}</h3>
          <p className="truncate">{address}</p>
        </div>
      </div>

      <div className="flex items-center text-sm font-medium">
        Items: {items}
      </div>

      <div className="flex items-center text-sm font-semibold">
        ₹{price}
      </div>

      <div className="flex items-center">
        <select
          name="orderStatus"
          id="orderStatus"
          defaultValue={status}  
          onChange={(e) => {
            const newStatus = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase();
            onStatusChange(newStatus);
          }}
          className="border border-border rounded-lg px-3 py-1.5 text-sm bg-bgPrimary text-textPrimary focus:ring-2 focus:ring-primary focus:outline-none"
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
          <option value="returned">Returned</option>
        </select>

      </div>
    </div>
  );
}
