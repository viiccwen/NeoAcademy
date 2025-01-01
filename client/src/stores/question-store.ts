import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// example questions
export const sample_question: QuestionType[] = [
  {
    text: "Which sentence is grammatically correct?",
    options: [
      "She don't like apples.",
      "She doesn't likes apples.",
      "She doesn't like apples.",
      "She doesn't liked apples.",
    ],
  },
  {
    text: "Which word correctly completes the sentence: 'He _____ to the park yesterday.'",
    options: ["go", "goes", "gone", "went"],
  },
  {
    text: "What does the word 'benevolent' mean?",
    options: [
      "Kind and generous",
      "Angry and resentful",
      "Sad and melancholy",
      "Joyful and cheerful",
    ],
  },
  {
    text: "Choose the correct form of the verb: 'If I _____ you, I would apologize.'",
    options: ["am", "was", "were", "be"],
  },
  {
    text: "Which sentence uses the passive voice?",
    options: [
      "The chef prepared a delicious meal.",
      "The meal was prepared by the chef.",
      "The chef is preparing the meal.",
      "The chef has prepared the meal.",
    ],
  },
  {
    text: "What is the meaning of the idiom 'spill the beans'?",
    options: [
      "Make a mess",
      "Reveal a secret",
      "Get into trouble",
      "Cook a meal",
    ],
  },
  {
    text: "Choose the sentence with the correct word order:",
    options: [
      "Yesterday to the store I went.",
      "I to the store went yesterday.",
      "I went to the store yesterday.",
      "Yesterday went I to the store.",
    ],
  },
  {
    text: "Which sentence contains a conditional clause?",
    options: [
      "She sings beautifully.",
      "If it rains, we will stay inside.",
      "He has a pet cat.",
      "They are playing outside.",
    ],
  },
  {
    text: "Identify the subject of the sentence: 'The quick brown fox jumps over the lazy dog.'",
    options: [
      "The quick brown fox",
      "jumps",
      "over the lazy dog",
      "The lazy dog",
    ],
  },
  {
    text: "Which sentence is in the present perfect tense?",
    options: [
      "She is walking to the park.",
      "She has walked to the park.",
      "She walked to the park.",
      "She will walk to the park.",
    ],
  },
];

export type QuestionType = {
  text: string;
  options: string[];
};

export type UserAnswer = number[][]; // [questionIndex][selectedOptionIndex]

interface QuestionStore {
  questions: QuestionType[];
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
    questionIndex: number,
    selectOption: number,
    singleOption: boolean
  ) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuestionStore>()(
  persist(
    (set) => ({
      questions: sample_question,
      amount: sample_question.length,
      currentQuestionId: "1",
      currentQuestionIndex: 1,
      userAnswers: [],
      isCompleted: false,

      loadQuestions: () => {
        // Load questions from API
        set(() => ({
          questions: sample_question,
          amount: sample_question.length,
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
        }));
      },
    }),
    {
      name: "question-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
