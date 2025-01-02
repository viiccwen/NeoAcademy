import type { Document } from 'mongoose';
import { Schema } from 'mongoose';
import type { IQuiz } from './quiz';


export interface IQuestion {
    text: string;
    options: string[];
    answer: number[];
    response: number[];
}

export interface IUnansweredQuestion {
    text: string;
    options: string[];
    answer: number[];
}

export type TQuestion = Document<unknown, {}, IQuiz> & IQuiz;
export type TUnansweredQuestion = Document<unknown, {}, IUnansweredQuestion> & IUnansweredQuestion;

export const QuestionSchema = new Schema({
    text: { type: String, required: true },
    options: { type: [String], required: true },
    answer: { type: [Number], required: true },
    response: { type: [Number], required: true },
}, { _id: false });

export const UnansweredQuestionSchema = new Schema<IUnansweredQuestion>({
    text: { type: String, required: true },
    options: { type: [String], required: true },
    answer: { type: [Number], required: true },
}, { _id: false });
