import { clsx, type ClassValue } from "clsx";
import { NavigateFunction } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DelayFuncProps<T> {
  isError: boolean;
  delay: number;
  func?: () => T;
}

export const DelayFunc = async <T>(props: DelayFuncProps<T>): Promise<T> =>  {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (props.isError) {
        reject("Error occurred!");
      } else {
        if(props.func)
          resolve(props.func());
        else 
          resolve(undefined as unknown as T);
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
