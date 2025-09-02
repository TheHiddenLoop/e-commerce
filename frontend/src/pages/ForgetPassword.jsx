import { useState } from "react";
import { Mail } from "lucide-react";
import {Link} from "react-router-dom";

export function ForgetPassword() {
  const [formData, setFormData] = useState({ email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) return;
    console.log("Reset link sent to:", formData.email);
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-bgPrimary flex justify-center items-center p-4 transition-skin">
      <form
        onSubmit={handleSubmit}
        className="bg-bgSecondary p-6 rounded-xl shadow-skin w-full max-w-sm border border-border backdrop-blur-sm"
      >
        <h1 className="text-center text-2xl font-bold text-textPrimary mb-2">
          Forget Password
        </h1>
        <p className="text-center text-textSecondary text-xs mb-6">
          Enter your email to receive a password reset link
        </p>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-textPrimary font-medium mb-2 text-xs"
          >
            Email Address
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-bgPrimary border border-border text-textPrimary focus:border-primary focus:ring-1 focus:ring-[var(--bg-glass)] outline-none transition-skin placeholder-textSecondary/60 text-sm"
            />
            <Mail className="absolute left-3 top-3 w-4 h-4 text-textSecondary" />
          </div>
        </div>


        <button
          type="submit"
          className="w-full bg-primary text-textPrimary font-semibold py-3 rounded-lg transition-skin focus:outline-none transform hover:scale-[1.02] active:scale-[0.98] mb-6 shadow-skin text-sm"
        >
          Send Reset Link
        </button>

        <div className="text-center">
          <span className="text-textSecondary text-xs">
            Don&apos;t have an account?{" "}
            <Link
              to={"/signup"}
              className="text-primary hover:text-secondary font-medium transition-skin hover:underline"
            >
              Sign up
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
