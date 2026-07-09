import jwt from "jsonwebtoken";

import User from "../models/User.js";
export const protectAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

export const authorizeAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.admin.role))
      return res.status(403).json({ message: "Access Denied" });
    next();
  };
};
