import React, { useState } from "react";
import InputField from "../components/UI/InputField";
import { User, Mail, Phone, MapPin, Home, Plus } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function CheckoutPage() {
  const [addressOption, setAddressOption] = useState("saved");
  const location = useLocation();

  const { orderDetails } = location.state || {};
  const savedAddress = {
    name: "Angech Chauhan",
    street: "123 MG Road",
    city: "Indore",
    state: "MP",
    zip: "452001",
    country: "India",
    phone: "+91-1234567890",
  };

  console.log(orderDetails);
  const deliveryCharge=45;
  const total=orderDetails.total+deliveryCharge;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-poppins">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-textPrimary mb-6">
            Delivery Information
          </h2>

          <div className="mb-6 grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setAddressOption("saved")}
              className={`flex items-center gap-3 p-2 md:p-4 border rounded-lg transition-all shadow-sm 
                ${
                  addressOption === "saved"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-bgPrimary text-textSecondary hover:border-primary"
                }`}
            >
              <Home
                className={`w-5 h-5 ${
                  addressOption === "saved" ? "text-primary" : "text-gray-500"
                }`}
              />
              <span className="font-medium">Saved Address</span>
            </button>

            <button
              type="button"
              onClick={() => setAddressOption("new")}
              className={`flex items-center gap-3 p-4 border rounded-lg transition-all shadow-sm 
                ${
                  addressOption === "new"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-bgPrimary text-textSecondary hover:border-primary"
                }`}
            >
              <Plus
                className={`w-5 h-5 ${
                  addressOption === "new" ? "text-primary" : "text-gray-500"
                }`}
              />
              <span className="font-medium">New Address</span>
            </button>
          </div>

          {addressOption === "saved" && (
            <div className="bg-bgPrimary border border-border rounded-lg p-5 shadow-sm space-y-2 text-textSecondary">
              <p className="font-medium text-textPrimary">{savedAddress.name}</p>
              <p>{savedAddress.street}</p>
              <p>
                {savedAddress.city}, {savedAddress.state} - {savedAddress.zip}
              </p>
              <p>{savedAddress.country}</p>
              <p>{savedAddress.phone}</p>
            </div>
          )}

          {addressOption === "new" && (
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField placeholder="First Name" icon={User} />
                <InputField placeholder="Last Name" icon={User} />
              </div>

              <InputField type="email" placeholder="Email" icon={Mail} />
              <InputField placeholder="Street Address" icon={MapPin} />

              <div className="grid grid-cols-2 gap-4">
                <InputField placeholder="City" icon={MapPin} />
                <InputField placeholder="State" icon={MapPin} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InputField placeholder="Zip Code" />
                <InputField placeholder="Country" />
              </div>

              <InputField type="tel" placeholder="Phone" icon={Phone} />
            </form>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-textPrimary mb-6">
            Payable Amount
          </h2>
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

            <button className="mt-6 w-full bg-primary hover:bg-accent text-white py-3 rounded-lg font-semibold transition-skin">
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
