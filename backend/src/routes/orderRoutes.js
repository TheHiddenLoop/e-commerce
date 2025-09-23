import express from "express";
import { createCheckoutSession, getAllOrders, getOrderedItems, getSellersAnalyst, updateStatus } from "../controllers/orderController.js";
import { adminProtectRoute, protectRoute, roleCheck } from "../middlewares/authMiddleware.js";

const orderRouter = express.Router();

orderRouter.post("/create-checkout-session", protectRoute, createCheckoutSession);
orderRouter.get("/all-orders", protectRoute, getAllOrders);
orderRouter.get("/ordred/items", adminProtectRoute, roleCheck(["admin"]), getOrderedItems);
orderRouter.patch("/update/:id/status", adminProtectRoute, roleCheck(["admin"]), updateStatus);
orderRouter.get("/analytical/data", adminProtectRoute, roleCheck(["admin"]), getSellersAnalyst);

export default orderRouter;
