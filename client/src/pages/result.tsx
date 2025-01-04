import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Question } from "@/components/customs/result/question";
import { Summary } from "@/components/customs/result/summary";

import { useGetQuiz } from "@/hooks/quiz";
import { useAuth } from "@/hooks/user";

export default function Result() {
  const { quizId } = useParams();
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const _quiz = useGetQuiz();
  const quiz = _quiz.data;

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, [isAuth]);

  if (!quizId) {
    navigate("/notfound");
    return;
  }

  useEffect(() => {
    _quiz.mutate(quizId);
  }, [quizId]);

  if (_quiz.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (_quiz.isError) {
    navigate("/notfound");
    return;
  }

  if (_quiz.isSuccess && quiz) {
    // Calculate stats
    const totalQuestions = quiz.questions.length;
    const correctAnswers = quiz.questions.filter(
      (q) =>
        q.answer.every((ans) => q.response.includes(ans)) &&
        q.response.every((resp) => q.answer.includes(resp))
    ).length;
    const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

    return (
      <div className="min-h-screen bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <h1 className="text-4xl font-extrabold text-white text-center mb-8">
            Quiz Results
          </h1>

          {/* Summary Section */}
          <Summary
            quiz={quiz}
            totalQuestions={totalQuestions}
            correctAnswers={correctAnswers}
            scorePercentage={scorePercentage}
          />

          {/* Questions Section */}
          <Question quiz={quiz} />

          {/* Actions Section */}
          <div className="flex justify-center gap-4 mt-8">
            <Button LinkTo={`/quiz/${quizId}/1`}>Retake Quiz</Button>
            <Button LinkTo="/dashboard">Back to Dashboard</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Loading...</p>
    </div>
  );
}
