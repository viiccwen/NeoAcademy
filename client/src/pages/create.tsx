import { CreateQuizForm } from "@/components/customs/quiz/create-quiz-form";
import { Toaster } from "sonner";

export default function Create() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Toaster richColors />
      <CreateQuizForm className="w-[400px]" />
    </div>
  );
}
