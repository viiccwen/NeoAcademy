import { QuestionType, QuizReturnType } from "@/lib/type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// [questionIndex][selectedOptionIndex]
export type UserAnswer = number[][];

interface QuizStoreInterface {
  quizId: string;
  questions: QuestionType[] | null;
  amount: number;
  currentQuestionIndex: number;
  userAnswers: UserAnswer;
  isCompleted: boolean;

  loadQuiz: (quiz: QuizReturnType) => void;
  setIsCompleted: (isCompleted: boolean) => void;
  setCurrentQuestionIndex: (questionIndex: number) => void;
  setUsersAnswer: (
    questionIndex: number,
    selectOption: number,
    singleOption: boolean
  ) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizStoreInterface>()(
  persist(
    (set) => ({
      quizId: "",
      questions: null,
      amount: 0,
      currentQuestionIndex: 1,
      userAnswers: [],
      isCompleted: false,

      // Load a quiz into the store
      loadQuiz: (quiz) => {
        const quizId: string = quiz.id;
        const questions: QuestionType[] = quiz.questions;

        set(() => ({
          quizId,
          questions,
          amount: questions.length,
          currentQuestionIndex: 1,
          userAnswers: Array(questions.length).fill([]),
          isCompleted: false,
        }));
      },

      // Set the quiz as completed
      setIsCompleted: (isCompleted) => {
        set(() => ({ isCompleted }));
      },

      // Set the current question index
      setCurrentQuestionIndex: (questionIndex) => {
        set(() => ({ currentQuestionIndex: questionIndex }));
      },

      // Set the user's answer for a question
      setUsersAnswer: (questionIndex, selectOption, singleOption) => {
        set((state) => {
          const userAnswers = [...state.userAnswers];

          // Ensure there is an array for the given questionIndex
          if (!userAnswers[questionIndex]) {
            userAnswers[questionIndex] = [];
          }

          if (singleOption) {
            // Replace the array with a single selected option
            userAnswers[questionIndex] = [selectOption];
          } else {
            // Add or remove the selected option for multiple choice
            const selectedOptions = userAnswers[questionIndex];
            if (selectedOptions.includes(selectOption)) {
              userAnswers[questionIndex] = selectedOptions.filter(
                (option) => option !== selectOption
              );
            } else {
              userAnswers[questionIndex].push(selectOption);
            }
          }

          return { userAnswers };
        });
      },

      // Reset the quiz
      resetQuiz: () => {
        set(() => ({
          questions: [],
          currentQuestionId: "",
          currentQuestionIndex: -1,
          userAnswers: [],
          isCompleted: false,
          timeLeft: 0,
          isTimerRunning: false,
        }));
      },
    }),
    {
      name: "quiz-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
