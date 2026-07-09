import { useState, useEffect } from "react";
import API from "../api/axios";
import { motion, AnimatePresence, scale } from "framer-motion";
import {
  Receipt,
  Plus,
  User,
  Package,
  DollarSign,
  CreditCard,
  X,
} from "lucide-react";
const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [prroducts, setPrroducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [open, setOpen] = useState(false);

  const [newInvoice, setNewInvoice] = useState({
    items: [],
    discount: 0,
    tax: 0,
    paymentMethod: "cash",
    customer: "",
  });

  const fetshAll = async () => {
    try {
      const [invRes, proRes, custRes] = await Promise.all([
        API.get("/invoices"),
        API.get("/products"),
        API.get("/customers"),
      ]);
      setInvoices(invRes.data);
      setPrroducts(proRes.data);
      setCustomers(custRes.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetshAll();
  }, []);

  const addItem = () => {
    setNewInvoice({
      ...newInvoice,
      items: [...newInvoice.items, { products: "", qty: 1, total: 0 }],
    });
  };

  const updateItem = (idx, field, value) => {
    const items = [...newInvoice.items];
    items[idx][field] = field === "qty" ? parseInt(value) : value;
    const product = prroducts.find((p) => p._id === items[idx].productId); // تم تعديلها لتطابق اسم الـ state لديك prroducts

    if (product) items[idx].total = product.price * items[idx].qty;
    setNewInvoice({ ...newInvoice, items });
  };

  // 1. تم تصحيح اسم الدالة هنا لتصبح saveInvoice
  const saveInvoice = async () => {
    try {
      await API.post("/invoices", newInvoice);
      await fetshAll();
      setOpen(false);
      setNewInvoice({
        items: [],
        discount: 0,
        tax: 0,
        paymentMethod: "cash",
        customer: "",
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="pt-32 p-10 bg-[#f6f4ef] min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-10"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#C9A86A]/20 border border-{#[#C9A86A]/40 rounded-xl">
            <Receipt size={30} className="text-[#C9A86A]" />
          </div>

          <h1 className="text-4xl font-bold text-neutral-900 tracking-wide ">
            Invoices
          </h1>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setOpen(true)}
          className="px-5 py-3 flex items-center gap-2 bg-[#C9A86A] 
          text-white rounded-xl shadow-md hover:bg-[#b8965f] transt"
        >
          <Plus size={20} /> Add invoice
        </motion.button>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {/* 2. إصلاح الـ map والـ return هنا لقائمة الفواتير */}
        {invoices.map((inv) => (
          <motion.div
            key={inv._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }} // تم تعديل opacity إلى 1 لتظهر عند الـ animate
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="p-6 bg-white border border-neutral-200 rounded-2xl 
            shadow-sm hover:shadow-xl cursor-pointer transition group"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-neutral-800">
                Invoice #{inv.invoiceNumber}
              </h2>
              <DollarSign className="text-[#C9A86A]" />
            </div>
            <p className="font-medium">
              <span className="font-medium">Customer:</span>
              {""}
              {inv.customer?.name || "N/A"}
            </p>

            <p className="font-medium">
              <span className="font-medium">Items:</span>
              {""}
              {inv.items?.length}
            </p>

            <p className="text-neutral-800 font-bold mt-3 text-lg">
              {inv.finalTotal} USD
            </p>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-100"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-2xl border border-[#C9A86A]/40"
            >
              <div className="flex items-center justify-between mb-6 ">
                <h2 className="text-2xl font-bold text-neutral-900">
                  Create Invoice
                </h2>
                <button onClick={() => setOpen(false)}>
                  <X className="text-neutral-600 hover:text-red-500 transition" />
                </button>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium text-neutral-700 ">
                  Select Customer
                </label>
                <select
                  className="w-full mt-1 p-3 rounded-xl border bg-neutral-50"
                  value={newInvoice.customer}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, customer: e.target.value })
                  }
                >
                  <option value=""> No Customer</option>

                  {/* 2. إصلاح الـ map لقائمة العملاء */}
                  {customers.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Items  */}
              <div className="mb-4">
                <h3 className="font-semibold text-neutral-800 mb-2">Items</h3>
                {/* 2. إصلاح الـ map لعناصر الفاتورة */}
                {newInvoice.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 mb-3 p-3 border bg-neutral-50 rounded-xl"
                  >
                    <select
                      className="flex-1 p-2 rounded-lg"
                      value={item.productId}
                      onChange={
                        (e) => updateItem(idx, "productId", e.target.value) // تم تعديلها من isx إلى idx لتطابق الـ index
                      }
                    >
                      <option value="">Product</option>
                      {/* 2. إصلاح الـ map لقائمة المنتجات داخل الخيارات */}
                      {prroducts.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name} (${p.price})
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      className="w-24 p-2 rounded-lg border "
                      value={item.qty}
                      onChange={(e) => updateItem(idx, "qty", e.target.value)}
                    />
                    <input
                      disabled
                      className="w-28 p-2 rounded-lg border bg-white"
                      value={item.total}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={addItem}
                className="mt-2 px-4 py-2 bg-[#C9A86A] text-white rounded-xl hover:bg-[#b8965f] transition"
              >
                + Add Item
              </button>
              <div className="grig grid-cols-3 gap-4 mb-4 mt-4">
                <div>
                  <label>Discount</label>

                  <input
                    type="number"
                    className="w-full p-2 mt-1 border rounded-xl bg-neutral-50"
                    value={newInvoice.discount}
                    onChange={(e) =>
                      setNewInvoice({
                        ...newInvoice,
                        discount: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <label>Tax</label>

                  <input
                    type="number"
                    className="w-full p-2 mt-1 border rounded-xl bg-neutral-50"
                    value={newInvoice.tax}
                    onChange={(e) =>
                      setNewInvoice({
                        ...newInvoice,
                        tax: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label>Payment Method</label>
                  <select
                    className="w-full p-2 border rounded-xl bg-neutral-50"
                    value={newInvoice.paymentMethod}
                    onChange={(e) =>
                      setNewInvoice({
                        ...newInvoice,
                        paymentMethod: e.target.value,
                      })
                    }
                  >
                    <option value="cash">Cash</option>
                    <option value="visa">visa</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={saveInvoice}
                  className="px-6 py-3 bg-[#C9A86A] text-white rounded-xl 
                  shadow-lg hover:bg-[#b8965f] transition"
                >
                  Save Invoice
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Invoices;
