import { clsx, type ClassValue } from "clsx";
import { NavigateFunction } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { GetAllQuizType } from "./type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DelayFuncProps<T> {
  isError: boolean;
  delay: number;
  func?: () => T;
}

export const DelayFunc = async <T>(props: DelayFuncProps<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (props.isError) {
        reject("Error occurred!");
      } else {
        if (props.func) resolve(props.func());
        else resolve(undefined as unknown as T);
      }
    }, props.delay);
  });
};

export const parseQuestionIndex = (
  questionIndex: string | undefined,
  amount: number
) => {
  const parsedIndex = parseInt(questionIndex || "");
  if (isNaN(parsedIndex) || parsedIndex < 1 || parsedIndex > amount) {
    return null;
  }
  return parsedIndex;
};

export const prevQuestion = (
  navigate: NavigateFunction,
  currentQuestionIndex: number,
  quizId: string | undefined
) => {
  navigate(`/quiz/${quizId}/${currentQuestionIndex - 1}`);
};

export const FilterHelper = (
  quiz: GetAllQuizType,
  filterCategory: string | null,
  filterDifficulty: string | null,
  setFilterCategory: (value: string | null) => void,
  setFilterDifficulty: (value: string | null) => void
): GetAllQuizType => {
  let filteredQuiz = [...quiz];
  if (filterCategory) {
    if (filterCategory === "All") {
      setFilterCategory(null);
    }
    filteredQuiz = filteredQuiz.filter((q) => q.category === filterCategory);
  }
  if (filterDifficulty) {
    if (filterDifficulty === "All") {
      setFilterDifficulty(null);
    }
    filteredQuiz = filteredQuiz.filter(
      (q) => q.difficulty === filterDifficulty
    );
  }

  return filteredQuiz;
};

export const SortHelper = (
  quiz: GetAllQuizType,
  sortOrder: "name" | "date" | "difficulty" | "category"
): GetAllQuizType => {
  if (sortOrder === "date") {
    return quiz.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (sortOrder === "difficulty") {
    const difficultyOrder = ["Easy", "Medium", "Hard"];
    return quiz.sort(
      (a, b) =>
        difficultyOrder.indexOf(a.difficulty) -
        difficultyOrder.indexOf(b.difficulty)
    );
  } else if (sortOrder === "category") {
    return quiz.sort((a, b) => a.category.localeCompare(b.category));
  }
  return quiz;
};
