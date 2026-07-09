import { useState, useEffect } from "react";
import API from "../api/axios";
import { motion } from "framer-motion";
import { Package, AlertCircle } from "lucide-react";

export const Product = () => {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/product")
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch product");
      });
  }, []);

  return (
    <div className="pt-32 min-h-screen p-10 bg-linear-to-b from-[#faf6ef] to-[#f0e5d2]">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-neutral-900 mb-10 flex items-center gap-3"
      >
        <Package size={36} className="text-[#C9A86A]" />
        Products
      </motion.h1>
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 p-3 bg-red-100 border-red-300 text-red-700 rounded-md mb-6"
        >
          <AlertCircle size={20} />
          {error}
        </motion.div>
      )}

      {product.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-neutral-600 text-lg"
        >
          No Product Found
        </motion.p>
      ) : (
        <div className="grid md-grid-cols-2 lg-grid-cols-3 gap-6">
          {product.map((p) => (
            <motion.div
              key={p_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.4 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="p-6 bg-white/90 backdrop-blur-xl border-[#C9A86A]/25 
              rounded-2xl shadow-md hover:shadow-2xl cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[#C9A86A]/10 border border-[#C9A86A]/30 rounded-xl ">
                  <Package size={28} className="text-[#C9A86A] " />
                </div>

                <h2 className="text-xl font-semibold text-neutral-800">
                  {p.name}
                </h2>
              </div>

              <p className="text-neutral-700 font-medium ">
                Purchase Price:${p.purchasePrice}
              </p>

              <p className="text-neutral-700 font-medium ">
                Selling Price:${p.sellingPrice}
              </p>

              <p className="text-neutral-500 mt-1">Stock:{p.stoct}</p>
              <p className="text-neutral-500 mt-1">Category:{p.category}</p>

              {p.stoct < p.minStock && (
                <p className="mt-2 text-sm text-red-600 font-semibold">
                  Low Stock! Min: {p.minStock}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
