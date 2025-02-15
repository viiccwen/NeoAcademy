import type { AuthProvider } from "database";

export type PayloadType = {
  provider: AuthProvider;
  authId: string;
};

export type JwtType = PayloadType & {
  iat: number;
  exp: number;
};

export type GetAllQuizType = {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  multipleAnswers: boolean;
  createdAt: Date;
}[];

export type QuizRequestType = "take-quiz" | "details";
