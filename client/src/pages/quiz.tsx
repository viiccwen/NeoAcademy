import { QuestionCard } from "@/components/customs/quiz/question-card";
import { Button } from "@/components/ui/button";
import { sample_question, useQuizStore } from "@/stores/question-store";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "sonner";

export default function Quiz() {
  const navigate = useNavigate();
  const { quizId, questionIndex } = useParams();

  const {
    currentQuestionId,
    currentQuestionIndex,
    loadQuestions,
    setCurrentQuestionIndex,
    resetQuiz,
  } = useQuizStore();

  useEffect(() => {
    if (questionIndex !== undefined) setCurrentQuestionIndex(parseInt(questionIndex));
  }, [questionIndex, setCurrentQuestionIndex]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Toaster richColors />

      {currentQuestionIndex !== -1 && (
        <QuestionCard
          questionId={currentQuestionId.toString()} // This is the question id
          questionIndex={currentQuestionIndex} // This is the question index
          question={sample_question[currentQuestionIndex]}
        />
      )}

      <div className="flex flex-col gap-3 ml-5">
        {/* load questions */}
        <Button onClick={loadQuestions}>Load Question</Button>

        {/* jump to question */}
        <Button onClick={() => navigate(`/quiz/${quizId}/1`)}>Jump to question 1</Button>
        <Button onClick={() => navigate(`/quiz/${quizId}/2`)}>Jump to question 2</Button>
        <Button onClick={() => navigate(`/quiz/${quizId}/3`)}>Jump to question 3</Button>

        {/* reset */}
        <Button onClick={resetQuiz}>Reset</Button>
      </div>
    </div>
  );
}
