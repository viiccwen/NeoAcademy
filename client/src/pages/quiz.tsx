import { QuestionCard } from "@/components/customs/quiz/question-card";
import { Button } from "@/components/ui/button";
import { useSubmitQuiz } from "@/hooks/quiz";
import { parseQuestionIndex } from "@/lib/utils";
import { useQuizStore } from "@/stores/quiz-store";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "sonner";
import { Progress } from "@/components/ui/progress";
import { ConfirmDialog } from "@/components/customs/quiz/confirm-dialog";
import { useAuth } from "@/hooks/user";
import { Metadata } from "@/components/customs/metadata";

export default function Quiz() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const submit = useSubmitQuiz();
  const { quizId: currentQuizId, index: questionIndex } = useParams();

  const {
    quizId,
    questions,
    currentQuestionIndex,
    amount,
    userAnswers,
    setCurrentQuestionIndex,
  } = useQuizStore();

  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  const isQuizCompleted = userAnswers.every((answer) => answer.length > 0);


  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, [isAuth]);

  // check quizId is valid
  useEffect(() => {
    if (quizId !== currentQuizId) {
      console.log(quizId, currentQuizId);
      navigate("/notfound");
    }
  }, [quizId, currentQuizId]);

  // ensure questions are loaded
  useEffect(() => {
    if (!questions) {
      console.log(questions);
      navigate("/notfound");
    }
  }, [questions]);

  const prevQuestion = () => {
    if (currentQuestionIndex > 1) {
      navigate(`/quiz/${quizId}/${currentQuestionIndex - 1}`);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < amount) {
      navigate(`/quiz/${quizId}/${currentQuestionIndex + 1}`);
    }
  };

  const handleSubmitQuiz = () => {
    setShowSubmitDialog(true);
  };

  const confirmSubmitQuiz = () => {
    setShowSubmitDialog(false);
    submit.mutate({ quizId, answers: userAnswers });
  };

  useEffect(() => {
    const validIndex = parseQuestionIndex(questionIndex, amount);

    if (!validIndex) {
      console.log(validIndex);
      navigate("/notfound");
      return;
    }

    setCurrentQuestionIndex(validIndex);
  }, [questionIndex, setCurrentQuestionIndex]);

  return (
    <>
      <Metadata title="Quiz" description="Taking quiz!" />
      <Toaster richColors />
      <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white p-6">
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
