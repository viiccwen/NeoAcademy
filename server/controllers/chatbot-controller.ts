import type { Request, Response } from 'express';
import { generateResponse } from 'utils/chatbot';


export const generateChatMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { previousMessages } = req.body;

        res.status(200).json(await generateResponse(previousMessages));
    } catch (e: any) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
};
