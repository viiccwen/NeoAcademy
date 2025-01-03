import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { DelayFunc } from "@/lib/utils";
import {
  createQuiz,
  deleteQuiz,
  getAllQuiz,
  getQuiz,
  submitQuiz,
  updateQuiz,
} from "@/actions/quiz-actions";
import { GetAllQuizType, GetQuizType, QuizReturnType, SubmitQuizReturnType } from "@/lib/type";
import { useQuizStore } from "@/stores/question-store";

export const useCreateQuiz = () => {
  const { loadQuiz } = useQuizStore();

  return useMutation({
    mutationKey: ["quiz", "create"],
    mutationFn: createQuiz,
    onMutate: () => {
      toast.loading("Generating Quiz...");
    },
    onError: (error: any) => {
      // close loading toast
      toast.dismiss();
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

export const useSubmitQuiz = () => {
  const { quizId, resetQuiz } = useQuizStore();

  return useMutation({
    mutationKey: ["quiz", "submit"],
    mutationFn: submitQuiz,
    onMutate: () => {
      toast.loading("Submitting Quiz...");
    },
    onError: (error: any) => {
      // close loading toast
      toast.dismiss();
      toast.error(error.message || "Error Occurred!");
    },
    onSuccess: async (data: SubmitQuizReturnType) => {
      // close loading toast
      toast.dismiss();
      toast.success("Quiz Submitted Successfully!");

      // redirect to result page
      await DelayFunc({
        isError: false,
        delay: 2000,
        func: () => {
          resetQuiz();
          window.location.href = `/result/${quizId}`;
        },
      });
    },
  });
};

export const useGetQuiz = () => {
  return useMutation({
    mutationKey: ["quiz", "get"],
    mutationFn: getQuiz,
    onMutate: () => {
      toast.loading("Fetching Quiz...");
    },
    onError: (error: any) => {
      // close loading toast
      toast.dismiss();
      toast.error(error.message || "Error Occurred!");
    },
    onSuccess: async (data: GetQuizType) => {
      // close loading toast
      toast.dismiss();
      return data;
    },
  });
};

export const useUpdateQuiz = () => {
  return useMutation({
    mutationKey: ["quiz", "update"],
    mutationFn: updateQuiz,
    onMutate: () => {
      toast.loading("Updating Quiz...");
    },
    onError: (error: any) => {
      // close loading toast
      toast.dismiss();
      toast.error(error.message || "Error Occurred!");
    },
    onSuccess: async () => {
      // close loading toast
      toast.dismiss();
      toast.success("Quiz Updated Successfully!");
    },
  });
};

export const useDeleteQuiz = () => {
  return useMutation({
    mutationKey: ["quiz", "delete"],
    mutationFn: deleteQuiz,
    onMutate: () => {
      toast.loading("Deleting Quiz...");
    },
    onError: (error: any) => {
      // close loading toast
      toast.dismiss();
      toast.error(error.message || "Error Occurred!");
    },
    onSuccess: async () => {
      // close loading toast
      toast.dismiss();
      toast.success("Quiz Deleted Successfully!");
    },
  });
};

export const useGetAllQuiz = () => {
  return useMutation({
    mutationKey: ["quiz", "get", "all"],
    mutationFn: getAllQuiz,
    onMutate: () => {
      toast.loading("Get Quiz...");
    },
    onError: (error: any) => {
      // close loading toast
      toast.dismiss();
      toast.error(error.message || "Error Occurred!");
    },
    onSuccess: async (data: GetAllQuizType) => {
      // close loading toast
      toast.dismiss();
      return data;
    },
  });
};
