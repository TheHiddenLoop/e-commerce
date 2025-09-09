import React, { useState } from "react";
import { Check, User, MapPin, CreditCard } from "lucide-react";

export default function StepForm() {
  const [step, setStep] = useState(1);

  const steps = [
    { number: 1, title: "Personal Information", icon: User },
    { number: 2, title: "Shipping Details", icon: MapPin },
    { number: 3, title: "Payment Information", icon: CreditCard }
  ];

  return (
    <div className="max-w-lg mx-auto p-6 bg-bgPrimary text-textPrimary shadow-skin rounded-2xl border border-border">
      <div className="flex justify-between items-center mb-6">
        {steps.map((s, index) => {
          const Icon = s.icon;
          const isActive = step === s.number;
          const isCompleted = step > s.number;

          return (
            <div key={s.number} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-skin ${
                  isCompleted
                    ? "bg-success border-success text-white"
                    : isActive
                    ? "bg-primary border-primary text-white"
                    : "border-border text-textSecondary"
                }`}
              >
                {isCompleted ? <Check size={20} /> : <Icon size={20} />}
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 mx-2 transition-skin ${
                    isCompleted ? "bg-success" : "bg-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {step === 1 && (
        <div className="p-6 text-center">
          📄 <span className="font-semibold">This is Page 1:</span> Personal Info
        </div>
      )}
      {step === 2 && (
        <div className="p-6 text-center">
          🚚 <span className="font-semibold">This is Page 2:</span> Shipping Details
        </div>
      )}
      {step === 3 && (
        <div className="p-6 text-center">
          💳 <span className="font-semibold">This is Page 3:</span> Payment Info
        </div>
      )}

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 bg-bgSecondary text-textPrimary border border-border rounded-lg hover:bg-secondary hover:text-white transition-skin"
          >
            Prev
          </button>
        )}
        <button
          onClick={() => setStep(step < 3 ? step + 1 : step)}
          className="px-4 py-2 bg-primary text-white rounded-lg ml-auto hover:bg-secondary transition-skin"
        >
          {step < 3 ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  );
}
