import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Question } from "@/components/customs/result/question";
import { Summary } from "@/components/customs/result/summary";
import { useGetQuiz } from "@/hooks/quiz";
import { Metadata } from "@/components/customs/metadata";
import { AnsweredQuestionType } from "@/lib/type";
import { Link } from "react-router-dom";

export default function Result() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { quiz, isPending, isError } = useGetQuiz<AnsweredQuestionType>(
    quizId!,
    true
  );

  // Redirect to 404 if quizId is invalid or quiz fetch fails
  useEffect(() => {
    if (!quizId || isError) {
      navigate("/notfound");
    }
  }, [quizId, isError, navigate]);

  // Calculate stats using useMemo for performance
  const { totalQuestions, correctAnswers, scorePercentage, hasResponses } =
    useMemo(() => {
      if (!quiz?.questions)
        return {
          totalQuestions: 0,
          correctAnswers: 0,
          scorePercentage: 0,
          hasResponses: false,
        };

      const total = quiz.questions.length;
      const hasResponses = quiz.questions.some(
        (q) => q.response && q.response.length > 0
      );
      if (!hasResponses) {
        return {
          totalQuestions: total,
          correctAnswers: 0,
          scorePercentage: 0,
          hasResponses: false,
        };
      }
      const correct = quiz.questions.filter(
        (q) =>
          q.answer.every((ans) => q.response.includes(ans)) &&
          q.response.every((resp) => q.answer.includes(resp))
      ).length;
      const percentage = total ? Math.round((correct / total) * 100) : 0;

      return {
        totalQuestions: total,
        correctAnswers: correct,
        scorePercentage: percentage,
        hasResponses: true,
      };
    }, [quiz]);

  // Loading state
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Loading...</p>
      </div>
    );
  }

  // No responses state
  if (!hasResponses) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-semibold mb-4">尚未完成測驗</h2>
        <p className="text-gray-300 mb-6">
          您目前沒有任何作答紀錄，請先完成測驗。
        </p>
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard")}
          className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
        >
          返回主頁
        </Button>
      </div>
    );
  }

  // Render quiz result if data is available
  return (
    <>
      <Metadata
        title="結果"
        description="Review your quiz performance with AI-driven insights and personalized feedback."
      />
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <h1 className="text-4xl font-extrabold text-white text-center mb-8">
            測驗結果
          </h1>

          {/* Summary Section */}
          <Summary
            quiz={quiz!}
            totalQuestions={totalQuestions}
            correctAnswers={correctAnswers}
            scorePercentage={scorePercentage}
          />

          {/* Questions Section */}
          <Question quiz={quiz!} />

          {/* Actions Section */}
          <div className="flex justify-center gap-4 mt-8">
            <Button asChild>
              <Link to={`/quiz/${quizId}/1`}>重新測驗</Link>
            </Button>
            <Button asChild>
              <Link to="/dashboard">返回</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
