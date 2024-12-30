import type { Document } from 'mongoose';
import { Schema } from 'mongoose';


export interface IProblem {
    text: string;
    options: string[];
    answer: number[];
    response: number[];
}

export interface IUnansweredProblem {
    text: string;
    options: string[];
    answer: number[];
}

export type TProblem = Document<unknown, {}, IProblem> & IProblem;
export type TUnansweredProblem = Document<unknown, {}, IUnansweredProblem> & IUnansweredProblem;

export const ProblemSchema = new Schema({
    text: { type: String, required: true },
    options: { type: [String], required: true },
    answer: { type: [Number], required: true },
    response: { type: [Number], required: true },
}, { id: false });

export const UnansweredProblemSchema = new Schema<IUnansweredProblem>({
    text: { type: String, required: true },
    options: { type: [String], required: true },
    answer: { type: [Number], required: true },
}, { id: false });
