import Stripe from "stripe";
import User from "../models/user.js";
import { Order } from "../models/order.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { orderItems, addressOption, shippingAddress } = req.body;
    const userId = req.user._id;

    let finalAddress;

    if (addressOption === "saved") {
      const user = await User.findById(userId).select("address");
      const notEmptyeddress = Object.values(user.address).every(
        (val) => val !== ""
      );
      if (!user || !user.address || !notEmptyeddress) {
        return res
          .status(400)
          .json({ error: "No saved address found for this user" });
      }
      finalAddress = user.address;
    } else if (addressOption === "new") {
      if (
        !shippingAddress ||
        !shippingAddress.address ||
        !shippingAddress.city ||
        !shippingAddress.state ||
        !shippingAddress.postalCode ||
        !shippingAddress.country ||
        !shippingAddress.phone
      ) {
        return res
          .status(400)
          .json({ error: "All shipping address fields are required" });
      }
      finalAddress = shippingAddress;
    } else {
      return res.status(400).json({ error: "Invalid address option" });
    }

    const totalPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const tax = Math.round(totalPrice * 0.08);
    const deliveryCharge = 45;
    const finalTotal = totalPrice + deliveryCharge + tax;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        ...orderItems.map((item) => ({
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
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Delivery Charge",
            },
            unit_amount: deliveryCharge * 100,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "inr",
            product_data: { name: "Tax (8%)" },
            unit_amount: tax * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId.toString(),
        orderItems: JSON.stringify(orderItems),
        shippingAddress: JSON.stringify(finalAddress),
        totalPrice: finalTotal.toString(),
        taxPrice:tax.toString(),
      },
      success_url: `${process.env.FRONTEND_URL}/order/history?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const allOrders = await Order.find({ user: userId })
      .populate("orderItems.product", "category").sort({ createdAt: -1 });

    if (!allOrders || allOrders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Orders not found for this user." });
    }

    const formattedOrders = allOrders.map((order) => ({
      orderId: order._id,
      date: order.createdAt,
      status: order.deliveryStatus,
      totalAmount: order.totalPrice,
      paymentMethod: order.paymentMethod,
      products: order.orderItems.map((item) => ({
        id: item.product._id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
        category: item.product.category, 
      })),
    }));

    res.status(200).json({
      success: true,
      message: "All orders fetched",
      orders: formattedOrders,
    });
  } catch (error) {
    console.error("Error in getAllOrders:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
