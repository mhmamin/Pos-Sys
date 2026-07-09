console.log(" test run ");
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoute from "./routes/userAuthRoute.js";
import authRoutes from "./routes/adminAuthRoute.js";
import adminUsersRoutes from "./routes/adminUsersRoute.js";
import adminDashboardRoutes from "./routes/adminDashboardRoute.js";
import adminProjectsRoutes from "./routes/adminProjectsRoute.js";
import adminTransactionsRoutes from "./routes/adminTransactionsRoute.js";
import adminNotificationsRoutes from "./routes/adminNotificationRoute.js";
import productRoutes from "./routes/productRoute.js";
import invoiceRoutes from "./routes/invoiceRoute.js";
import customerRoutes from "./routes/customerRoute.js";
import reportsRoutes from "./routes/reportsRoute.js";
import notificationRoutes from "./routes/notificationRoute.js";
import settingsRoutes from "./routes/settingsRoute.js";
import userAuthRoutes from "./routes/userAuthRoute.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://pos-sys-blond.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// Base Route
app.get("/", (req, res) => res.json({ message: "API is running..." }));

// Admin Routes
app.use("/api/admin/auth", authRoute);
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/admin/projects", adminProjectsRoutes);
app.use("/api/admin/transactions", adminTransactionsRoutes);
app.use("/api/admin/notifications", adminNotificationsRoutes);
app.use("/api/admin/settings", settingsRoutes);
app.use("/api/admin/reports", reportsRoutes);

// General Routes
app.use("/api/auth", userAuthRoutes);
app.use("/api/products", productRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/admin/reports", reportsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/settings", settingsRoutes);

// 404 Not Found Middleware
app.use((req, res) => res.status(404).json({ message: "Route Not Found" }));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

// Database Connection and Server Port
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
