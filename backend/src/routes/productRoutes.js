import { Router } from "express";
import { addProduct, allProduct, viewProduct, sellingProducts, removeProduct } from "../controllers/productControllers.js";
import upload from "../middlewares/multer.js"
import {protectRoute} from "../middlewares/authMiddleware.js"

const productRouter = Router();

productRouter.post("/add", protectRoute, upload.array("images", 5), addProduct );
productRouter.get("/all/product", protectRoute, allProduct );
productRouter.get("/view-product/:id", protectRoute, viewProduct );


//admin

productRouter.get("/all/selling/products", protectRoute, sellingProducts );
productRouter.delete("/remove/:id",protectRoute ,removeProduct)





export default productRouter;
