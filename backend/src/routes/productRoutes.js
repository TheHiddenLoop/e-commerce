import { Router } from "express";
import { addProduct, allProduct } from "../controllers/productControllers.js";
import upload from "../middlewares/multer.js"
import {protectRoute} from "../middlewares/authMiddleware.js"

const productRouter = Router();

productRouter.post("/add", protectRoute, upload.array("images", 5), addProduct );
productRouter.get("/all/product", protectRoute, allProduct );



export default productRouter;
