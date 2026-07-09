import React, { useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    purchasePrice: "",
    qty: "",
    category: "General",
    minStock: 5,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const parsedPrice = parseFloat(formData.price) || 0;
      const parsedQty = parseInt(formData.qty, 10) || 0;

      // إرسال كلا المسميين لضمان التوافق مع الـ Controller والـ Schema معاً
      const res = await axios.post("/products", {
        name: formData.name,
        price: parsedPrice,
        sellingPrice: parsedPrice,
        qty: parsedQty,
        stock: parsedQty,
        purchasePrice: parseFloat(formData.purchasePrice || formData.price),
        category: formData.category,
        minStock: parseInt(formData.minStock, 10),
      });

      if (res.status === 201 || res.status === 200) {
        setMessage("تم إضافة المنتج بنجاح!");
        setFormData({
          name: "",
          price: "",
          purchasePrice: "",
          qty: "",
          category: "General",
          minStock: 5,
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ أثناء إضافة المنتج.");
    }
  };

  return (
    <div className="p-6 bg-linear-to-b from-[#faf6ef] to-[#e8ddc9] pt-32 min-h-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl max-w-md w-full space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          إضافة منتج جديد
        </h2>

        {message && (
          <p className="text-green-600 bg-green-50 p-3 rounded-lg text-center text-sm font-medium">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-600 bg-red-50 p-3 rounded-lg text-center text-sm font-medium">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-right"
          dir="rtl"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              اسم المنتج
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-800"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                سعر البيع
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                سعر الشراء
              </label>
              <input
                type="number"
                name="purchasePrice"
                value={formData.purchasePrice}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              الكمية
            </label>
            <input
              type="number"
              name="qty"
              value={formData.qty}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-800"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                الفئة
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-800"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                الحد الأدنى
              </label>
              <input
                type="number"
                name="minStock"
                value={formData.minStock}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-neutral-900 text-white py-3 rounded-xl font-bold hover:bg-neutral-800 transition shadow-md mt-2"
          >
            إضافة المنتج ✨
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProduct;
