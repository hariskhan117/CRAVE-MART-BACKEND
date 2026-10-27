import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middle";
import {
  createProduct,
  getAllProduct,
} from "../controllers/product.controller";

const router = Router();

router.route("/createProduct").post(jwtVerify, createProduct);
router.route("/getAllProduct").get(jwtVerify, getAllProduct);

export default router;
