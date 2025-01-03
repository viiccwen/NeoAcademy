import type { Quiz, UnansweredQuestion, UnansweredQuiz, User } from 'database';

import { users } from 'database';
import { ObjectId } from 'mongodb';


const dummi: UnansweredQuestion[] = [
  {
    "text": "Let \( M \) be a smooth manifold and \( X, Y \in \Gamma(TM) \) be two vector fields on \( M \). What is the Lie bracket \( [X, Y] \) of these two vector fields?",
    "options": [
      "The Lie bracket is defined as \( [X, Y] = X(Y) - Y(X) \).",
      "The Lie bracket is defined as \( [X, Y] = X(Y) + Y(X) \).",
      "The Lie bracket is defined as \( [X, Y] = X(Y) \circ Y(X) \).",
      "The Lie bracket is defined as \( [X, Y] = \mathcal{L}_X Y - \mathcal{L}_Y X \)."
    ],
    "answer": [3],
  },
  {
    "text": "Let \( g \) be a Riemannian metric on a smooth manifold \( M \). Which of the following statements about the covariant derivative \( \nabla \) is true?",
    "options": [
      "The covariant derivative \( \nabla_X Y \) of two vector fields \( X, Y \) is always symmetric.",
      "The covariant derivative \( \nabla_X Y \) satisfies the Leibniz rule, i.e., \( \nabla_X (fY) = f \nabla_X Y + (Xf) Y \).",
      "The covariant derivative \( \nabla_X Y \) is always parallel to \( Y \).",
      "The covariant derivative \( \nabla_X Y \) of two vector fields \( X, Y \) is the same as their cross product."
    ],
    "answer": [1],
  }
];

const dummy: Omit<UnansweredQuiz, '_id'> = {
    name: 'henlo mathz',
    category: 'differential geometry',
    difficulty: 'medium',
    questions: dummi,
    multipleAnswers: false,
    createdAt: new Date(),
    answered: false
};

export function getQuiz(user: User, quizId: string): Quiz | UnansweredQuiz | undefined {
    return user.quizzes.find(({ _id }) => _id.toString() == quizId);
}

export async function generateUnansweredQuiz(name: string, category: string, difficulty: string, option: number, question: number, multipleAnswers: boolean, remarks: string): Promise<UnansweredQuiz> {
    return { _id: new ObjectId(), ...dummy };
}

export async function recordUnansweredQuiz({ _id }: User, quiz: UnansweredQuiz): Promise<void> {
    await users.updateOne(
        { _id },
        { $push: { quizzes: quiz } }
    );
}

export async function submitAndGetAnswers(user: User, quizId: string, responses: number[][]):
        Promise<{ index: number; answer: number[]; response: number[] }[]> {
    const quiz = getQuiz(user, quizId);
    if (!quiz) throw new Error('Not found');

    quiz.answered = true;
    quiz.questions = quiz.questions.map(({ text, options, answer }, i) =>
                                        ({ text, options, answer, response: responses[i] }));

    await users.updateOne(
        { 'quizzes._id': new ObjectId(quizId) },
        { $set: { 'quizzes.$': quiz } }
    );

    const answers = quiz.questions.map(question => question.answer);
    const incorrectProblems = [];
    for (let i = 0; i < answers.length; i++) {
        if (responses[i].some((x, j) => answers[i][j] != x))
            incorrectProblems.push({ index: i, answer: answers[i], response: responses[i] });
    }
    return incorrectProblems;
}

export async function deleteQuiz(user: User, quizId: string): Promise<void> {
    await users.updateOne(
        { _id: user._id },
        { $pull: { 'quizzes._id': quizId } }
    );
}
