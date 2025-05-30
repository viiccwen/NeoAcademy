import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { convertKatex, DelayFunc, parseQuestionIndex } from "@/lib/utils";
import {
  createQuiz,
  deleteQuiz,
  getAllQuiz,
  getDetailsAllQuiz,
  getQuiz,
  submitQuiz,
} from "@/actions/quiz-actions";
import {
  AnsweredQuestionType,
  CreateQuizType,
  QuestionType,
  QuizReturnType,
  SubmitQuizType,
} from "@/lib/type";
import { useQuizStore } from "@/stores/quiz-store";
import { useUserStore } from "@/stores/user-store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuestion } from "./question";

export const useQuiz = () => {
  const navigate = useNavigate();
  const { quizId: currentQuizId, index: questionIndex } = useParams();
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const { quiz, isSuccess, isError } = useGetQuiz(currentQuizId!, false);
  const {
    quizId,
    questions,
    currentQuestionIndex,
    amount,
    userAnswers,
    setCurrentQuestionIndex,
    loadQuiz,
  } = useQuizStore();
  const submit = useSubmitQuiz();
  const { prevQuestion, nextQuestion } = useQuestion();
  const isQuizCompleted = userAnswers.every((answer) => answer.length > 0);

  const handleSubmitQuiz = () => {
    setShowSubmitDialog(true);
  };

  const confirmSubmitQuiz = () => {
    setShowSubmitDialog(false);
    submit.mutate({ quizId, answers: userAnswers });
  };

  // check quiz is loading
  useEffect(() => {
    if (isSuccess && quiz && (questions === null || quizId !== currentQuizId)) {
      loadQuiz(quiz);
    } else if (isError && questions === null) {
      navigate("/dashboard");
    }
  }, [
    isSuccess,
    isError,
    quiz,
    questions,
    quizId,
    currentQuizId,
    loadQuiz,
    navigate,
  ]);

  useEffect(() => {
    if (!questions || amount === 0) return;

    const validIndex = parseQuestionIndex(questionIndex, amount);
    if (validIndex === null) {
      navigate("/notfound");
      return;
    }
    setCurrentQuestionIndex(validIndex);
  }, [questionIndex, questions, amount, setCurrentQuestionIndex, navigate]);

  return {
    prevQuestion,
    nextQuestion,
    showSubmitDialog,
    setShowSubmitDialog,
    isQuizCompleted,
    handleSubmitQuiz,
    confirmSubmitQuiz,
    currentQuestionIndex,
    amount,
    questions,
  };
};

export const useCreateQuiz = () => {
  const { token } = useUserStore();
  const { loadQuiz } = useQuizStore();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["quiz", "create"],
    mutationFn: (formdata: CreateQuizType) => createQuiz(token!, formdata),
    onMutate: () => {
      toast.loading("創建測驗中...");
    },
    onError: () => {
      toast.dismiss();
      toast.error("發生錯誤！");
    },
    onSuccess: async (data: QuizReturnType) => {
      toast.dismiss();
      toast.success("成功創建測驗！");

      // convert every question to katex
      data.questions.forEach((question) => {
        question.text = convertKatex(question.text);
        question.options = question.options.map((option) =>
          convertKatex(option)
        );
      });
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
      toast.loading("提交測驗中...");
    },
    onError: (error: any) => {
      // close loading toast
      toast.dismiss();
      toast.error(error.message || "Error Occurred!");
    },
    onSuccess: async () => {
      // close loading toast
      toast.dismiss();
      toast.success("成功提交測驗！");

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

export const useGetQuiz = <T extends QuestionType | AnsweredQuestionType>(
  quizId: string,
  isAnswered: boolean
) => {
  const { token } = useUserStore();

  const response = useQuery({
    queryKey: ["quiz", "get"],
    queryFn: () => getQuiz<T>(quizId, token!, isAnswered),
    staleTime: 0,
  });

  return {
    quiz: response.data,
    isSuccess: response.isSuccess,
    isPending: response.isPending,
    isError: response.isError,
  };
};

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();
  const { token } = useUserStore();

  return useMutation({
    mutationKey: ["quiz", "delete"],
    mutationFn: (id: string) => deleteQuiz(id, token!),
    onMutate: () => {
      toast.loading("刪除測驗中...");
    },
    onError: (error: any) => {
      // close loading toast
      toast.dismiss();
      toast.error(error.message || "Error Occurred!");
    },
    onSuccess: async () => {
      // close loading toast
      toast.dismiss();
      toast.success("成功刪除測驗！");

      // refresh ["quiz"] cache
      queryClient.invalidateQueries({ queryKey: ["quiz", "get-all"] });
    },
  });
};

export const useGetAllQuiz = () => {
  const { token } = useUserStore();

  const response = useQuery({
    queryKey: ["quiz", "get-all"],
    queryFn: () => getAllQuiz(token!),
    retry: 1,
  });

  return {
    quizzes: response.data,
    isSuccess: response.isSuccess,
    isPending: response.isPending,
    isError: response.isError,
  };
};

export const useGetAllQuizDetails = () => {
  const { token } = useUserStore();

  const response = useQuery({
    queryKey: ["quiz", "get-all-details", token],
    queryFn: () => getDetailsAllQuiz(token!),
    retry: 1,
  });

  return {
    quiz: response.data,
    isSuccess: response.isSuccess,
    isPending: response.isPending,
    isError: response.isError,
  };
};
