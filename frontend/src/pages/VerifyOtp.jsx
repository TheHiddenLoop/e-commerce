import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtpAuth } from "../features/authentication/authSlice";
import {
  selectAuthStatus,
  selectAuth,
  selectAuthError,
} from "../features/authentication/authSelectors";
import { useNavigate } from "react-router-dom";

export function VerifyOtp() {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const navigate = useNavigate();
  const authUser = useSelector(selectAuth);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < otp.length || otp.includes("")) {
      return;
    }
    console.log("Submitted OTP:", code);
    dispatch(verifyOtpAuth({ email: authUser.email, otp: code }));
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-bgPrimary flex justify-center items-center p-4 transition-skin">
      <form
        onSubmit={handleSubmit}
        className="bg-bgSecondary p-6 rounded-xl shadow-skin w-full max-w-sm border border-border backdrop-blur-sm"
      >
        <h1 className="text-center text-2xl font-bold text-textPrimary mb-2">
          Verify OTP
        </h1>
        <p className="text-center text-textSecondary text-xs mb-6">
          Enter the 6-digit code we sent to{" "}
          <span className="font-medium text-textPrimary">
            {authUser?.email}
          </span>
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
              className="w-10 h-12 text-center font-bold bg-bgPrimary text-textPrimary 
                         border border-border rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-primary
                         transition-skin text-lg tracking-wider"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-primary text-bgPrimary font-semibold py-3 rounded-lg 
                     transition-skin hover:scale-[1.02] active:scale-[0.98] 
                     shadow-skin text-sm"
        >
          {status === "loading" ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="text-center mt-4">
          <span className="text-textSecondary text-xs">
            Didn’t receive the code?{" "}
            <a
              href="#"
              className="text-primary hover:text-secondary font-medium transition-skin hover:underline"
            >
              Resend
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}
