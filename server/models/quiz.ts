import { model, Schema } from 'mongoose';
import { Problem, UnansweredProblem } from './problem';


const QuizSchema = new Schema({
    name: String,
    category: String,
    difficulty: String,
    problem: [Problem],
    option: Number,
    multipleAnswers: Boolean,
    remarks: String,
});

const UnansweredQuizSchema = new Schema({
    name: String,
    category: String,
    difficulty: String,
    problem: [UnansweredProblem],
    option: Number,
    multipleAnswers: Boolean,
    remarks: String,
});
UnansweredQuizSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 });


export const UnansweredQuiz = model('UnansweredQuiz', UnansweredQuizSchema);
export const Quiz = model('Quiz', QuizSchema);
