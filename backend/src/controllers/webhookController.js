import Stripe from "stripe";
import mongoose from "mongoose";
import { Order, OrderTemp } from "../models/order.js";
import Cart from "../models/cart.js";
import Product from "../models/product.js"; // import Product to get seller

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const stripeWebhook = async (req, res) => {
  let event;
  try {
    const sig = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).send("Invalid signature");
  }

  if (event.type !== "checkout.session.completed") return res.json({ received: true });

  const session = event.data.object;
  const tempOrderId = session.metadata?.tempOrderId;
  if (!tempOrderId) return res.status(400).send("tempOrderId missing");

  try {
    const tempOrder = await OrderTemp.findById(tempOrderId);
    if (!tempOrder) return res.status(404).send("Temp order not found");

    // Idempotency check
    const existingOrder = await Order.findOne({ "paymentResult.id": session.payment_intent });
    if (existingOrder) {
      console.log("Order already processed:", existingOrder._id);
      return res.json({ received: true });
    }

    const order = await Order.create({
      user: tempOrder.user,
      orderItems: tempOrder.orderItems,
      shippingAddress: tempOrder.shippingAddress,
      paymentMethod: tempOrder.paymentMethod,
      taxPrice: tempOrder.taxPrice,
      shippingPrice: tempOrder.shippingPrice,
      totalPrice: tempOrder.totalPrice,
      isPaid: true,
      paidAt: new Date(),
      deliveryStatus: "Successful",
      paymentResult: {
        id: session.payment_intent,
        status: session.payment_status,
        email_address: session.customer_email,
      },
    });

    await OrderTemp.findByIdAndDelete(tempOrderId);
    await Cart.findOneAndDelete({ user: tempOrder.user });

    console.log("Payment confirmed for order:", order._id);
    res.json({ received: true });
  } catch (err) {
    console.error("Webhook processing failed:", err);
    res.status(500).send("Webhook failed");
  }
};

