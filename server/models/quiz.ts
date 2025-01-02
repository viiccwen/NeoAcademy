import type { Document, ObjectId } from 'mongoose';
import type { IQuestion, IUnansweredQuestion } from './question';

import { Schema, Types } from 'mongoose';
import { QuestionSchema, UnansweredQuestionSchema } from './question';


export interface IQuiz {
    _id: ObjectId;
    name: string;
    category: string;
    difficulty: string;
    questions: IQuestion[];
    multipleAnswers: boolean;
    remarks?: string;
    createdAt: Date;
}

export interface IUnansweredQuiz {
    _id: ObjectId;
    name: string;
    category: string;
    difficulty: string;
    questions: IUnansweredQuestion[];
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
    questions: { type: [QuestionSchema], required: true },
    multipleAnswers: { type: Boolean, required: true },
    remarks: String,
    createdAt: { type: Date, required: true },
});

export const UnansweredQuizSchema = new Schema<IUnansweredQuiz>({
    _id: { type: Types.ObjectId, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    questions: { type: [UnansweredQuestionSchema], required: true },
    multipleAnswers: { type: Boolean, required: true },
    remarks: String,
    createdAt: { type: Date, required: true, default: Date.now, expires: 60 * 60 },
});
