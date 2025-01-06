import type { Request, Response } from "express";
import { ObjectId } from "mongodb";
import type { Quiz } from "database";
import { users } from "database";
import z from "zod";

import type { createQuizSchema } from "schemas/quiz";
import { getQuiz, recordQuiz, submitAnswer } from "utils/quiz";
import type { QuizRequestType } from "utils/type";


export const getAllQuiz = async (req: Request, res: Response) => {
    try {
        const user = req.user!;
        const type = req.query.type ?? 'details';
        if (type !== 'details') throw new Error("沒有這個操作！");

        const quizzes = user.quizzes.map(({ id, name, category, difficulty, multipleAnswers, createdAt }) => ({
            id, name, category, difficulty, multipleAnswers, createdAt
        }));
        if (!quizzes) throw new Error("找不到任何測驗！");

        res.status(200).json(quizzes);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message || "發生錯誤！" });
    }
};

export const getQuizById = async (req: Request, res: Response) => {
    try {
        const user = req.user!;
        const type = req.query.type ?? 'details';
        const quiz = getQuiz(user, req.params.quizId);
        if (!quiz) throw new Error("找不到測驗！");

        if (type === 'details') {
            // return the entire quiz object
            res.status(200).json(quiz);
        } else if (type === 'take-quiz') {  
            // return the quiz object but question.response is removed
            const responsesStripped = {
                ...quiz,
                questions: quiz.questions.map(({ text, options, answer }) =>
                                              ({ text, options, answer }))
            };

            res.status(200).json(responsesStripped);
        } else {
            throw new Error("沒有這個操作！");
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message || "發生錯誤！" });
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

        // genearate quiz
        const quiz = {
            id: new ObjectId(),
            name,
            category,
            difficulty,
            questions: [
                {
                    text: "What is the formula for water?",
                    options: ["H2O", "CO2", "O2", "H2SO4"],
                    answer: [0, 2, 3],
                },
                {
                    text: "Who discovered gravity?",
                    options: ["Einstein", "Newton", "Galileo", "Tesla"],
                    answer: [1],
                },
                {
                    text: "What is the closest planet to the sun?",
                    options: ["Earth", "Mars", "Mercury", "Venus"],
                    answer: [2],
                },
                {
                    text: "What is the largest mammal?",
                    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
                    answer: [1],
                },
                {
                    text: "What is the powerhouse of the cell?",
                    options: ["Nucleus", "Mitochondria", "Ribosome", "Lysosome"],
                    answer: [1],
                },
            ],
            multipleAnswers,
            remarks: remarks ?? "",
            answered: false as false,
            createdAt: new Date(),
        };

        // todo: already tested, remove this at last
        // const quiz = await generateQuiz(
        //   name,
        //   category,
        //   difficulty,
        //   option,
        //   question,
        //   multipleAnswers,
        //   remarks ?? ""
        // );

        // record quiz
        await recordQuiz(req.user!, quiz);

        const questions = quiz.questions.map(({ text, options }) => ({
            text,
            options,
        }));

        res.status(200).json({ id: quiz.id, questions });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message || "發生錯誤！" });
    }
};

export const submitQuiz = async (req: Request, res: Response) => {
    try {
        const user = req.user!;
        const responses = req.body as number[][];
        const { quizId } = req.params;

        (await submitAnswer(user, quizId, responses)) as Quiz;

        res.sendStatus(200);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message || "發生錯誤！" });
    }
};

export async function deleteQuiz(req: Request, res: Response) {
    try {
        const user = req.user!;
        const { quizId } = req.params;

        const updated_user = await users.updateOne(
            { id: user._id },
            { $pull: { quizzes: { id: new ObjectId(quizId) } } }
        );

        if(!updated_user) throw new Error("刪除測驗失敗！");

        res.sendStatus(200);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message || "發生未知錯誤！" });
    }
}
