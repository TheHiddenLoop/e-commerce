import User from "../models/user.js";
import { userToken } from "../utils/generateToken.js"
import bcrypt from "bcryptjs"
import { sendOTPEmail } from "../utils/email.js"
import { otpVerificationTemplate, passwordResetSuccessTemplate, resetPasswordTemplate, supportEmailTemplate } from "../utils/emailTemplets.js";
import { cloudinary } from "../utils/cloudinary.js";
import streamifier from "streamifier";

const SALT_ROUNDS = 10;
const OTP_EXPIRY_MINUTES = 5;

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }

    const existingUser = await User.findOne({ email });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    if (!existingUser) {
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpires,
        isVerified: false,
      });

      const otpContent=otpVerificationTemplate(otp);

      await sendOTPEmail(email,"Your One-Time Password (OTP) for Verification" ,otpContent);

      return res.status(201).json({
        success: true,
        message: "User registered. OTP sent to email.",
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          isVerified: false,
      });
    }

    if (!existingUser.isVerified) {
      existingUser.name = name;
      existingUser.password = hashedPassword;
      existingUser.otp = otp;
      existingUser.otpExpires = otpExpires;
      await existingUser.save();

      await sendOTPEmail(email, otp);

      return res.status(200).json({
        success: true,
        message: "User updated. OTP re-sent to email.",
          _id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
      });
    }

    return res.status(409).json({
      success: false,
      message: "User already exists and is verified. Please sign in.",
    });

  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};




export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist.",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "User is not verified. Please verify your account.",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    userToken(user._id, res);

    return res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name.charAt(0).toUpperCase() + user.name.slice(1)}!`,
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;    

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const isOtpValid = user.otp === otp;
    const isOtpExpired = user.otpExpires < new Date();

    if (!isOtpValid || isOtpExpired) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP.",
      });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;

    await user.save();
    
    userToken(user._id, res);//for token verification
    
    return res.status(200).json({
      success: true,
      message: "Account verified successfully.",
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified
    });

  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
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



const generateToken2 = () => {
  return [...Array(30)].map(() => Math.random().toString(36)[2]).join("");
};

export const requestPasswordReset=async(req, res)=>{
  try {
    const { email } = req.body;

    if (!email ) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist.",
      });
    }
    const token=generateToken2();
    user.resetPasswordToken=token;
    user.resetPasswordExpires= Date.now() + 3600000; 
    await user.save();

    const resetLink=`${process.env.FRONTEND_URL}/reset-password/${token}`
    console.log(resetLink);
    
    await sendOTPEmail(user.email,"Reset Your Password – Action Required",resetPasswordTemplate(resetLink))

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email"
    });

  } catch (error) {
    console.error("Request password link error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
}

export const resetPassword=async (req, res) => {
  try {
    const { token, password } = req.body;
    
    if (!token || !password ) {
      return res.status(400).json({
        success: false,
        message: "Token and password are required.",
      });
    }

    const user=await User.findOne({
      resetPasswordToken:token,
      resetPasswordExpires:{ $gt: Date.now() }
    })
    

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    user.password=await bcrypt.hash(password,SALT_ROUNDS);
    user.resetPasswordToken=null;
    user.resetPasswordExpires=null;
    await user.save();
    
  
    
    await sendOTPEmail(user.email,"Your Password Has Been Successfully Reset",passwordResetSuccessTemplate())

    return res.status(200).json({
      success: true,
      message: "Password reset successful"
    });

  } catch (error) {
    console.error("Request password link error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
}

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ success:true, message: "Logged out successfully" });
  } catch (error) {
    console.error('Logout error:', error.message);
    res.status(500).json({ message: 'Server error during logout' });
  }
};


function uploadToCloudinary(fileBuffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: "products" }, (error, result) => {
      if (error) reject(error); else resolve(result);
    });
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
}


export const updateProfile = async (req, res) => {
  try {
    const { name, phone, dob, address, city, state, postalCode, country } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      user.profilePic = result.secure_url;
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (dob) user.dob = dob;

    if (address || city || state || postalCode || country || phone) {
      user.address = {
        address: address || user.address?.address,
        city: city || user.address?.city,
        state: state || user.address?.state,
        postalCode: postalCode || user.address?.postalCode,
        country: country || user.address?.country,
        phone:phone || user.address?.phone
      };
    }

    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error during profile update" });
  }
};


export const supportUser = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const body = supportEmailTemplate(name, email, message);

    await sendOTPEmail(
      process.env.SUPPORT_EMAIL,
      `New Support Request from ${name}`,
      body
    );


    res.status(200).json({
      success: true,
      message: "Support message sent successfully!",
    });
  } catch (error) {
    console.error("Support user error:", error);
    res.status(500).json({ message: "Server error while sending support message" });
  }
};
