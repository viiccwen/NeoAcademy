import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { users } from 'database';
import z from 'zod';

import type { createQuizSchema } from 'schemas/quiz';
import { generateQuiz, getQuiz, recordQuiz, submitAnswer } from 'utils/quiz';
import { omitProperties, pickProperties } from 'utils/objects';

export const getAllQuiz = async (req: Request, res: Response) => {
    try {
        const user = req.user!;
        const type = req.query.type ?? 'details';
        let quizzes: unknown[] = [];

        if (type === 'details') {
            quizzes = user.quizzes.map(quiz => {
                const trimmedQuiz = omitProperties(quiz, 'remarks');

                if (!quiz.answered) {
                    // @ts-expect-error drops unnecessary properties
                    trimmedQuiz.questions = quiz.questions.map(({ text, options }) => ({ text, options }));
                }

                return trimmedQuiz;
            });
        } else if (type === 'take-quiz') {
            quizzes = user.quizzes.map(quiz => omitProperties(quiz, 'questions', 'remarks', 'answered'));
        } else {
            res.status(400).json({ message: '沒有這個操作！' });
        }

        if (!quizzes.length) {
            res.status(400).json({ message: '找不到任何測驗！' });
            return;
        }
        res.status(200).json(quizzes);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message || '發生錯誤！' });
    }
};

export const getQuizById = async (req: Request, res: Response) => {
    try {
        const user = req.user!;
        const type = req.query.type ?? 'details';
        const quiz = getQuiz(user, req.params.quizId);
        if (!quiz) throw new Error('找不到測驗！');

        if (type === 'details') {
            res.status(200).json(quiz);
        } else if (type === 'take-quiz') {
            res.status(200).json({
                ...quiz,
                questions: quiz.questions.map(question => pickProperties(question, 'text', 'options')),
            });
        } else {
            res.status(400).json({ message: '沒有這個操作！' });
            return;
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message || '發生錯誤！' });
    }
};

export const createQuiz = async (req: Request, res: Response) => {
    try {
        const {
            name,
            category,
            difficulty,
            option,
            question,
            multipleAnswers,
            remarks,
        } = req.body as z.infer<typeof createQuizSchema>;

        const quiz = await generateQuiz(
            name,
            category,
            difficulty,
            option,
            question,
            multipleAnswers,
            remarks ?? ''
        );

        await recordQuiz(req.user!, quiz);

        const questions = quiz.questions.map(({ text, options }) => ({
            text,
            options,
        }));

        res.status(200).json({ id: quiz.id, questions });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message || '發生錯誤！' });
    }
};

export const submitQuiz = async (req: Request, res: Response) => {
    try {
        const user = req.user!;
        const responses = req.body as number[][];
        const { quizId } = req.params;

        await submitAnswer(user, quizId, responses);

        res.sendStatus(204);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message || '發生錯誤！' });
    }
};

export async function deleteQuiz(req: Request, res: Response) {
    try {
        const user = req.user!;
        const { quizId } = req.params;

        const updated_user = await users.updateOne(
            { _id: user._id },
            { $pull: { quizzes: { id: new ObjectId(quizId) } } }
        );

        if (!updated_user) throw new Error('刪除測驗失敗！');

        res.sendStatus(204);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message || '發生未知錯誤！' });
    }
}
