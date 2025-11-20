import User from "../models/user.js";
import { adminToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import { sendOTPEmail } from "../utils/email.js";
import { otpVerificationTemplate } from "../utils/emailTemplets.js";

const OTP_EXPIRY_MINUTES = 5;

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });

    const admin = await User.findOne({
      email: email.trim().toLowerCase(),
      role: "admin",
    });

    if (!admin)
      return res
        .status(404)
        .json({ success: false, message: "Admin does not exist." });

    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch)
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password." });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    admin.otp = otp;
    admin.otpExpires = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
    await admin.save();

    const otpContent = otpVerificationTemplate(otp);
    await sendOTPEmail(admin.email, "Your Admin OTP", otpContent);

    return res.status(200).json({
      success: true,
      message: "OTP sent to email for 2-step verification.",
      email: admin.email,
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const verifyAdminOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required." });

    const admin = await User.findOne({
      email: email.trim().toLowerCase(),
      role: "admin",
    });

    if (!admin)
      return res
        .status(404)
        .json({ success: false, message: "Admin not found." });

    if (admin.otp !== otp || !admin.otpExpires || admin.otpExpires < new Date())
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP." });

    admin.otp = null;
    admin.otpExpires = null;
    await admin.save();

    adminToken(admin._id, res);

    return res.status(200).json({
      success: true,
      message: "Admin verified successfully.",
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } catch (error) {
    console.error("Admin OTP verification error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("admin", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0),
      path: "/",
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ message: "Server error during logout" });
  }
};
