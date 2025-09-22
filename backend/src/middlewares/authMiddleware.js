import jwt from "jsonwebtoken";
import User from "../models/user.js";


export async function protectRoute(req, res, next){
  try {
    const token = req.cookies.jwt;    

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message, error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export async function adminProtectRoute(req, res, next){
  try {
    const token = req.cookies.admin;    

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden - Not an Admin" });
    }


    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message, error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const roleCheck = (allowedRoles = []) => {
  return (req, res, next) => {
    const user = req.user; 

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - No user found" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden - Insufficient permissions" });
    }

    next();
  };
};