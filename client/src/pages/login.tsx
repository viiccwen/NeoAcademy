import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GitHubButton,
  GoogleButton,
} from "@/components/customs/user/oauth-button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/user";
import { Loader2 } from "lucide-react"; // 加入加載圖示
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { isAuth, isLoading } = useAuth();

  // Redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (isAuth) navigate("/dashboard");
  }, [isAuth]);

  return (
    <div className="flex w-full justify-center items-center h-screen">
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl">Login</h1>
            <h2
              className={cn(
                "text-sm text-gray-500",
                "animate-fade-up animate-delay-0"
              )}
            >
              Discover, Learn, Excel – The Neo Way.
            </h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "flex flex-col w-full gap-4 mt-5",
              "animate-fade animate-delay-500"
            )}
          >
            {isLoading ? (
              <div className="flex justify-center">
                <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
              </div>
            ) : (
              <>
                <GoogleButton text="Login with Google" />
                <GitHubButton text="Login with GitHub" />
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
