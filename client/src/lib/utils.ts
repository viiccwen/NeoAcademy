import { useQuizStore } from "@/stores/question-store";
import { clsx, type ClassValue } from "clsx";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DelayFuncProps {
  isError: boolean;
  delay: number;
  func?: () => void;
}

export const DelayFunc = async (props: DelayFuncProps) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (props.isError) {
        reject("Error Occured!");
      } else {
        resolve(props.isError);
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
