import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import type { Quiz } from "database";

export const formatSystemMessage = (
  option: number,
  question: number,
  multipleAnswers: boolean
): SystemMessage => {
  return new SystemMessage(
    `You are a quiz generator.
 You will generate ${question} questions in total, and each question will have ${option} options. 
 Every question is a ${multipleAnswers ? "single" : "multiple"}-choice question.
 You will return an array of objects in JSON format, each object correspond to a question.
 The question object will look like:
 \`\`\`json{
    "text": "the text of the question",
    "options": ["text of option 0", "text of option 1", ..., "text of option n"],
    "answer": [numbers of the correct options]
 }\`\`\`
Return the JSON string without line breaks and code block.`
  );
};

export const formatHumanMessage = (
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

export const formatAnalysisSystemMessage = (): SystemMessage => {
  return new SystemMessage(
    `你是一位專業的學習分析師。以下是使用者的測驗結果，請根據測驗資料分析使用者的學習狀況，找出他的優勢與弱點，並根據他的錯誤模式提供學習建議。  
      請根據他的測驗記錄，僅需回傳兩項： 
      1. 找出他的強項科目與弱項科目  
      2. 提供學習建議：
        - 強項：適合挑戰的進階內容
        - 弱項：應該加強的學習領域，以及推薦的學習方式`
  );
};

export const formatAnalysisHumanMessage = (quizzes: Quiz[]) => {
  return new HumanMessage(
    `以下是使用者的測驗記錄：
      ${JSON.stringify(quizzes)}`
  );
};
