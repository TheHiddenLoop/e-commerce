import { Mail, Phone } from "lucide-react"
import React from "react"

const user = {
  name: "Angech Chauhan",
  email: "example@gmail.com",
  phone: "+91-1234567890",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_1lQathHbelJme68JASa3e7bkDd6J8HvP2g&s",
}

export default function UserInfo() {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 font-poppins">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-textPrimary mb-2">
          Delivery Details
        </h1>
        <p className="text-textSecondary text-base">
          Choose your delivery address and proceed to payment
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-bgPrimary rounded-2xl shadow-md p-6 border border-border">
            <div className="text-center mb-6">
              <img
                src={user.image}
                alt={user.name}
                className="w-20 h-20 rounded-full mx-auto mb-3 object-cover shadow"
              />
              <h3 className="text-xl font-semibold text-textPrimary">
                {user.name}
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-textSecondary">
                <Mail className="w-5 h-5 mr-2 text-primary" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center text-textSecondary">
                <Phone className="w-5 h-5 mr-2 text-green-500" />
                <span className="text-sm">{user.phone}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center justify-between text-sm text-textSecondary mb-2">
                <span>Delivery Progress</span>
                <span>Step 1 of 3</span>
              </div>
              <div className="w-full bg-bgSecondary rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: "33%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-bgPrimary rounded-2xl shadow-md p-6 border border-border flex items-center justify-center text-textSecondary text-base">
            Address
          </div>
        </div>
      </div>
    </div>
  )
}
