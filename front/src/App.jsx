import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./componants/Header";
import { AuthProvider } from "./context.js/AuthContext";
import ProtecteRoute from "./componants/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/register";
import { Notifications } from "./pages/Notfications";
import { Product } from "./pages/Product";
import Profile from "./pages/Profie";
import Invoices from "./pages/Invoices";
import Reports from "./pages/Reports";
import CreatePruduct from "./pages/CreatePruduct";
import Customer from "./pages/Customer";
import { Home } from "lucide-react";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtecteRoute>
                <Home />
              </ProtecteRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtecteRoute>
                <Notifications />
              </ProtecteRoute>
            }
          />
          <Route
            path="/product"
            element={
              <ProtecteRoute>
                <Product />
              </ProtecteRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtecteRoute>
                <Profile />
              </ProtecteRoute>
            }
          />
          <Route
            path="/invoices"
            element={
              <ProtecteRoute>
                <Invoices />
              </ProtecteRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtecteRoute>
                <Reports />
              </ProtecteRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <ProtecteRoute>
                <Customer />
              </ProtecteRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtecteRoute>
                <CreatePruduct />
              </ProtecteRoute>
            }
          />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
