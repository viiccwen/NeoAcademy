import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuestionCard } from "@/components/customs/quiz/question-card";
import { ConfirmDialog } from "@/components/customs/quiz/confirm-dialog";
import { Metadata } from "@/components/customs/metadata";
import { useQuiz } from "@/hooks/quiz";
import { useNavigate } from "react-router-dom";
export default function Quiz() {
  const {
    prevQuestion,
    nextQuestion,
    showSubmitDialog,
    setShowSubmitDialog,
    isQuizCompleted,
    handleSubmitQuiz,
    confirmSubmitQuiz,
    currentQuestionIndex,
    amount,
    questions,
  } = useQuiz();
  const navigate = useNavigate();

  return (
    <>
      <Metadata title="測驗" description="Taking quiz!" />
      <Toaster richColors />
      <div className="w-full min-h-screen flex flex-col justify-center items-center text-white p-6">
        {/* back */}
        <Button
          variant="outline"
          className="absolute top-6 left-6"
          onClick={() => navigate("/dashboard")}
        >
          返回
        </Button>

        {/* progress bar */}
        <div className="w-full max-w-3xl mb-4 mt-12">
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

        {/* button */}
        <div className="flex justify-center gap-3 mt-6 w-full max-w-3xl">
          {currentQuestionIndex > 1 && (
            <Button
              variant="outline"
              className="flex-1 p-3 border border-gray-600 hover:bg-gray-700 transition-all"
              onClick={prevQuestion}
            >
              <ArrowBigLeft size={30} className="mr-2" />
              前一題
            </Button>
          )}
          {currentQuestionIndex < amount && (
            <Button
              variant="outline"
              className="flex-1 p-3 border border-gray-600 hover:bg-gray-700 transition-all"
              onClick={nextQuestion}
            >
              下一題
              <ArrowBigRight size={30} className="ml-2" />
            </Button>
          )}
          {currentQuestionIndex === amount && (
            <Button
              className="flex-1 p-3 text-white bg-blue-600 hover:bg-blue-700 transition-all"
              onClick={handleSubmitQuiz}
              disabled={!isQuizCompleted}
            >
              提交
            </Button>
          )}
        </div>

        {/* submit confirmation dialog */}
        <ConfirmDialog
          showSubmitDialog={showSubmitDialog}
          setShowSubmitDialog={setShowSubmitDialog}
          confirmSubmitQuiz={confirmSubmitQuiz}
        />
      </div>
    </>
  );
}
