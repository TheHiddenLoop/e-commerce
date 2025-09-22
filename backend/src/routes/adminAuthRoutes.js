import express from "express";
import { adminLogin, checkAuth, logout, verifyAdminOtp } from "../controllers/adminAuthController.js";
import { adminProtectRoute, roleCheck } from "../middlewares/authMiddleware.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

adminRouter.post("/verify-otp", verifyAdminOtp);
adminRouter.get("/me", adminProtectRoute, roleCheck(["admin"]) ,checkAuth)
adminRouter.post("/logout", adminProtectRoute, roleCheck(["admin"]) ,logout)


export default adminRouter;
