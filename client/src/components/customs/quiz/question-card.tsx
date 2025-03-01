import { Card, CardContent } from "@/components/ui/card";
import { useQuizStore } from "@/stores/quiz-store";
import { QuestionType } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  questionIndex: number;
  question: QuestionType;
}

export const QuestionCard = (props: QuestionCardProps) => {
  const { setUsersAnswer, userAnswers, currentQuestionIndex } = useQuizStore();
  const questionText = props.question.text;
  const options = props.question.options;

  const handleOptionClick = (questionId: number, selectedOption: number) => {
    setUsersAnswer(questionId, selectedOption, true);
  };

  return (
    <Card className="max-w-xl w-full bg-gray-800 text-white shadow-lg rounded-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col w-full gap-6">
          {/* question title */}
          <h1 className="text-xl font-semibold text-center">
            {currentQuestionIndex}. {questionText}
          </h1>

          {/* selection button block */}
          <div className="flex flex-col gap-3">
            {Object.keys(options).map((key) => {
              const optionId = parseInt(key);
              const text = options[optionId];
              const isSelected =
                userAnswers[props.questionIndex]?.includes(optionId);

              return (
                <Button
                  onClick={() =>
                    handleOptionClick(props.questionIndex, optionId)
                  }
                  className={cn(
                    "w-full p-3 rounded-md shadow-md font-medium transition-all duration-300",
                    isSelected
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  )}
                  key={key}
                >
                  {text}
                </Button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
