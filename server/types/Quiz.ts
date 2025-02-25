import { ObjectId } from 'mongodb';


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
