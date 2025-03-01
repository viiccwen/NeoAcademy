import { useAuth } from "@/hooks/user";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuth } = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
