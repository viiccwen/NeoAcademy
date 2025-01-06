import type { getAllQuizType, Quiz, UnansweredQuiz, User } from "database";

export function getQuiz(
  user: User,
  quizId?: string
): Quiz | getAllQuizType | UnansweredQuiz | Quiz[] | undefined {
  try {
    if (quizId) {
      // single quiz search
      const quiz = user.quizzes.find(({ _id }) => _id.toString() === quizId);

      return quiz;
    } else {
      // multiple quiz search
      const quizzes = user.quizzes.map(
        ({ _id, name, category, difficulty, multipleAnswers, createdAt }) => ({
          id: _id.toString(),
          name,
          category,
          difficulty,
          multipleAnswers,
          createdAt,
        })
      );

      return quizzes;
    }
  } catch (error) {
    console.error("Error retrieving quiz:", error);
    return undefined;
  }
}
