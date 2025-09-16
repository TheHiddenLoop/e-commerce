import Stripe from "stripe";
import { Order } from "../models/order.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const sig = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
  const session = event.data.object;

  try {
    const userId = session.metadata.userId;
    const orderItems = JSON.parse(session.metadata.orderItems);
    const shippingAddress = JSON.parse(session.metadata.shippingAddress);
    const totalPrice = parseFloat(session.metadata.totalPrice);

    const newOrder = new Order({
      user: userId,
      orderItems: orderItems.map(item => ({
        product: new mongoose.Types.ObjectId(item.id), // convert to ObjectId
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        color: item.selectedColor,
        size: item.selectedSize,
      })),
      shippingAddress, // now matches schema
      paymentMethod: "Stripe",
      paymentResult: {
        id: session.payment_intent,
        status: session.payment_status,
        email_address: session.customer_email,
      },
      totalPrice,
      isPaid: true,
      paidAt: new Date(),
    });

    await newOrder.save();
    console.log("Order stored in DB:", newOrder._id);
  } catch (dbErr) {
    console.error("Error saving order:", dbErr.message);
  }
}


  res.json({ received: true });
};
