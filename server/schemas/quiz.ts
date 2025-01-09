import { z } from 'zod';


export const createQuizSchema = z.object({
    name: z.string(),
    category: z.string(),
    difficulty: z.string(),
    question: z.number().positive().max(100),
    option: z.number().positive().max(10),
    multipleAnswers: z.boolean(),
    remarks: z.string().default(''),
});

export const submitQuizSchema = z.array(z.array(z.number()));
