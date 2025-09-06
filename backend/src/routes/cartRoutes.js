import { Router } from "express";
import { addCart, allCart, deleteCart } from "../controllers/cartController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const cartRouter = Router();

cartRouter.post("/add", protectRoute, addCart );
cartRouter.get("/all", protectRoute, allCart);
cartRouter.delete("/remove/:id", protectRoute, deleteCart);



export default cartRouter;
