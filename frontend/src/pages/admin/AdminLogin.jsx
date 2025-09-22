import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signinAuth } from "../../features/admin/adminAuth/adminAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAdminAuthStatus } from "../../features/admin/adminAuth/adminAuthSelectors";

export function AdminLogin() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const status = useSelector(selectAdminAuthStatus);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(signinAuth(formData)).unwrap();
      navigate("/admin/verify");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };


  return (
    <div className=" min-h-[calc(100vh-65px)] bg-bgPrimary flex justify-center items-center p-4 transition-skin">
      <div className="bg-bgSecondary p-6 rounded-xl shadow-skin w-full max-w-sm border border-border backdrop-blur-sm">
        <h1 className="text-center text-2xl font-bold text-textPrimary mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-textSecondary text-xs mb-6">
          Sign in to continue
        </p>

        <form onSubmit={handleSubmit}>
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

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-textPrimary font-medium mb-2 text-xs"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={isVisible ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
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

          <div className="mb-6 text-right">
            <Link
              to={"/forget-password"}
              className="text-primary hover:text-secondary text-xs font-medium transition-skin hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-primary text-white font-semibold py-3 rounded-lg transition-skin focus:outline-none transform hover:scale-[1.02] active:scale-[0.98] mb-6 shadow-skin text-sm"
          >
            {status === "loading" ? "Signing..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
