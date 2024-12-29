import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// example questions
export const sample_question: Question = {
  1: {
    text: "Which sentence is grammatically correct?",
    options: {
      1: "She don't like apples.",
      2: "She doesn't likes apples.",
      3: "She doesn't like apples.",
      4: "She doesn't liked apples.",
    },
  },
  2: {
    text: "Which word correctly completes the sentence: 'He _____ to the park yesterday.'",
    options: {
      1: "go",
      2: "goes",
      3: "gone",
      4: "went",
    },
  },
  3: {
    text: "What does the word 'benevolent' mean?",
    options: {
      1: "Kind and generous",
      2: "Angry and resentful",
      3: "Sad and melancholy",
      4: "Joyful and cheerful",
    },
  },
  4: {
    text: "Choose the correct form of the verb: 'If I _____ you, I would apologize.'",
    options: {
      1: "am",
      2: "was",
      3: "were",
      4: "be",
    },
  },
  5: {
    text: "Which sentence uses the passive voice?",
    options: {
      1: "The chef prepared a delicious meal.",
      2: "The meal was prepared by the chef.",
      3: "The chef is preparing the meal.",
      4: "The chef has prepared the meal.",
    },
  },
  6: {
    text: "What is the meaning of the idiom 'spill the beans'?",
    options: {
      1: "Make a mess",
      2: "Reveal a secret",
      3: "Get into trouble",
      4: "Cook a meal",
    },
  },
  7: {
    text: "Choose the sentence with the correct word order:",
    options: {
      1: "Yesterday to the store I went.",
      2: "I to the store went yesterday.",
      3: "I went to the store yesterday.",
      4: "Yesterday went I to the store.",
    },
  },
  8: {
    text: "Which sentence contains a conditional clause?",
    options: {
      1: "She sings beautifully.",
      2: "If it rains, we will stay inside.",
      3: "He has a pet cat.",
      4: "They are playing outside.",
    },
  },
  9: {
    text: "Identify the subject of the sentence: 'The quick brown fox jumps over the lazy dog.'",
    options: {
      1: "The quick brown fox",
      2: "jumps",
      3: "over the lazy dog",
      4: "The lazy dog",
    },
  },
  10: {
    text: "Which sentence is in the present perfect tense?",
    options: {
      1: "She is walking to the park.",
      2: "She has walked to the park.",
      3: "She walked to the park.",
      4: "She will walk to the park.",
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
  amount: number;
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
      amount: Object.keys(sample_question).length,
      currentQuestionId: "1",
      currentQuestionIndex: 1,
      userAnswers: {},
      isCompleted: false,

      loadQuestions: () => {
        // Load questions from API
        set(() => ({
          questions: sample_question,
          amount: Object.keys(sample_question).length,
          currentQuestionIndex: 1,
        }));
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
