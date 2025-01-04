import { CreateQuizForm } from "@/components/customs/quiz/create-quiz-form";
import { useAuth } from "@/hooks/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

export default function Create() {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, [isAuth]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Toaster richColors />
      <CreateQuizForm className="w-[400px]" />
    </div>
  );
}
