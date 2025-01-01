import type { IUnansweredProblem } from 'models/problem';
import type { IUnansweredQuiz } from 'models/quiz';
import type { TUser } from 'models/user';

import { ObjectId } from 'mongodb';


const dummi: IUnansweredProblem[] = [
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

const dummy: Omit<IUnansweredQuiz, '_id'> = {
    name: 'henlo mathz',
    category: 'differential geometry',
    difficulty: 'medium',
    problems: dummi,
    multipleAnswers: false,
    createdAt: new Date(),
};

export async function generateUnansweredQuiz(name: string, category: string, difficulty: string, option: number, problem: number, mulAnswer: boolean, remarks: string): Promise<IUnansweredQuiz> {
    return { _id: new ObjectId(), ...dummy };
}

export async function recordUnansweredQuiz(user: TUser, quiz: Omit<IUnansweredQuiz, '_id'>): Promise<void> {
    await user.updateOne({ $push: { unansweredQuizzes: quiz } });
}

export async function submitAndGetAnswers(user: TUser, quizId: string, responses: number[][]): Promise<number[]> {
    const unansweredQuiz = user.unansweredQuizzes.find(q => q._id.toString() == quizId);
    if (!unansweredQuiz) {
        throw new Error('Not found');
    }

    unansweredQuiz.problems.forEach((p, i) => {
        p.response = responses[i];
    });

    await user.updateOne({
        $push: { quizzes: unansweredQuiz },
        $pull: { unansweredQuizzes: { _id: unansweredQuiz._id } }
    });

    const answers = unansweredQuiz.problems.map(problem => problem.answer);
    const incorrectProblems = [];
    for (let i = 0; i < answers.length; i++) {
        if (responses[i].some((x, j) => answers[i][j] != x))
            incorrectProblems.push(i);
    }
    return incorrectProblems;
}
