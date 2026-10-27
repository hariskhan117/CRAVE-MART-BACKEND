import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middle.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
} from "../controllers/category.controller.js";

const router = Router;

router.route("/createCategory").post(jwtVerify, createCategory);
router.route("/getAllCategory").get(jwtVerify, getAllCategory);
router.route("/deleteCategory/:categoryId").delete(jwtVerify, deleteCategory);
export default router;
