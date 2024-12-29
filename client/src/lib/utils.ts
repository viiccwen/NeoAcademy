import { clsx, type ClassValue } from "clsx";
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
