import { QuestionCard } from "@/components/customs/quiz/question-card";
import { Button } from "@/components/ui/button";
import { parseQuestionIndex } from "@/lib/utils";
import { useQuizStore } from "@/stores/question-store";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "sonner";

export default function Quiz() {
  const navigate = useNavigate();
  const { quizId: currentQuizId, index: questionIndex } = useParams();

  const {
    quizId,
    questions,
    currentQuestionIndex,
    amount,
    setCurrentQuestionIndex,
  } = useQuizStore();

  // check if the quiz id is the same
  if(quizId !== currentQuizId) {
    console.log(quizId, currentQuizId);
    navigate("/notfound");
  }

  // check if the questions are loaded
  if(questions === null) {
    console.log(questions);
    navigate("/notfound");
  }

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
      console.log(validIndex);
      navigate("/notfound");
      return;
    }

    setCurrentQuestionIndex(validIndex);
  }, [questionIndex, setCurrentQuestionIndex]);

  return (
    <>
      <Toaster richColors />
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        {currentQuestionIndex !== -1 && questions && (
          <QuestionCard
            questionIndex={currentQuestionIndex - 1}
            question={questions[currentQuestionIndex - 1]}
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
