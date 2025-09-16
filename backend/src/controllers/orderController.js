import Stripe from "stripe";
import mongoose from "mongoose";
import { Order } from "../models/order.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { orderItems, shippingAddress } = req.body;
    const userId = req.user._id; 

    // Step 1: Calculate total price from backend (for security)
    const totalPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Step 2: Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: orderItems.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            metadata: {
              productId: item.id,
              color: item.selectedColor,
              size: item.selectedSize,
            },
          },
          unit_amount: item.price * 100, 
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
