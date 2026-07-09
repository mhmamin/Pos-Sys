import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // تأكد من صحة مسار المجلد لديك (context.js أم context)
import { motion } from "framer-motion";
import { Lock, User, Mail } from "lucide-react";

const Register = () => {
  // 1. حذف الـ token لأن الـ Context أصبح يدير الكوكيز داخلياً
  const { register } = useContext(AuthContext);
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(""); // تفريغ الأخطاء السابقة عند محاولة التسجيل الجديدة

    try {
      // 2. تصحيح طريقة كتابة الـ await والتوجيه
      await register(name, email, password);
      nav("/");
    } catch (error) {
      // 3. تصحيح الخطأ الإملائي من massage إلى message
      setErr(error.response?.data?.message || "Register Failed");
    }
  };

  return (
    <div className="pt-25 min-h-screen bg-linear-to-b from-[#faf6ef] to-[#f0e5d2] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }} // تصحيح إملائي: transtion -> transition
        className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-[#C9A86A]/30 rounded-3xl shadow-2xl p-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 rounded-2xl bg-[#C9A86A]/20 border border-[#C9A86A]/30 mb-3">
            <Lock size={36} className="text-[#C9A86A]" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900">
            Create Your Account
          </h1>
          <p className="text-neutral-600 mt-2 text-center">
            Register To Access The Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* حقل الاسم */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="text-neutral-800 font-medium mb-1 block">
              Name
            </label>
            <div className="flex items-center border border-neutral-300 rounded-xl p-2 bg-white shadow-sm focus-within:border-[#C9A86A] transition">
              <User size={20} className="text-[#C9A86A] mr-2" />
              <input
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="w-full outline-none p-2 bg-transparent"
                placeholder="saad"
              />
            </div>
          </motion.div>

          {/* حقل الإيميل */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="text-neutral-800 font-medium mb-1 block">
              Email
            </label>
            <div className="flex items-center border border-neutral-300 rounded-xl p-2 bg-white shadow-sm focus-within:border-[#C9A86A] transition">
              {/* تم تغيير الأيقونة هنا إلى Mail لتناسب الحقل بدلاً من Lock */}
              <Mail size={20} className="text-[#C9A86A] mr-2" />
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none p-2 bg-transparent"
                placeholder="you@example.com"
              />
            </div>
          </motion.div>

          {/* حقل الباسورد */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="text-neutral-800 font-medium mb-1 block">
              Password
            </label>
            <div className="flex items-center border border-neutral-300 rounded-xl p-2 bg-white shadow-sm focus-within:border-[#C9A86A] transition">
              <Lock size={20} className="text-[#C9A86A] mr-2" />
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none p-2 bg-transparent"
                placeholder="........"
              />
            </div>
          </motion.div>

          {/* عرض الخطأ إن وجد */}
          {err && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm font-medium"
            >
              {err}
            </motion.p>
          )}

          {/* زر التسجيل */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }} // تصحيح إملائي: whileTop -> whileTap
            type="submit"
            className="mt-4 py-3 bg-[#C9A86A] text-white font-semibold rounded-xl hover:bg-[#b8965f] transition duration-200 text-lg shadow-md cursor-pointer"
          >
            Register
          </motion.button>
        </form>

        {/* رابط التوجيه لصفحة تسجيل الدخول */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-neutral-600 text-sm"
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#C9A86A] font-semibold hover:underline"
          >
            Login here
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
