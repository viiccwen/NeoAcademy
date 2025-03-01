import { model } from 'app';
import { formatResponseHumanMessage, responseSystemMessage } from './message';


export async function generateResponse(previousMessages: string[], currentMessage: string): Promise<string> {
    const aiMessage = await model.invoke([
        responseSystemMessage,
        formatResponseHumanMessage(previousMessages, currentMessage),
    ]);

    return aiMessage.content.toString();
}
