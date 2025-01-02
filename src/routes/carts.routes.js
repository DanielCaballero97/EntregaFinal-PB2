import { Router } from "express";
import { CartController } from "../controllers/cart.controller.js";
import { authorization } from "../middleware/authorization.middleware.js"
import { passportCall } from "../middleware/passport.middleware.js";

const cartController = new CartController();
const router = Router();

router.post("/",passportCall('jwt'), authorization("admin"), cartController.createCart);

router.get("/:cid", passportCall('jwt'), authorization("user"), cartController.getCartById);

router.post("/:cid/product/:pid",passportCall('jwt'), authorization("user"), cartController.addProductToCart);

router.delete("/:cid/product/:pid",passportCall('jwt'), authorization("user"), cartController.deleteProductToCart);

router.put("/:cid/product/:pid",passportCall('jwt'), authorization("user"), cartController.updateQuantityProductInCart);

router.delete("/:cid",passportCall('jwt'), authorization("admin"), cartController.clearProductsToCart);

router.post("/:cid/purchase",passportCall('jwt'), authorization("user"), cartController.purchaseCart);

export default router;
