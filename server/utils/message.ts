import type { Quiz } from 'types/Quiz';

import { HumanMessage, SystemMessage } from '@langchain/core/messages';


export const formatQuizSystemMessage = (
    option: number,
    question: number,
    multipleAnswers: boolean
): SystemMessage => {
    return new SystemMessage(
        `You are a quiz generator designed to create safe and educational content. You will generate ${question} questions in total, and each question will have ${option} options. Every question is a ${multipleAnswers ? 'multiple' : 'single'}-choice question. You will return an array of objects in JSON format, each object corresponding to a question. The question object will look like:
        {"text": "the text of the question", "options": ["text of option 0", "text of option 1", ..., "text of option ${option - 1}"], "answer": [numbers of the correct options]}
        
        **Instructions:**
        1. For questions or options containing mathematical expressions, use LaTeX syntax with \( ... \) for inline math and \[ ... \] for block-level math.
        2. Ensure all content is safe, appropriate, and suitable for educational purposes. Avoid generating questions or options that are offensive, misleading, or contain harmful information.
        3. Ensure the 'answer' array contains valid option indices (0 to ${option - 1}) and is not empty.
        4. Return the JSON string without line breaks or code blocks, ensuring it is compact and valid JSON. If unable to generate valid questions, return an empty array '[]'.
        `
    );
};

export const formatQuizHumanMessage = (
    name: string,
    category: string,
    difficulty: string,
    remarks: string
): HumanMessage => {
    return new HumanMessage(
        `Title of the quiz: ${name}.
        Category of the quiz: ${category}.
        Difficulty of the quiz: ${difficulty}.
        Remarks: "${remarks}"`
    );
};

export const analysisSystemMessage =
    new SystemMessage(
        `You are an learning analyzer.
        Below is the user's test results, please analyze them and rate how well the user is learning.
        Also list out what are their strengths and weaknesses, and depending on them give the user learning advices.
        Please output in the following format:
        1. The user's strengths and weaknesses.
        2. Learning advices:
            - Strength: what can the user do to further improve their strength.
            - Weakness: what can the user do to improve.
        Please output the result in Traditional Chinese (Taiwan)`
    );

export const formatAnalysisHumanMessage = (quizzes: Quiz[]) => {
    return new HumanMessage(
        `The following is the user's test results:
        ${JSON.stringify(quizzes)}`
    );
};

export const roadmapSystemMessage =
    `You are a learning roadmap designer.
    You will be given a topic, the roadmap's name and description to personalize the user's learning roadmap.
    You will output several sections, so that the user will have a smooth learning experience.
    Each section will have several subsections, which tells the user what to learn in detail.
    Please output in the following format:
    \`\`\`json
    [
        {
            "title": "JavaScript Foundations",
            "description": "Understand basic JavaScript syntax and concepts",
            "subsections": [
                {
                    "title": "Variables and Data Types",
                    "description": "Learn about variables declaration and data types in JavaScript."
                }
            ]
        },
        {
            ...
        }
    ]
    \`\`\`
    Return the JSON without line breaks and code blocks.
    Please return the JSON values in Traditional Chinese (Taiwan)`;

export const formatRoadmapHumanMessage = (
    name: string,
    description: string,
    topic: string
) => {
    return new HumanMessage(
        `I want a learning roadmap.
        Its topic is ${topic}.
        Name is ${name}.
        Description is ${description}.`
    );
};

export const responseSystemMessage = `
    You are an expert in learning, and the user will ask you question regarding how should they proceed.
    You will be given previous messages with the user if present.`;

export const formatResponseHumanMessage = (previousMessages: string[], currentMessage: string) => {
    let conversation = '';

    for (let i = 0, n = previousMessages.length; i < n; i++) {
        conversation += `${i % 2 ? 'User:' : 'You:'}\n${previousMessages[i]}\n`;
    }

    return `${conversation}\nUser:\n${currentMessage}`;
}
