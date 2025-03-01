import type { ObjectId } from 'mongodb';
import type { Quiz, UnansweredQuiz } from './Quiz';
import type { Roadmap } from './Roadmap';


export type AuthProvider = 'GITHUB' | 'GOOGLE';

export interface User {
    _id: ObjectId;
    name: string;
    email: string;
    authProvider: AuthProvider;
    authId: string;
    accessToken: string;
    quizzes: (Quiz | UnansweredQuiz)[];
    roadmaps: Roadmap[];
    createdAt: Date;
}
