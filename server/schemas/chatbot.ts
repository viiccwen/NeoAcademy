import { z } from 'zod';


export const chatMessageSchema = z.object({
    previousMessages: z.array(z.string()),
    currentMessage: z.string(),
});
