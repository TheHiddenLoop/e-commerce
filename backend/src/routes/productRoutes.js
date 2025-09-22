import { Router } from "express";
import { addProduct, allProduct, viewProduct, sellingProducts, removeProduct } from "../controllers/productControllers.js";
import upload from "../middlewares/multer.js"
import {protectRoute, adminProtectRoute, roleCheck} from "../middlewares/authMiddleware.js"

const productRouter = Router();

productRouter.post("/add", adminProtectRoute, roleCheck(["admin"]), upload.array("images", 5), addProduct );
productRouter.get("/all/product", protectRoute, allProduct );
productRouter.get("/view-product/:id", protectRoute, viewProduct );


//admin

productRouter.get("/all/selling/products", adminProtectRoute, roleCheck(["admin"]) ,sellingProducts );
productRouter.delete("/remove/:id",adminProtectRoute, roleCheck(["admin"]) ,removeProduct)





export default productRouter;
