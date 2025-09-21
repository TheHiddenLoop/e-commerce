import express from "express";
import { createCheckoutSession, getAllOrders, getOrderedItems, updateStatus } from "../controllers/orderController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const orderRouter = express.Router();

orderRouter.post("/create-checkout-session", protectRoute, createCheckoutSession);
orderRouter.get("/all-orders", protectRoute, getAllOrders);
orderRouter.get("/ordred/items", protectRoute, getOrderedItems);
orderRouter.patch("/update/:id/status", protectRoute, updateStatus);

export default orderRouter;
