import { model, Schema } from 'mongoose';


const ProblemSchema = new Schema({
    text: String,
    options: [String],
    answer: [Number],
    response: [Number],
});

const UnansweredProblemSchema = new Schema({
    text: String,
    options: [String],
    answer: [Number],
});


export const Problem = model('Quiz', ProblemSchema);
export const UnansweredProblem = model('Quiz', UnansweredProblemSchema);
