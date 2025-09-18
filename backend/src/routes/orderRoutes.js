import express from "express";
import { createCheckoutSession, getAllOrders } from "../controllers/orderController.js";
import { stripeWebhook } from "../controllers/webhookController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const orderRouter = express.Router();

orderRouter.post("/create-checkout-session", protectRoute, createCheckoutSession);
orderRouter.get("/all-orders", protectRoute, getAllOrders);

export default orderRouter;
