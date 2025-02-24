import { MongoClient, ObjectId } from 'mongodb';

export type AuthProvider = 'GITHUB' | 'GOOGLE';

export interface User {
    _id: ObjectId;
    name: string;
    email: string;
    authProvider: AuthProvider;
    authId: string;
    accessToken: string;
    quizzes: (Quiz | UnansweredQuiz)[];
    createdAt: Date;
}

export type UnansweredQuiz = Omit<Quiz, 'questions' | 'answered'> & {
    questions: UnansweredQuestion[];
    answered: false;
};

export interface Quiz {
    id: ObjectId;
    name: string;
    category: string;
    difficulty: string;
    questions: Question[];
    multipleAnswers: boolean;
    remarks?: string;
    answered: true;
    createdAt: Date;
}

export type UnansweredQuestion = Omit<Question, 'response'>;
export interface Question {
    text: string;
    options: string[];
    answer: number[];
    response: number[];
}

export const client = new MongoClient(process.env.DATABASE_URL!);
export const database = client.db('neo_academy');
export const users = database.collection<User>('users');

await client.connect();
