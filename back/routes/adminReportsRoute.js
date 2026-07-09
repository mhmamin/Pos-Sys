import express from "express";
import { protect, authorize } from "../middlewares/auth.js";
import { dailyReport } from "../controllers/reportsController.js";

const router = express.Router();

router.get("/", protect, authorize("manager", "admin"), dailyReport);

export default router;
