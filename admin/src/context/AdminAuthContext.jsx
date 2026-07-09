import { useState, Children, useEffect, createContext } from "react";
import axios from "../api/axios";

export const AdminAuthContext = createContext();

export const AdminAuthProvaider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get("/admin/auth/me", {
          withCredentials: true,
        });
        setAdmin(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAdminData();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "/admin/auth/login",
        { email, password },
        { withCredentials: true },
      );
      setAdmin(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/admin/auth/logout", { withCredentials: true });
      setAdmin(null);
    } catch (err) {
      console.error(err);
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const res = await axios.post(
        "/admin/auth/register",
        { name, email, password, role },
        { withCredentials: true },
      );
      setAdmin(res.data.admin);
      setError(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{ admin, error, setError, setAdmin, login, logout, register }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthProvaider;
