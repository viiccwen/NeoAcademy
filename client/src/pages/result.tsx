import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Question } from "@/components/customs/result/question";
import { Summary } from "@/components/customs/result/summary";

import { useGetQuiz } from "@/hooks/quiz";
import { Metadata } from "@/components/customs/metadata";
import { AnsweredQuestionType } from "@/lib/type";

export default function Result() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const { quiz, isPending, isError, isSuccess } =
    useGetQuiz<AnsweredQuestionType>(quizId!, true);

  // Redirect to 404 if quizId is not provided
  useEffect(() => {
    if (!quizId) {
      navigate("/notfound");
    }
  }, [quizId]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    navigate("/notfound");
    return;
  }

  if (isSuccess && quiz) {
    // Calculate stats
    const totalQuestions = quiz.questions.length;
    const correctAnswers = quiz.questions.filter(
      (q) =>
        q.answer.every((ans) => q.response.includes(ans)) &&
        q.response.every((resp) => q.answer.includes(resp))
    ).length;
    const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

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
              quiz={quiz}
              totalQuestions={totalQuestions}
              correctAnswers={correctAnswers}
              scorePercentage={scorePercentage}
            />

            {/* Questions Section */}
            <Question quiz={quiz} />

            {/* Actions Section */}
            <div className="flex justify-center gap-4 mt-8">
              <Button LinkTo={`/quiz/${quizId}/1`}>重新測驗</Button>
              <Button LinkTo="/dashboard">返回</Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Loading...</p>
    </div>
  );
}
