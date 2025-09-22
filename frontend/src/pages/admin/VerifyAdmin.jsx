import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lock } from "lucide-react";

import { verifyOtpAuth } from "../../features/admin/adminAuth/adminAuthSlice";
import {
  selectAdmin,
  selectAdminAuthStatus,
} from "../../features/admin/adminAuth/adminAuthSelectors";

export function VerifyAdmin() {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const admin = useSelector(selectAdmin);
  const authStatus = useSelector(selectAdminAuthStatus);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, otp.length);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData
      .split("")
      .concat(Array(otp.length).fill(""))
      .slice(0, otp.length);

    setOtp(newOtp);
    const lastIndex = newOtp.findIndex((d) => d === "");
    inputRefs.current[lastIndex === -1 ? otp.length - 1 : lastIndex]?.focus();
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length < otp.length || otp.includes("")) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    setError("");

    try {
      await dispatch(
        verifyOtpAuth({ email: admin.email, otp: code })
      ).unwrap(); 

      navigate("/admin");
    } catch (err) {
      setError(err?.message || "Invalid or expired OTP.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-bgPrimary flex justify-center items-center p-6 transition-skin">
      <form
        onSubmit={handleOtpSubmit}
        className="bg-bgSecondary p-8 rounded-2xl shadow-skin w-full max-w-sm border border-border backdrop-blur-sm"
      >
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 flex items-center justify-center bg-primary/10 text-primary rounded-full">
            <ShieldCheck className="w-7 h-7" />
          </div>
        </div>

        <h1 className="text-center text-2xl font-bold text-textPrimary mb-2 flex items-center justify-center gap-2">
          <Lock className="w-5 h-5 text-primary" /> Two-Step Verification
        </h1>
        <p className="text-center text-textSecondary text-sm mb-6">
          Enter the 6-digit code sent to your device to continue.
        </p>

        <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-12 h-14 text-center font-bold bg-bgPrimary text-textPrimary 
                         border border-border rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-primary
                         transition-skin text-xl tracking-widest"
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-xs text-center mb-4">{error}</p>
        )}

        <button
          type="submit"
          disabled={authStatus === "loading"}
          className="w-full bg-primary text-bgPrimary font-semibold py-3 rounded-lg 
                     transition-skin hover:scale-[1.02] active:scale-[0.98] 
                     shadow-skin text-sm"
        >
          {authStatus === "loading" ? "Verifying..." : "Verify Code"}
        </button>

        <div className="text-center mt-4">
          <span className="text-textSecondary text-xs">
            Didn’t receive the code?{" "}
            <button
              type="button"
              onClick={() => alert("Resend OTP triggered")}
              className="text-primary hover:text-secondary font-medium transition-skin hover:underline"
            >
              Resend
            </button>
          </span>
        </div>
      </form>
    </div>
  );
}
