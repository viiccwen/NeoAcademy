import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AnsweredQuestionType, GetQuizType } from "@/lib/type";

interface QuestionProps {
  quiz: GetQuizType<AnsweredQuestionType>;
}

export const Question = ({ quiz }: QuestionProps) => {
  return (
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
    </div>
  );
};
