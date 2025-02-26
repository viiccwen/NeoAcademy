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
};

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

export const CreateRoadmapSchema = z.object({
  name: z
    .string()
    .min(2, { message: "路徑名稱至少需要 2 個字元" })
    .max(50, { message: "路徑名稱不能超過 50 個字元" }),
  topic: z.string({
    required_error: "請選擇主題分類",
  }),
  description: z
    .string()
    .min(10, { message: "描述至少需要 10 個字元" })
    .max(500, { message: "描述不能超過 500 個字元" }),
});

export type CreateRoadmapType = z.infer<typeof CreateRoadmapSchema>;

export type Roadmaps = {
  id: string;
  name: string;
  topic: string;
  description: string;
  progress: number;
  totalSections: number;
  createdAt: Date;
};
export interface Roadmap {
  id: string;
  name: string;
  description: string;
  sections: Section[];
}
export interface Section {
  id: string;
  title: string;
  description: string;
  subsections: Subsection[];
}
export interface Subsection {
  id: string;
  title: string;
  description: string;
  checked: boolean;
}

export interface ChatMessages {
  previousMessages: string[];
  currentMessage: string;
}

export type updateSubsectionType = {
  sectionId: string;
  subsectionId: string;
}