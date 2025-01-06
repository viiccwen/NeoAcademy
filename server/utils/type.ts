import type { AuthProvider } from "database";

export type payloadType = {
  provider: AuthProvider;
  authId: string;
}

export type jwtType = {
  payload: payloadType;
  iat: number;
  exp: number;
};

export type getAllQuizType = {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  multipleAnswers: boolean;
  createdAt: Date;
}[];

export type QuizRequestType = "take-quiz" | "details";