import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AnsweredQuestionType, GetQuizType } from "@/lib/type";
import { translateCategory, translateDifficulty } from "@/lib/utils";

interface SummaryProps {
  quiz: GetQuizType<AnsweredQuestionType>;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
}

export const Summary = ({
  quiz,
  totalQuestions,
  correctAnswers,
  scorePercentage,
}: SummaryProps) => {
  return (
    <Card className="mb-8 bg-gray-800 text-white">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">{quiz.name}</h2>
        <p className="text-gray-400 mb-2">
          種類:{" "}
          <span className="font-medium">
            {translateCategory(quiz.category)}
          </span>
        </p>
        <p className="text-gray-400 mb-2">
          難度:{" "}
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
            {translateDifficulty(quiz.difficulty)}
          </Badge>
        </p>
        <p className="text-gray-400">
          分數: <span className="font-medium">{correctAnswers}</span>/
          {totalQuestions} ({scorePercentage}%)
        </p>
        <Progress value={scorePercentage} className="mt-4 bg-gray-700" />
      </CardContent>
    </Card>
  );
};
