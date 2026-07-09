import User from "../models/User.js";
import Invoice from "../models/Invoice.js";
import Product from "../models/Project.js";

export const getDashboardStats = async (req, res) => {
  const totalAdmins = await User.countDocuments({ role: "admin" });
  const totalProducts = await Product.countDocuments();
  const totalInvoices = await Invoice.countDocuments();
  const totalSales = await Invoice.aggregate([
    { $group: { _id: null, sum: { $sum: "$finalTotal" } } },
  ]);

  res.json({
    totalAdmins,
    totalInvoices,
    totalProducts,
    totalSales: totalSales[0]?.sum || 0,
  });
};
