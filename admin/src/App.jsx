import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import Users from "./pages/Users";
import Sales from "./pages/Sales";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";
import { Children } from "react";
import { useContext } from "react";
import Header from "./componants/Header";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import Prodect from "./pages/Prodect";
import Invoices from "./pages/Invoices";
import Report from "./pages/Report";
import CreateProduct from "./pages/CreateProduct";
import AdminAuthProvaider, {
  AdminAuthContext,
} from "./context/AdminAuthContext";
import { Customers } from "./pages/Customers";

const ProtectedRoute = ({ children }) => {
  const { admin, loading, error } = useContext(AdminAuthContext);

  if (loading) {
    return <div>Laoding...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!admin) {
    return <AdminLogin />;
  }

  return children;
};

export default function App() {
  return (
    <AdminAuthProvaider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sales"
            element={
              <ProtectedRoute>
                <Sales />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product"
            element={
              <ProtectedRoute>
                <Prodect />
              </ProtectedRoute>
            }
          />

          <Route
            path="/invoices"
            element={
              <ProtectedRoute>
                <Invoices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <Customers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create/products"
            element={
              <ProtectedRoute>
                <CreateProduct />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </AdminAuthProvaider>
  );
}
