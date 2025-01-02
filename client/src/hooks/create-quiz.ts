import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { DelayFunc } from "@/lib/utils";
import { createQuiz } from "@/actions/quiz-actions";
import { QuizReturnType } from "@/lib/type";
import { useQuizStore } from "@/stores/question-store";

// todo: change mutationFn to createQuiz
export const useCreateQuiz = () => {
  const { loadQuiz } = useQuizStore();

  return useMutation({
    mutationFn: createQuiz,
    onMutate: () => {
      toast.loading("Generating Quiz...");
    },
    onError: (error: any) => {
      toast.dismiss(); // close loading toast
      console.error(error);
      toast.error(error.message || "Error Occurred!");
    },
    onSuccess: async (data: QuizReturnType) => {
      // close loading toast
      toast.dismiss();
      toast.success("Quiz Created Successfully!");

      // load the quiz
      loadQuiz(data);

      // redirect to quiz page
      await DelayFunc({
        isError: false,
        delay: 2000,
        func: () => (window.location.href = `/quiz/${data.id}/1`),
      });
    },
  });
};
