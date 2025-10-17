import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import session from "express-session";
import cookieparser from "cookie-parser"
import passport from "./config/passport.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import { stripeWebhook } from "./controllers/webhookController.js";
import adminRouter from "./routes/adminAuthRoutes.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cookieparser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.post(
  "/api/v1/order/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);
app.use(express.json());

app.use(passport.initialize());


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product",  productRouter);
app.use("/api/v1/cart",  cartRouter);
app.use("/api/v1/order",  orderRouter);
app.use("/api/v1/admin",  adminRouter);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


app.get("/", (req, res) => {
  res.send("API is running...");
});



app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
