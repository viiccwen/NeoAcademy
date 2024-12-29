import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { DelayFunc } from "@/lib/utils";
import { createQuiz } from "@/actions/quiz-actions";

interface UseCreateQuizOptions {
  onSuccessRedirect?: string;
}

// todo: change mutationFn to createQuiz
export const useCreateQuiz = (options?: UseCreateQuizOptions) => {
  return useMutation({
    mutationFn: createQuiz,
    onMutate: () => {
      toast.loading("Generating Quiz...");
    },
    onError: (error: any) => {
      toast.dismiss(); // close loading toast
      toast.error(error.message || "Error Occurred!");
    },
    onSuccess: async () => {
      toast.dismiss(); // close loading toast
      toast.success("Quiz Created Successfully!");
      await DelayFunc({
        isError: false,
        delay: 2000,
        func: () => {
          if (options?.onSuccessRedirect) {
            window.location.replace(options.onSuccessRedirect);
          }
        },
      });
    },
  });
};
