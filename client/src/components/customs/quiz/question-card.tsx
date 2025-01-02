import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { useQuizStore } from "@/stores/question-store";
import { QuestionType } from "@/lib/type";

interface QuestionCardProps {
  questionIndex: number;
  question: QuestionType;
}

export const QuestionCard = (props: QuestionCardProps) => {
  const { setUsersAnswer, userAnswers, currentQuestionIndex } = useQuizStore();
  const question_text = props.question.text;
  const options = props.question.options;

  const handleOptionClick = (questionId: number, selectedOption: number) => {
    setUsersAnswer(questionId, selectedOption, true);
  };

  return (
    <>
      <Card className="max-w-[500px] min-h-[350px] w-[500px]">
        <CardContent>
          <div className="flex flex-col w-full gap-4 mt-5">
            <h1 className="text-xl">
              {currentQuestionIndex}. {question_text}
            </h1>

            {/* option button */}
            <div className="flex flex-col gap-2">
              {Object.keys(options).map((key) => {
                const optionId = parseInt(key);
                const text = options[optionId];
                const isSelected =
                  userAnswers[props.questionIndex]?.includes(optionId);

                return (
                  <button
                    onClick={() =>
                      handleOptionClick(props.questionIndex, optionId)
                    }
                    className={cn(
                      "w-full bg-gray-100 p-2 rounded-md shadow-md duration-100",
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
