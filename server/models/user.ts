import { model, Schema } from 'mongoose';
import { Quiz } from './quiz';


const UserSchema = new Schema({
    name: String,
    email: String,
    authProvider: {
        type: String,
        enum: ['GITHUB', 'GOOGLE'],
    },
    accessToken: String,
    refreshToken: String,
    quizzes: [Quiz],
}, { timestamps: true });

export const User = model('User', UserSchema);
