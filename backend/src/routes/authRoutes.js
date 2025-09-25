import { Router } from "express";
import passport from "../config/passport.js";
import {
  login,
  signup,
  checkAuth,
  verifyOtp,
  requestPasswordReset,
  resetPassword,
  logout,
  updateProfile,
} from "../controllers/authController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { userToken } from "../utils/generateToken.js";
import upload from "../middlewares/multer.js"


const authRouter = Router();

authRouter.post("/signup", signup);                     
authRouter.post("/login", login);                       
authRouter.post("/verify-otp", verifyOtp);              
authRouter.get("/me", protectRoute, checkAuth);        
authRouter.post("/forgot-password", requestPasswordReset); 
authRouter.post("/reset-password", resetPassword);      
authRouter.post("/logout", protectRoute, logout);
authRouter.put("/update/profile", protectRoute, upload.single("image"), updateProfile);




authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  (req, res) => {
    userToken(req.user._id, res);
    res.redirect(process.env.FRONTEND_URL + "/auth/success");
  }
);





authRouter.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

authRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => {
    userToken(req.user._id, res);
    res.redirect(process.env.FRONTEND_URL + "/auth/success");
  }
);

export default authRouter;
