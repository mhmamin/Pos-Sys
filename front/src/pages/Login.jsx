import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";

const Login = () => {
  const { login, token } = useContext(AuthContext);
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      await login(email, password);
      nav("/");
    } catch (err) {
      setErr(
        err.response?.data?.message ||
          err.response?.data?.massage ||
          "Login Failed",
      );
    }
  };

  return (
    <div
      className="pt-22 min-h-screen bg-linear-to-b 
  from-[#faf6ef] to-[#f0e5d2] flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md bg-white/70 backdrop-blur-xl border-[#C9A86A]/30
        rounded-3-xl shadow-2xl p-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 rounded-2xl bg-[#C9A86A]/20 border-[#C9A86A]/30 mb-3">
            <Lock size={36} className="text-[#C9A86A]" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900">
            Login To Your Account
          </h1>
          <p className="text-neutral-600 mt-2 text-center">
            Enter Your Email And password To Access To Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="text-neutral-800 font-medium">Email</label>
            <div
              className="flex items-center border border-neutral-300 rounded-xl p-2
             bg-white shadow-sm focus-within:border-[#C9A86A] transition"
            >
              <User size={20} className="text-[#C9A86A] mr-2" />
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

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="text-neutral-800 font-medium">Password</label>
            <div
              className="flex items-center border border-neutral-300 rounded-xl p-2
             bg-white shadow-sm focus-within:border-[#C9A86A] transition"
            >
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

          {err && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm"
            >
              {err}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="mt-4 py-3 bg-[#C9A86A] font-semibold rounded-xl hover:shadow-bg-[#b8965f] transition text-lg cursor-pointer"
          >
            Login
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center text-neutral-600 text-sm"
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
