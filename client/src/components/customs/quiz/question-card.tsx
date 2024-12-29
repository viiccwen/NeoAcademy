import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { QuestionType, useQuizStore } from "@/stores/question-store";

interface QuestionCardProps {
  questionId: string;
  questionIndex: number;
  question: QuestionType;
}

export const QuestionCard = (props: QuestionCardProps) => {
  const { setUsersAnswer, userAnswers, currentQuestionId } = useQuizStore();
  const options = props.question.options;

  const handleOptionClick = (questionId: number, selectedOption: number) => {
    setUsersAnswer(questionId, selectedOption, true);
  };

  return (
    <>
      <Card>
        <CardContent>
          <div className="flex flex-col w-full gap-4 mt-5">
            <h1 className="text-xl">{currentQuestionId}. {props.question.text}</h1>

            {/* option button */}
            <div className="flex flex-col gap-2">
              {Object.keys(options).map((key) => {
                const optionId = parseInt(key);
                const text = options[optionId];
                const isSelected =
                  userAnswers[parseInt(props.questionId)]?.includes(optionId);

                return (
                  <button
                    onClick={() =>
                      handleOptionClick(parseInt(props.questionId), optionId)
                    }
                    className={cn(
                      "w-full bg-gray-100 p-2 rounded-md shadow-md duration-300",
                      isSelected
                        ? "bg-blue-200 hover:bg-blue-300"
                        : "bg-gray-100 hover:bg-gray-200"
                    )}
                    key={key}
                  >
                    {text}
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
