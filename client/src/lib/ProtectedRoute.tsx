import { useAuth } from "@/hooks/user";
import { useUserStore } from "@/stores/user-store";
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { isAuth } = useAuth();
    const { setIsAuth } = useUserStore();

    if (isAuth === false) {
        setIsAuth(false);
        return <Navigate to="/login" />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
