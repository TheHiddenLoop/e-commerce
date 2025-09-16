import express from "express";
import { createCheckoutSession } from "../controllers/orderController.js";
import { stripeWebhook } from "../controllers/webhookController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const orderRouter = express.Router();

orderRouter.post("/create-checkout-session", protectRoute, createCheckoutSession);
orderRouter.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

export default orderRouter;
