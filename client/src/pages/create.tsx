import { Metadata } from "@/components/customs/metadata";
import { CreateQuizForm } from "@/components/customs/quiz/create-quiz-form";
import { Toaster } from "sonner";

export default function Create() {
  return (
    <>
      <Metadata title="建立" description="Create a new quiz using NeoAcademy's quiz generator." />
      <div className="w-full min-h-screen flex justify-center items-center">
        <Toaster richColors />
        <CreateQuizForm className="w-full sm:w-[400px] md:w-[500px]" />
      </div>
    </>
  );
}
