import { useUserStore } from "@/stores/user-store";
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { expiry, setIsAuth } = useUserStore();

    if (expiry < Date.now()) {
        setIsAuth(false);
        return <Navigate to="/login" />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
