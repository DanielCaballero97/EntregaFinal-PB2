import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { checkProductData } from "../middleware/checkProductData.middleware.js";
import { passportCall } from "../middleware/passport.middleware.js";
import { authorization } from "../middleware/authorization.middleware.js";

const productController = new ProductController();
const router = Router();

router.get("/",passportCall('jwt'), authorization("user"), productController.getAll);

router.get("/:pid",passportCall('jwt'), authorization("user"), productController.getById);

router.delete("/:pid", passportCall('jwt'), authorization('admin') ,productController.deleteOne);

router.put("/:pid", passportCall('jwt'), authorization('admin'), productController.update);

router.post("/", checkProductData, passportCall('jwt'), authorization('admin'), productController.create);
export default router;
