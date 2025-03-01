import { generateChatMessage } from 'controllers/chatbot-controller';
import { Router } from 'express';
import authMiddleware from 'middlewares/auth-middleware';
import validateBodyMiddleware from 'middlewares/validate-body-middleware';
import { chatMessageSchema } from 'schemas/chatbot';


const chatbotRouter = Router();

chatbotRouter.post('/chatbot', authMiddleware, validateBodyMiddleware(chatMessageSchema), generateChatMessage);

export default chatbotRouter;
