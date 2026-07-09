import express from "express";

// استيراد الدوال الأساسية من الـ Controller القديم
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { createProduct as createAdminProduct } from "../controllers/adminProductController.js";

import { protect, authorize } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", protect, authorize("admin", "manager"), createProduct);

router.post(
  "/admin",
  protect,
  authorize("admin", "manager"),
  createAdminProduct,
);

router.get("/", protect, getProducts);
router.put("/:id", protect, authorize("admin", "manager"), updateProduct);
router.delete("/:id", protect, authorize("admin", "manager"), deleteProduct);

export default router;
