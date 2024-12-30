import type { Document, ObjectId } from 'mongoose';
import type { IQuiz, IUnansweredQuiz } from './quiz';

import { model, Schema } from 'mongoose';
import { QuizSchema, UnansweredQuizSchema } from './quiz';


export interface IUser {
    _id: ObjectId;
    name: string;
    email: string;
    authProvider: 'GITHUB' | 'GOOGLE';
    accessToken: string;
    quizzes: IQuiz[];
    unansweredQuizzes: IUnansweredQuiz[];
    createdAt: Date;
}

export type TUser = Document<unknown, {}, IUser> & IUser;

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    authProvider: {
        type: String,
        enum: ['GITHUB', 'GOOGLE'],
        required: true,
        index: true,
    },
    accessToken: { type: String, required: true, index: true },
    quizzes: { type: [QuizSchema], required: true },
    unansweredQuizzes: { type: [UnansweredQuizSchema], required: true },
    createdAt: { type: Date, required: true },
});

export const User = model('User', UserSchema);
