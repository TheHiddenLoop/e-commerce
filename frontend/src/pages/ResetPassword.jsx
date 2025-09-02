import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

export function ResetPassword() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.password || !formData.confirmPassword) return;
    if (formData.password !== formData.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    console.log("Password reset successfully:", formData.password);
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-bgPrimary flex justify-center items-center p-4 transition-skin">
      <form
        onSubmit={handleSubmit}
        className="bg-bgSecondary p-6 rounded-xl shadow-skin w-full max-w-sm border border-border backdrop-blur-sm"
      >
        <h1 className="text-center text-2xl font-bold text-textPrimary mb-2">
          Reset Password
        </h1>
        <p className="text-center text-textSecondary text-xs mb-6">
          Enter your new password to continue
        </p>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-textPrimary font-medium mb-2 text-xs"
          >
            New Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={"password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter new password"
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-bgPrimary border border-border text-textPrimary focus:border-primary focus:ring-1 focus:ring-[var(--bg-glass)] outline-none transition-skin placeholder-textSecondary/60 text-sm"
            />
            <Lock className="absolute left-3 top-3 w-4 h-4 text-textSecondary" />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-textPrimary font-medium mb-2 text-xs"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={isVisible ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="Re-enter new password"
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-bgPrimary border border-border text-textPrimary focus:border-primary focus:ring-1 focus:ring-[var(--bg-glass)] outline-none transition-skin placeholder-textSecondary/60 text-sm"
            />
            <Lock className="absolute left-3 top-3 w-4 h-4 text-textSecondary" />
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="absolute right-3 top-3 text-textSecondary hover:text-textPrimary focus:outline-none transition-skin"
              aria-label={isVisible ? "Hide password" : "Show password"}
            >
              {isVisible ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-textPrimary font-semibold py-3 rounded-lg transition-skin focus:outline-none transform hover:scale-[1.02] active:scale-[0.98] mb-6 shadow-skin text-sm"
        >
          Reset Password
        </button>

        <div className="text-center">
          <span className="text-textSecondary text-xs">
            Back to{" "}
            <a
              href="/login"
              className="text-primary hover:text-secondary font-medium transition-skin hover:underline"
            >
              Sign in
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}
