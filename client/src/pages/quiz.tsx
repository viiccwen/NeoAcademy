import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuestionCard } from "@/components/customs/quiz/question-card";
import { ConfirmDialog } from "@/components/customs/quiz/confirm-dialog";
import { Metadata } from "@/components/customs/metadata";
import { parseQuestionIndex } from "@/lib/utils";
import { useQuizStore } from "@/stores/quiz-store";
import { useQuestion } from "@/hooks/question";
import { useGetQuiz, useSubmitQuiz } from "@/hooks/quiz";

export default function Quiz() {
  const { quizId: currentQuizId, index: questionIndex } = useParams();
  const { prevQuestion, nextQuestion } = useQuestion();
  const navigate = useNavigate();
  const submit = useSubmitQuiz();

  const {
    quizId,
    questions,
    currentQuestionIndex,
    amount,
    userAnswers,
    setCurrentQuestionIndex,
    loadQuiz,
  } = useQuizStore();

  const { quiz, isError, isSuccess } = useGetQuiz(currentQuizId!, false);

  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  const isQuizCompleted = userAnswers.every((answer) => answer.length > 0);

  // check quiz is loading
  useEffect(() => {
    if ((questions === null || quizId != currentQuizId) && isSuccess) {
      loadQuiz(quiz!);
    } else if (questions === null && isError) {
      navigate("/dashboard");
    }
  }, [isSuccess, quiz, isError, questions]);

  const handleSubmitQuiz = () => {
    setShowSubmitDialog(true);
  };

  const confirmSubmitQuiz = () => {
    setShowSubmitDialog(false);
    submit.mutate({ quizId, answers: userAnswers });
  };

  useEffect(() => {
    const validIndex = parseQuestionIndex(questionIndex, amount);

    if (!validIndex && questions) {
      console.log(validIndex);
      navigate("/notfound");
      return;
    }
    if (validIndex) setCurrentQuestionIndex(validIndex);
  }, [questionIndex, setCurrentQuestionIndex]);

  return (
    <>
      <Metadata title="測驗" description="Taking quiz!" />
      <Toaster richColors />
      <div className="w-full min-h-screen flex flex-col justify-center items-center text-white p-6">
        {/* progress bar */}
        <div className="w-full max-w-xl mb-4">
          <Progress value={(currentQuestionIndex / amount) * 100} />
          <p className="text-center text-gray-400 text-sm mt-1">
            Question {currentQuestionIndex} / {amount}
          </p>
        </div>

        {currentQuestionIndex !== -1 && questions && (
          <QuestionCard
            questionIndex={currentQuestionIndex - 1}
            question={questions[currentQuestionIndex - 1]}
          />
        )}

        {/* 按鈕區域 */}
        <div className="flex justify-center gap-3 mt-6 w-full max-w-xl">
          {currentQuestionIndex > 1 && (
            <Button
              variant="outline"
              className="flex-1 p-3 border border-gray-600 hover:bg-gray-700 transition-all"
              onClick={prevQuestion}
            >
              <ArrowBigLeft size={30} className="mr-2" />
              Previous
            </Button>
          )}
          {currentQuestionIndex < amount && (
            <Button
              variant="outline"
              className="flex-1 p-3 border border-gray-600 hover:bg-gray-700 transition-all"
              onClick={nextQuestion}
            >
              Next
              <ArrowBigRight size={30} className="ml-2" />
            </Button>
          )}
          {currentQuestionIndex === amount && (
            <Button
              className="flex-1 p-3 text-white bg-blue-600 hover:bg-blue-700 transition-all"
              onClick={handleSubmitQuiz}
              disabled={!isQuizCompleted}
            >
              Submit
            </Button>
          )}
        </div>

        {/* 提交確認對話框 */}
        <ConfirmDialog
          showSubmitDialog={showSubmitDialog}
          setShowSubmitDialog={setShowSubmitDialog}
          confirmSubmitQuiz={confirmSubmitQuiz}
        />
      </div>
    </>
  );
}
