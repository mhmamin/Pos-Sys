import express from "express";
import {
  dailyReport,
  rangeReport,
  weeklyReport,
  ropProducts,
} from "../controllers/reportsController.js";
import { protect, authorize } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", protect, authorize("manager", "admin"), dailyReport);

router.post("/daily", protect, authorize("manager", "admin"), dailyReport);
router.post("/weekly", protect, authorize("manager", "admin"), weeklyReport);
router.post("/reange", protect, authorize("manager", "admin"), rangeReport);
router.get(
  "/top-products",
  protect,
  authorize("manager", "admin"),
  ropProducts,
);

export default router;
