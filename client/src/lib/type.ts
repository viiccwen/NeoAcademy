import z from "zod";

// Select type for Quiz
export const categories: string[] = [
  "Language",
  "Programming",
  "Science",
  "Math",
  "History",
];
export const difficulties: string[] = ["Easy", "Medium", "Hard"];
export const questions: number[] = [5, 10, 15, 20, 25];
export const options: number[] = [2, 3, 4, 5];

// create quiz type
export const createQuizSchema = z.object({
  name: z.string().nonempty(),
  category: z.string().nonempty(),
  difficulty: z.string().nonempty(),
  question: z.number().positive(),
  option: z.number().positive(),
  multipleAnswers: z.boolean(),
  remarks: z.string().max(100, "Remarks should be less than 100 characters!"),
});
export type CreateQuizType = z.infer<typeof createQuizSchema>;

// Quiz type
export type QuestionType = {
  text: string;
  options: string[];
};

export type AnsweredQuestionType = QuestionType & {
  answer: number[];
  response: number[];
}

export type QuizReturnType = {
  id: string;
  questions: QuestionType[];
};

export type SubmitQuizType = {
  quizId: string;
  answers: number[][];
};

export type SubmitQuizReturnType = {
  index: number;
  answer: number[];
  response: number[];
}[];

export type GetQuizType<T extends QuestionType | AnsweredQuestionType> = {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  questions: T[];
  multipleAnswers: boolean;
  createdAt: Date;
  answered: boolean;
  remarks?: string;
};

export type GetAllQuizType = {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  multipleAnswers: boolean;
  createdAt: Date;
}[];