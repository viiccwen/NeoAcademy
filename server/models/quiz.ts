import type { Document, ObjectId } from 'mongoose';
import type { IProblem, IUnansweredProblem } from './problem';

import { Schema, Types } from 'mongoose';
import { ProblemSchema, UnansweredProblemSchema } from './problem';


export interface IQuiz {
    _id: ObjectId;
    name: string;
    category: string;
    difficulty: string;
    problems: IProblem[];
    multipleAnswers: boolean;
    remarks?: string;
    createdAt: Date;
}

export interface IUnansweredQuiz {
    _id: ObjectId;
    name: string;
    category: string;
    difficulty: string;
    problems: IUnansweredProblem[];
    multipleAnswers: boolean;
    remarks?: string;
    createdAt: Date;
}

export type TQuiz = Document<unknown, {}, IQuiz> & IQuiz;
export type TUnansweredQuiz = Document<unknown, {}, IUnansweredQuiz> & IUnansweredQuiz;

export const QuizSchema = new Schema<IQuiz>({
    _id: { type: Types.ObjectId, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    problems: { type: [ProblemSchema], required: true },
    multipleAnswers: { type: Boolean, required: true },
    remarks: String,
    createdAt: { type: Date, required: true },
});

export const UnansweredQuizSchema = new Schema<IUnansweredQuiz>({
    _id: { type: Types.ObjectId, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    problems: { type: [UnansweredProblemSchema], required: true },
    multipleAnswers: { type: Boolean, required: true },
    remarks: String,
    createdAt: { type: Date, required: true, default: Date.now, expires: 60 * 60 },
});
