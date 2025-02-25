import type { Quiz } from 'types/Quiz';

import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import type { json } from 'express';


export const formatQuizSystemMessage = (
    option: number,
    question: number,
    multipleAnswers: boolean
): SystemMessage => {
    return new SystemMessage(
        `You are a quiz generator.
You will generate ${question} questions in total, and each question will have ${option} options. 
Every question is a ${multipleAnswers ? 'single' : 'multiple'}-choice question.
You will return an array of objects in JSON format, each object correspond to a question.
The question object will look like:
\`\`\`json{
    "text": "the text of the question",
    "options": ["text of option 0", "text of option 1", ..., "text of option ${option}"],
    "answer": [numbers of the correct options]
}\`\`\`
Return the JSON string without line breaks and code block.`
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
        `你是一位專業的學習分析師。以下是使用者的測驗結果，請根據測驗資料分析使用者的學習狀況，找出他的優勢與弱點，並根據他的錯誤模式提供學習建議。  
        請根據他的測驗記錄，僅需回傳兩項： 
        1. 找出他的強項科目與弱項科目  
        2. 提供學習建議：
        - 強項：適合挑戰的進階內容
        - 弱項：應該加強的學習領域，以及推薦的學習方式`
    );

export const formatAnalysisHumanMessage = (quizzes: Quiz[]) => {
    return new HumanMessage(
        `以下是使用者的測驗記錄：
        ${JSON.stringify(quizzes)}`
    );
};

export const roadmapSystemMessage =
    `你是一位規劃學習路線圖的專家，
    會依照使用者指定的主題、名稱、詳細資訊來個人化他的學習路線圖。
    你輸出多個階段，來表示使用者在學習下一階段前要有什麼必要知識。
    而每個段落裡有多個副段落，裡面有更詳細的資訊來告訴使用者該如何進行。
    你輸出的格式如下：
    \`\`\`json
    [
        {
            "title": "JavaScript 基礎概念",
            "description": "了解 JavaScript 的基本語法和概念",
            "subsections": [
                {
                    "title": "變數和數據類型",
                    "description": "學習 JavaScript 中的變數宣告和基本數據類型"
                }
            ]
        },
        {
            ...
        }
    ]
    \`\`\`
    你的輸出不用換行，也不用程式塊。`;

export const formatRoadmapHumanMessage = (
    name: string,
    description: string,
    topic: string
) => {
    return new HumanMessage(
        `我想要一個學習路線圖
        他的主題是 ${topic}
        名稱是 ${name}
        詳細資訊是 ${description}`
    );
};
