import { useAuth } from "@/hooks/user";
import { useUserStore } from "@/stores/user-store";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Auth = () => {
  const { token } = useParams();
  const { setToken } = useUserStore();
  const { isAuth, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setToken(token);
    }
    if (!isLoading && !isAuth) {
        navigate("/login");
    }
    if(!isLoading && isAuth){
      navigate("/dashboard");
    }
  }, [isAuth, isLoading, token]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        Loading...
        <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
      </div>
    );
  }

  return null;
};
