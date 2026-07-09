import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtecteRoute({ children }) {
  // hooks

  const { user, loading } = useContext(AuthContext);
  console.log("AuthContext value is:", AuthContext);
  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
