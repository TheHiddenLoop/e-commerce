import { useState } from "react";
import InputField from "../components/UI/InputField";
import { Phone, MapPin, Home, Plus, Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "../features/authentication/authSelectors";
import toast from "react-hot-toast";
import { selectCheckoutStatus } from "../features/order/orderSelectors";
import { createCheckoutSession } from "../features/order/OrderSlice";


export default function CheckoutPage() {

  const authUser = useSelector(selectAuth);
  const loading = useSelector(selectCheckoutStatus);
  const dispatch = useDispatch();


  const [addressOption, setAddressOption] = useState("saved");
  const [newAddress, setNewAddress] = useState({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const location = useLocation();
  const { orderDetails } = location.state || {};
  console.log(orderDetails);
  

  const savedAddress = {
    name: authUser.name,
    address: authUser.address.address,
    city: authUser.address.city,
    state: authUser.address.state,
    postalCode: authUser.address.postalCode,
    country: authUser.address.country,
    phone: authUser.address.phone,
  };


  const deliveryCharge = 45;
  const total = orderDetails.total + deliveryCharge;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const hasSavedAddress = Object.values(authUser.address).every(val => val !== "");

  const handleCheckout = () => {
    dispatch(createCheckoutSession({ orderDetails, addressOption, savedAddress, newAddress }));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-poppins">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-textPrimary mb-6">Delivery Information</h2>

          <div className="mb-6 grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setAddressOption("saved")}
              className={`flex items-center gap-3 p-2 md:p-4 border rounded-lg transition-all shadow-sm 
                ${addressOption === "saved"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-bgPrimary text-textSecondary hover:border-primary"
                }`}
            >
              <Home className={`w-5 h-5 ${addressOption === "saved" ? "text-primary" : "text-gray-500"}`} />
              <span className="font-medium">Saved Address</span>
            </button>

            <button
              type="button"
              onClick={() => setAddressOption("new")}
              className={`flex items-center gap-3 p-4 border rounded-lg transition-all shadow-sm 
                ${addressOption === "new"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-bgPrimary text-textSecondary hover:border-primary"
                }`}
            >
              <Plus className={`w-5 h-5 ${addressOption === "new" ? "text-primary" : "text-gray-500"}`} />
              <span className="font-medium">New Address</span>
            </button>
          </div>

          {hasSavedAddress && addressOption === "saved" ? (
            <div className="bg-bgPrimary border border-border rounded-lg p-5 shadow-sm space-y-2 text-textSecondary">
              <p className="font-medium text-textPrimary">{savedAddress.name}</p>
              <p>{savedAddress.address}</p>
              <p>
                {savedAddress.city}, {savedAddress.state} - {savedAddress.postalCode}
              </p>
              <p>{savedAddress.country}</p>
              <p>{savedAddress.phone}</p>
            </div>
          ) : (addressOption === "saved" && <div className="flex items-center gap-4 bg-bgPrimary border border-border rounded-xl p-5 shadow-skin hover:shadow-skin transition-skin duration-200">
            <div className="flex-shrink-0 w-8 h-8 bg-bgPrimary border border-border rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-accent" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-textPrimary font-poppins">No Address</span>
              <span className="text-xs text-textSecondary font-poppins">Location information not provided</span>
            </div>
          </div>
          )}

          {addressOption === "new" && (
            <form className="space-y-4">
              <InputField
                row
                placeholder="Street Address"
                icon={MapPin}
                name="address"
                value={newAddress.address}
                onChange={handleChange}
              />

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  placeholder="City"
                  icon={MapPin}
                  name="city"
                  value={newAddress.city}
                  onChange={handleChange}
                />
                <InputField
                  placeholder="State"
                  icon={MapPin}
                  name="state"
                  value={newAddress.state}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  placeholder="Postal Code"
                  name="postalCode"
                  value={newAddress.postalCode}
                  onChange={handleChange}
                />
                <InputField
                  placeholder="Country"
                  name="country"
                  value={newAddress.country}
                  onChange={handleChange}
                />
              </div>

              <InputField
                type="tel"
                placeholder="Phone"
                icon={Phone}
                name="phone"
                value={newAddress.phone}
                onChange={handleChange}
              />
            </form>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-textPrimary mb-6">Payable Amount</h2>
          <div className="bg-bgPrimary border border-border rounded-lg p-6 shadow-skin space-y-3">
            <div className="flex justify-between text-textSecondary">
              <span>Subtotal</span>
              <span>₹{orderDetails.total}</span>
            </div>
            <div className="flex justify-between text-textSecondary">
              <span>Delivery Fee</span>
              <span>₹{deliveryCharge}</span>
            </div>
            <div className="flex justify-between font-semibold text-textPrimary text-lg border-t border-border pt-3">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading === "loading"}
              className={`mt-6 w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2
              ${loading === "loading"
                            ? "bg-primary cursor-not-allowed"
                            : "bg-primary hover:bg-bgSecondary"}
              text-white transition`}
            >
              {loading === "loading" ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                "Proceed To Payment"
              )}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
