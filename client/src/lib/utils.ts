import { clsx, type ClassValue } from "clsx";
import { NavigateFunction } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { GetAllQuizType } from "./type";
import { RefObject, useEffect } from "react";
import { useMotionValue, useSpring, frame } from "framer-motion";

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

export const translateCategory = (category: string) => {
  switch (category) {
    case "Math":
      return "數學";
    case "Science":
      return "自然";
    case "History":
      return "歷史";
    case "Language":
      return "語言";
    case "Programming":
      return "程式語言";
    default:
      return "N/A";
  }
};

export const translateDifficulty = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "簡單";
    case "Medium":
      return "中等";
    case "Hard":
      return "困難";
    default:
      return "N/A";
  }
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
  quizzes: GetAllQuizType,
  filterCategory: string | null,
  filterDifficulty: string | null
): GetAllQuizType => {
  if (!filterCategory && !filterDifficulty) {
    return quizzes;
  }

  return quizzes.filter((quiz) => {
    const matchesCategory =
      !filterCategory ||
      filterCategory === "All" ||
      quiz.category === filterCategory;
    const matchesDifficulty =
      !filterDifficulty ||
      filterDifficulty === "All" ||
      quiz.difficulty === filterDifficulty;

    return matchesCategory && matchesDifficulty;
  });
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

export function useFollowPointer(ref: RefObject<HTMLElement>) {
  const spring = { damping: 10, stiffness: 100 };
  const xPoint = useMotionValue(0);
  const yPoint = useMotionValue(0);
  const x = useSpring(xPoint, spring);
  const y = useSpring(yPoint, spring);

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current!;

      frame.read(() => {
        xPoint.set(clientX - element.offsetLeft - element.offsetWidth / 2);
        yPoint.set(clientY - element.offsetTop - element.offsetHeight / 2);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return { x, y };
}
