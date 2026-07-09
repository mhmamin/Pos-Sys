import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectUser = async (req, res, next) => {
  try {
    // قراءة التوكن من الكوكيز
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized, no token found" });
    }

    // فك التشفير
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // جلب المستخدم بدون الباسورد
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (err) {
    // 💡 هذا السطر سيخبرك فوراً في الـ Terminal إذا كانت المشكلة من صلاحية التوكن أو الـ Secret Key
    console.error("Auth Middleware Error:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
