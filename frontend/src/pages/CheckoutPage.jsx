import { Check, User, MapPin, CreditCard } from "lucide-react";
import { useState } from "react";
import Payment from "../components/Payment";
import ProductOverView from "../components/ProductOverView";
import UserInfo from "../components/UserInfo";


export default function CheckoutPage() {
    const [step, setStep] = useState(1);
    const steps = [
        { number: 1, title: "Personal Information", icon: User },
        { number: 2, title: "Shipping Details", icon: MapPin },
        { number: 3, title: "Payment Information", icon: CreditCard }
    ];

    return (
        <div className="min-h-[calc(100vh-65px)] bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(249,115,22,0.1)_0%,transparent_50%)] text-textPrimary px-6 md:px-20">
            <div className="flex justify-center gap-4 md:gap-[10px] items-center mb-6 pt-4">
                {steps.map((s, index) => {
                    const Icon = s.icon;
                    const isActive = step === s.number;
                    const isCompleted = step > s.number;

                    return (
                        <div key={s.number} className="flex items-center">
                            <div
                                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-skin ${isCompleted
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
                                    className={`w-16 md:w-72 h-0.5 mx-2 transition-skin ${isCompleted ? "bg-success" : "bg-border"
                                        }`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {step === 1 && (
                <UserInfo />
            )}
            {step === 2 && (
                <ProductOverView />
            )}
            {step === 3 && (
                <Payment />
            )}

            <div className="flex justify-between mt-6 reltive bottom-10">
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
    )
}
