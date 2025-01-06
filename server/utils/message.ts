import { HumanMessage, SystemMessage } from "@langchain/core/messages";

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
