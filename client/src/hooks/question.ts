import { useQuizStore } from "@/stores/quiz-store";
import { useNavigate } from "react-router-dom";

export const useQuestion = () => {
  const { currentQuestionIndex, quizId, amount } = useQuizStore();
  const navigate = useNavigate();

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

  return { prevQuestion, nextQuestion };
};
