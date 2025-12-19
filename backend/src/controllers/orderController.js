import Stripe from "stripe";
import User from "../models/user.js";
import { Order, OrderTemp } from "../models/order.js";
import Product from "../models/product.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { orderItems, addressOption, shippingAddress } = req.body;
    const userId = req.user._id;

    let finalAddress;
    if (addressOption === "saved") {
      const user = await User.findById(userId).select("address");
      if (!user?.address || Object.values(user.address).some(v => !v)) {
        return res.status(400).json({ error: "No saved address found" });
      }
      finalAddress = user.address;
    } else if (addressOption === "new") {
      const required = ["address", "city", "state", "country", "postalCode", "phone"];
      if (!shippingAddress || required.some(f => !shippingAddress[f])) {
        return res.status(400).json({ error: "All shipping fields required" });
      }
      finalAddress = shippingAddress;
    } else return res.status(400).json({ error: "Invalid address option" });

    const products = await Product.find({
      _id: { $in: orderItems.map(i => i.id) }
    });
    if (products.length !== orderItems.length) {
      return res.status(400).json({ error: "Invalid product detected" });
    }

    let totalPrice = 0;
    const validatedItems = orderItems.map(item => {
      const product = products.find(p => p._id.toString() === item.id);
      totalPrice += product.price * item.quantity;
      return {
        product: product._id,
        name: product.name,
        image: product.images?.[0],
        price: product.price,
        quantity: item.quantity,
        color: item.selectedColor,
        size: item.selectedSize,
        seller: product.addedBy,
      };
    });

    const tax = Math.round(totalPrice * 0.08);
    const shippingPrice = 45;
    const finalTotal = totalPrice + tax + shippingPrice;

    const tempOrder = await OrderTemp.create({
      user: userId,
      orderItems: validatedItems,
      shippingAddress: finalAddress,
      paymentMethod: "Stripe",
      taxPrice: tax,
      shippingPrice,
      totalPrice: finalTotal,
      isPaid: false,
    });

    const lineItems = [
      ...validatedItems.map(item => ({
        price_data: { currency: "inr", product_data: { name: item.name }, unit_amount: item.price * 100 },
        quantity: item.quantity,
      })),
      { price_data: { currency: "inr", product_data: { name: "Tax (8%)" }, unit_amount: tax * 100 }, quantity: 1 },
      { price_data: { currency: "inr", product_data: { name: "Shipping" }, unit_amount: shippingPrice * 100 }, quantity: 1 },
    ];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      metadata: { tempOrderId: tempOrder._id.toString() },
      success_url: `${process.env.FRONTEND_URL}/order/history?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ error: "Checkout failed" });
  }
};


export const getAllOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const allOrders = await Order.find({ user: userId })
      .populate("orderItems.product", "category")
      .sort({ createdAt: -1 });

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

export const getOrderedItems = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ "orderItems.seller": userId })
      .populate("user", "name email")
      .populate("orderItems.product", "name image");

    const sellerBasedItems = orders.map((order) => {
      const sellerItems = order.orderItems.filter((item) =>
        item.seller.equals(userId)
      );

      return {
        orderId: order._id,
        buyer: order.user,
        shippingAddress: order.shippingAddress,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.isPaid ? "Paid" : "Unpaid",
        totalPrice: order.totalPrice,
        taxPrice: order.taxPrice,
        shippingPrice: order.shippingPrice,
        deliveryStatus: order.deliveryStatus,
        createdAt: order.createdAt,
        items: sellerItems,
      };
    });

    res.status(200).json({ success: true, sellerBasedItems });
  } catch (error) {
    console.error("Error in getOrderedItems:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { deliveryStatus } = req.body;

    const order = await Order.findOne({ _id: id });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Intems not found" });
    }

    order.deliveryStatus =
      deliveryStatus.charAt(0).toUpperCase() +
      deliveryStatus.slice(1).toLowerCase();
    await order.save();

    res.status(200).json({ success: true, message: "Status updated." });
  } catch (error) {
    console.error("Error in updateStatus:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getSellersAnalyst = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ "orderItems.seller": userId })
      .populate("user", "name email")
      .populate("orderItems.product", "name image");

    const sellerBasedItems = orders.map((order) => {
      const sellerItems = order.orderItems.filter((item) =>
        item.seller.equals(userId)
      );

      return {
        orderId: order._id,
        buyer: order.user,
        shippingAddress: order.shippingAddress,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.isPaid ? "Paid" : "Unpaid",
        totalPrice: order.totalPrice,
        taxPrice: order.taxPrice,
        shippingPrice: order.shippingPrice,
        deliveryStatus: order.deliveryStatus,
        createdAt: order.createdAt,
        items: sellerItems,
      };
    });

    const category = await Product.aggregate([
      { $match: { addedBy: userId } },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          count: 1,
        },
      },
    ]);
    const totalAmount = sellerBasedItems.reduce(
      (acc, curr) => (acc += curr.totalPrice),
      0
    );
    const totalOrders = sellerBasedItems.length;
    const netProfit = totalAmount * 1.15 - totalAmount;
    const totalUser = new Set(orders.map((o) => o.user.toString())).size;

    const sellerId = req.user._id;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const last30Chart = await Order.aggregate([
      {
        $match: {
          "orderItems.seller": sellerId,
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      { $unwind: "$orderItems" },
      { $match: { "orderItems.seller": sellerId } },

      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          totalSales: {
            $sum: { $multiply: ["$orderItems.price", "$orderItems.quantity"] },
          },
          orderIds: { $addToSet: "$_id" }, 
        },
      },

      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: {
                $dateFromParts: {
                  year: "$_id.year",
                  month: "$_id.month",
                  day: "$_id.day",
                },
              },
            },
          },
          totalSales: 1,
          orderCount: { $size: "$orderIds" },
        },
      },

      { $sort: { date: 1 } }, 
    ]);

    res
      .status(200)
      .json({
        success: true,
        totalAmount,
        totalOrders,
        netProfit: netProfit.toFixed(2),
        totalUser,
        category,
        last30Chart,
      });
  } catch (error) {
    console.error("Error in getOrderedItems:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
