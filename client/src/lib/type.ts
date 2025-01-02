import z from "zod";

// Select type for Quiz
export const categories: string[] = [
  "Language",
  "Programming",
  "Science",
  "Maths",
  "History",
];
export const difficulties: string[] = ["Easy", "Medium", "Hard"];
export const problems: number[] = [5, 10, 15, 20, 25];
export const options: number[] = [2, 3, 4, 5];

// create quiz type
export const createQuizSchema = z.object({
  name: z.string().nonempty(),
  category: z.string().nonempty(),
  difficulty: z.string().nonempty(),
  problem: z.number().positive(),
  option: z.number().positive(),
  mul_answer: z.boolean(),
  remarks: z.string().max(100, "Remarks should be less than 100 characters!"),
});
export type CreateQuizType = z.infer<typeof createQuizSchema>;

// Quiz type
export type QuestionType = {
  text: string;
  options: string[];
}

export type QuizReturnType = {
  id: string;
  problems: QuestionType[];
};
