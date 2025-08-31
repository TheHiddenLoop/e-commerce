import { useState } from "react"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"

export function Signup() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData]=useState({
    name:"",
    email:"",
    password:""
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
    
    console.log("Form submitted")
  }

  return (
    <div className="min-h-screen bg-bgPrimary flex justify-center items-center p-4 transition-skin">
      <div className="bg-bgSecondary p-6 rounded-xl shadow-skin w-full max-w-sm border border-border backdrop-blur-sm">
        <h1 className="text-center text-2xl font-bold text-textPrimary mb-2">
          Create Account
        </h1>
        <p className="text-center text-textSecondary text-xs mb-6">
          Sign up to get started
        </p>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-textPrimary font-medium mb-2 text-xs"
          >
            Full Name
          </label>
          <div className="relative">
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e)=>setFormData({...formData, name:e.target.value})}
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-bgPrimary border border-border text-textPrimary focus:border-primary focus:ring-1 focus:ring-[var(--bg-glass)] outline-none transition-skin placeholder-textSecondary/60 text-sm"
            />
            <User className="absolute left-3 top-3 w-4 h-4 text-textSecondary" />
          </div>
        </div>

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
              onChange={(e)=>setFormData({...formData, email:e.target.value})}
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
              onChange={(e)=>setFormData({...formData, password:e.target.value})}
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
          <a
            href="#"
            className="text-primary hover:text-secondary text-xs font-medium transition-skin hover:underline"
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg transition-skin focus:outline-none transform hover:scale-[1.02] active:scale-[0.98] mb-6 shadow-skin text-sm"
        >
          Sign Up
        </button>

        <div className="flex items-center mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="px-2 text-textSecondary text-xs font-medium">
            or continue with
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <img
            src="/google.png"
            alt="Google Login"
            className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
          />
          <img
            src="/facebook.png"
            alt="Facebook Login"
            className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
          />
        </div>

        <div className="text-center">
          <span className="text-textSecondary text-xs">
            Already have an account?{" "}
            <a
              href="#"
              className="text-primary hover:text-secondary font-medium transition-skin hover:underline"
            >
              Sign in
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}
