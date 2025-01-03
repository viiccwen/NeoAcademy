import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGetQuiz } from "@/hooks/quiz";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Result() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const _quiz = useGetQuiz();
  const quiz = _quiz.data;

  if (!quizId) {
    navigate("/notfound");
    return;
  }

  useEffect(() => {
    _quiz.mutate(quizId);
  }, [quizId]);

  if (_quiz.isPending) return (
    <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
    </div>
  );

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
          <Card className="mb-8 bg-gray-800 text-white">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">{quiz.name}</h2>
              <p className="text-gray-400 mb-2">
                Category: <span className="font-medium">{quiz.category}</span>
              </p>
              <p className="text-gray-400 mb-2">
                Difficulty:{" "}
                <Badge
                  variant="outline"
                  className={`${
                    quiz.difficulty === "Easy"
                      ? "bg-green-500"
                      : quiz.difficulty === "Medium"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  } text-white`}
                >
                  {quiz.difficulty}
                </Badge>
              </p>
              <p className="text-gray-400">
                Score: <span className="font-medium">{correctAnswers}</span>/
                {totalQuestions} ({scorePercentage}%)
              </p>
              <Progress value={scorePercentage} className="mt-4 bg-gray-700" />
            </CardContent>
          </Card>

          {/* Questions Section */}
          <div className="grid grid-cols-1 gap-6">
            {quiz.questions.map((q, index) => {
              const isCorrect =
                q.answer.every((ans) => q.response.includes(ans)) &&
                q.response.every((resp) => q.answer.includes(resp));

              return (
                <Card
                  key={index}
                  className={`${
                    isCorrect ? "border-green-500" : "border-red-500"
                  } bg-gray-800 text-white`}
                >
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">
                      Q{index + 1}: {q.text}
                    </h3>
                    <ul className="space-y-2 mb-4">
                      {q.options.map((option, optIndex) => (
                        <li
                          key={optIndex}
                          className={`p-2 rounded-lg ${
                            q.answer.includes(optIndex)
                              ? "bg-green-500 text-white"
                              : q.response.includes(optIndex)
                              ? "bg-red-500 text-white"
                              : "bg-gray-700 text-gray-300"
                          }`}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                    <Badge
                      variant="outline"
                      className={`${
                        isCorrect ? "bg-green-500" : "bg-red-500"
                      } text-white`}
                    >
                      {isCorrect ? "Correct" : "Incorrect"}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}

            {/* Actions Section */}
            <div className="flex justify-center gap-4 mt-8">
              <Button onClick={() => navigate(`/quiz/${quizId}/1`)}>
                Retake Quiz
              </Button>
              <Button onClick={() => navigate("/dashboard")}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <p>Something went wrong. Please try again.</p>;
}
