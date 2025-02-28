import type { UnansweredQuestion, Quiz, UnansweredQuiz } from 'types/Quiz';
import type { User } from 'types/User';

import { users } from 'database';
import {
    AIMessageChunk,
    HumanMessage,
    SystemMessage,
} from '@langchain/core/messages';
import { formatQuizHumanMessage, formatQuizSystemMessage } from 'utils/message';
import { ObjectId } from 'mongodb';
import { model } from 'app';


export function getQuiz(user: User, quizId: string): Quiz | UnansweredQuiz | undefined {
    console.log(user.quizzes);
    console.log(quizId);
    return user.quizzes.find(({ id }) => id.toString() === quizId);
}


export async function generateQuiz(
    name: string,
    category: string,
    difficulty: string,
    option: number,
    question: number,
    multipleAnswers: boolean,
    remarks: string
): Promise<UnansweredQuiz> {
    const systemMessage: SystemMessage = formatQuizSystemMessage(
        option,
        question,
        multipleAnswers
    );
    const humanMessage: HumanMessage = formatQuizHumanMessage(
        name,
        category,
        difficulty,
        remarks
    );
    const aiMessage: AIMessageChunk = await model.invoke([
        systemMessage,
        humanMessage,
    ]);

    const questions = JSON.parse(
        aiMessage.content.toString()
    ) as UnansweredQuestion[];

    return {
        id: new ObjectId(),
        name,
        category,
        difficulty,
        multipleAnswers,
        questions,
        answered: false,
        createdAt: new Date(),
    };
}

export async function recordQuiz({ authId }: User, quiz: Quiz | UnansweredQuiz): Promise<void> {
    await users.updateOne({ authId }, { $push: { quizzes: quiz } });
}

export const submitAnswer = async (
    user: User,
    quizId: string,
    responses: number[][]
) => {
    try {
        const quizIndex = user.quizzes.findIndex((q) => q.id.toString() === quizId);
        if (quizIndex === -1) throw new Error('找不到測驗！');

        const quiz = user.quizzes[quizIndex] as Quiz;

        quiz.answered = true;
        for (let i = 0, n = quiz.questions.length; i < n; i++) {
            quiz.questions[i].response = responses[i];
        }

        const result = await users.updateOne(
            { 'quizzes.id': new ObjectId(quizId) },
            { $set: { [`quizzes.${quizIndex}`]: quiz } }
        );

        if (!result.modifiedCount) {
            throw new Error('測驗更新失敗，請重試。');
        }

        return quiz;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message || '發生不知名錯誤！');
    }
};

export const getIncorrectQuestions = async (quiz: Quiz) => {
    const answers = quiz.questions.map((question) => question.answer);
    const responses = quiz.questions.map((question) => question.response);
    const incorrectProblems = [];

    for (let i = 0; i < answers.length; i++) {
        if (responses[i].some((x, j) => answers[i][j] != x))
            incorrectProblems.push({
                index: i,
                answer: answers[i],
                response: responses[i],
            });
    }

    return incorrectProblems;
};
