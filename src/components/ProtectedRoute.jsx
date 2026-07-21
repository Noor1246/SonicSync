import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  // Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }


  // Admin page protection
  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" />;
  }


  return children;
};

export default ProtectedRoute;