import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// exampe
export const sample_question: Question = {
  1: {
    text: "What is the capital of India?",
    options: {
      1: "New Delhi",
      2: "Mumbai",
      3: "Kolkata",
      4: "Chennai",
    },
  },
  2: {
    text: "What is the capital of USA?",
    options: {
      1: "New York",
      2: "Washington DC",
      3: "Los Angeles",
      4: "Chicago",
    },
  },
  3: {
    text: "What is the capital of UK?",
    options: {
      1: "London",
      2: "Manchester",
      3: "Birmingham",
      4: "Liverpool",
    },
  },
};

export type QuestionType = {
  text: string;
  options: Option;
};

export type Option = Record<number, string>;
type Question = Record<number, QuestionType>;
type UserAnswer = Record<number, number[]>; // questionId, selectedOption

interface QuestionStore {
  questions: Question;
  currentQuestionId: string;
  currentQuestionIndex: number;
  userAnswers: UserAnswer;
  isCompleted: boolean;

  loadQuestions: () => void;
  setIsCompleted: (isCompleted: boolean) => void;
  setCurrentQuestionId: (questionId: string) => void;
  setCurrentQuestionIndex: (questionIndex: number) => void;
  setUsersAnswer: (
    questionId: number,
    selectOption: number,
    singleOption: boolean
  ) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuestionStore>()(
  persist(
    (set) => ({
      questions: sample_question,
      currentQuestionId: "1",
      currentQuestionIndex: 1,
      userAnswers: {},
      isCompleted: false,

      loadQuestions: () => {
        // Load questions from API
        set(() => ({ questions: sample_question, currentQuestionIndex: 1 }));
      },

      // Set the quiz as completed
      setIsCompleted: (isCompleted) => {
        set(() => ({ isCompleted }));
      },

      // Set the current question id
      setCurrentQuestionId: (questionId) => {
        set(() => ({ currentQuestionId: questionId }));
      },

      // Set the current question index
      setCurrentQuestionIndex: (questionIndex) => {
        set(() => ({ currentQuestionIndex: questionIndex }));
      },

      // Set the user's answer for a question
      setUsersAnswer: (questionId, selectOption, singleOption) => {
        set((state) => {
          const userAnswers = { ...state.userAnswers };

          // If user has not answered any question, create an empty array
          if (!userAnswers[questionId]) {
            userAnswers[questionId] = [];
          }

          // quiz for only one option
          if (singleOption) {
            // If user has already selected the option, remove it
            if (userAnswers[questionId].includes(selectOption))
              userAnswers[questionId] = [];
            // Add the selected option
            else userAnswers[questionId] = [selectOption];

            return { userAnswers };
          }

          // quiz for multiple options

          // If user has already selected the option, remove it
          if (userAnswers[questionId].includes(selectOption)) {
            userAnswers[questionId] = userAnswers[questionId].filter(
              (option) => option !== selectOption
            );
          } else {
            // Add the selected option
            userAnswers[questionId] = [
              ...userAnswers[questionId],
              selectOption,
            ];
          }

          // todo: remove console.log
          console.log(userAnswers);

          return { userAnswers };
        });
      },

      // Reset the quiz
      resetQuiz: () => {
        set(() => ({
          questions: {},
          currentQuestionId: "",
          currentQuestionIndex: -1,
          userAnswers: {},
          isCompleted: false,
        }));
      },
    }),
    {
      name: "question-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
