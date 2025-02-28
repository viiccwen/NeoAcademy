import { model } from 'app';
import { formatResponseHumanMessage, responseSystemMessage } from './message';


export async function generateResponse(previousMessages: string[]): Promise<string> {
    const aiMessage = await model.invoke([
        responseSystemMessage,
        formatResponseHumanMessage(previousMessages),
    ]);

    return aiMessage.content.toString();
}
