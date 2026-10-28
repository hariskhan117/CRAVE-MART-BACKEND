import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middle.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/createProduct").post(jwtVerify, createProduct);
router.route("/getAllProduct").get(jwtVerify, getAllProduct);
router.route("/deleteProduct/:productId").get(jwtVerify, deleteProduct);

export default router;
