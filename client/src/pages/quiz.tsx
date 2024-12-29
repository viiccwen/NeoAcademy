import { QuestionCard } from "@/components/customs/quiz/question-card";
import { Button } from "@/components/ui/button";
import { parseQuestionIndex, prevQuestion } from "@/lib/utils";
import { sample_question, useQuizStore } from "@/stores/question-store";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "sonner";

export default function Quiz() {
  const navigate = useNavigate();
  const { quizId, questionIndex } = useParams();

  const {
    currentQuestionId,
    currentQuestionIndex,
    amount,
    questions,
    loadQuestions,
    setCurrentQuestionIndex,
    resetQuiz,
  } = useQuizStore();

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

  useEffect(() => {
    const validIndex = parseQuestionIndex(questionIndex, amount);

    if (!validIndex) {
      navigate("/dashboard");
      return;
    }

    setCurrentQuestionIndex(validIndex);
  }, [questionIndex, setCurrentQuestionIndex]);

  return (
    <>
      <Toaster richColors />
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        {currentQuestionIndex !== -1 && (
          <QuestionCard
            questionId={currentQuestionId.toString()}
            questionIndex={currentQuestionIndex}
            question={sample_question[currentQuestionIndex]}
          />
        )}

        <div className="flex justify-center gap-3 mt-3 w-[500px]">
          {/* load questions */}
          {/* <Button onClick={loadQuestions}>Load Question</Button> */}

          {currentQuestionIndex > 1 && (
            <Button variant="outline" className="flex-1" onClick={prevQuestion}>
              <ArrowBigLeft size={50} />
            </Button>
          )}
          {currentQuestionIndex < amount && (
            <Button variant="outline" className="flex-1" onClick={nextQuestion}>
              <ArrowBigRight size={35} />
            </Button>
          )}
          {currentQuestionIndex === amount && (
            <Button className="flex-1" onClick={() => navigate("/dashboard")}>
              Submit
            </Button>
          )}

          {/* reset */}
          {/* <Button onClick={resetQuiz}>Reset</Button> */}
        </div>
      </div>
    </>
  );
}
