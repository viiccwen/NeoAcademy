import { AnalyzeUser } from "@/actions/user-actions";
import { useUserStore } from "@/stores/user-store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useGetAllQuizDetails } from "./quiz";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnsweredQuestionType, GetQuizType } from "@/lib/type";

export const useAnalyze = () => {
  const navigate = useNavigate();
  const { token, analysis, setAnalysis } = useUserStore();

  const { quiz, isPending, isError, isSuccess } = useGetAllQuizDetails();

  const mutation = useMutation({
    mutationKey: ["user", "analyze"],
    mutationFn: () => AnalyzeUser(token),
    onMutate: () => {
      toast.loading("Analyzing User...");
    },
    onError: (error: any) => {
      toast.dismiss();
      toast.error(error.message || "Error Occurred!");
    },
    onSuccess: (content: string) => {
      toast.dismiss();
      setAnalysis(content);
      toast.success("Analysis Completed!");
    },
  });

  // calculate quiz stats
  const quizStats = () => {
    if (!quiz) return null;

    const difficultyCount: Record<string, number> = {
      Easy: 0,
      Medium: 0,
      Hard: 0,
    };
    const categoryCount: Record<string, number> = {
      Math: 0,
      Science: 0,
      History: 0,
      Language: 0,
      Programming: 0,
    };

    quiz.forEach((q) => {
      if (difficultyCount[q.difficulty] !== undefined)
        difficultyCount[q.difficulty]++;
      if (categoryCount[q.category] !== undefined) categoryCount[q.category]++;
    });

    const completedQuizzes: GetQuizType<AnsweredQuestionType>[] = quiz.filter(
      (q) => q.answered
    ) as GetQuizType<AnsweredQuestionType>[];
    const totalQuizzes = quiz.length;
    const totalQuestions = quiz.reduce((sum, q) => sum + q.questions.length, 0);

    const totalCorrectAnswers = completedQuizzes.reduce(
      (sum, q) =>
        sum +
        q.questions.reduce(
          (qSum, qItem) =>
            qSum +
            (qItem.response.filter((r) => qItem.answer.includes(r)).length > 0
              ? 1
              : 0),
          0
        ),
      0
    );

    const correctRate = (totalCorrectAnswers / totalQuestions) * 100;
    const highestScore = Math.max(
      ...completedQuizzes.map(
        (q) =>
          q.questions.filter((qItem) =>
            qItem.response.every((r) => qItem.answer.includes(r))
          ).length
      )
    );
    const lowestScore = Math.min(
      ...completedQuizzes.map(
        (q) =>
          q.questions.filter((qItem) =>
            qItem.response.every((r) => qItem.answer.includes(r))
          ).length
      )
    );
    const averageScore = totalCorrectAnswers / totalQuizzes;

    return {
      totalQuizzes,
      completedQuizzes,
      totalQuestions,
      correctRate,
      highestScore,
      lowestScore,
      averageScore,
      difficultyCount,
      categoryCount,
    };
  };

  useEffect(() => {
    if (isError) navigate("/notfound");
  }, [isError]);

  return {
    analyze: mutation.mutate,
    content: analysis || mutation.data,
    isLoading: mutation.isPending,
    quiz,
    isPending,
    isSuccess,
    quizStats,
  };
};
