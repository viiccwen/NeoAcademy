import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { DelayFunc } from "@/lib/utils";
import {
  createQuiz,
  deleteQuiz,
  getAllQuiz,
  getDetailsAllQuiz,
  getQuiz,
  submitQuiz,
  updateQuiz,
} from "@/actions/quiz-actions";
import {
  CreateQuizType,
  GetAllQuizType,
  GetQuizType,
  QuizReturnType,
  SubmitQuizType,
} from "@/lib/type";
import { useQuizStore } from "@/stores/quiz-store";
import { useUserStore } from "@/stores/user-store";
import { useNavigate } from "react-router-dom";

export const useCreateQuiz = () => {
  const { token } = useUserStore();
  const { loadQuiz } = useQuizStore();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["quiz", "create"],
    mutationFn: (formdata: CreateQuizType) => createQuiz(token!, formdata),
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
        func: () => navigate(`/quiz/${data.id}/1`),
      });
    },
  });
};

export const useSubmitQuiz = () => {
  const { token } = useUserStore();
  const { quizId, resetQuiz } = useQuizStore();

  return useMutation({
    mutationKey: ["quiz", "submit"],
    mutationFn: ({ quizId, answers }: SubmitQuizType) =>
      submitQuiz({ token: token!, quizId, answers }),
    onMutate: () => {
      toast.loading("Submitting Quiz...");
    },
    onError: (error: any) => {
      // close loading toast
      toast.dismiss();
      toast.error(error.message || "Error Occurred!");
    },
    onSuccess: async () => {
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
  const { token } = useUserStore();

  return useMutation({
    mutationKey: ["quiz", "get-all", token],
    mutationFn: () => getAllQuiz(token!),
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

export const useGetAllQuizDetails = () => {
  const { token } = useUserStore();

  return useQuery({
    queryKey: ["quiz", "get-all-details", token],
    queryFn: getDetailsAllQuiz,
  });
};
