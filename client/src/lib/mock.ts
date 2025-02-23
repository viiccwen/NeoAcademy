import { faker } from "@faker-js/faker";
import { GetQuizType, QuestionType, Roadmap, Roadmaps } from "./type";

interface GenerateQuestionType {
  options_num: number;
  withAnswer: boolean;
  withResponse: boolean;
  isMultipleAnswer?: boolean;
}

export const generateQuestion = ({
  options_num,
  withAnswer,
  withResponse,
  isMultipleAnswer,
}: GenerateQuestionType):
  | QuestionType
  | { response: number[]; answer: number[] } => {
  const text: string = faker.lorem.sentence();
  const options: string[] = Array.from({ length: options_num }, () =>
    faker.lorem.word()
  );
  const response: number[] = isMultipleAnswer
    ? Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () =>
        faker.number.int({ min: 0, max: 3 })
      )
    : [faker.number.int({ min: 0, max: 3 })];
  const answer: number[] = isMultipleAnswer
    ? Array.from({ length: faker.number.int({ min: 2, max: 4 }) }, () =>
        faker.number.int({ min: 0, max: 3 })
      )
    : [faker.number.int({ min: 0, max: 3 })];

  if (!withAnswer) {
    return { text, options };
  }

  if (!withResponse) {
    return { text, options, answer };
  }

  return {
    text,
    options,
    response,
    answer,
  };
};

export const generateQuiz = () => {
  const categories = ["Math", "Science", "History", "Language"];
  const difficulties = ["Easy", "Medium", "Hard"];

  const id = faker.string.uuid();
  const name = faker.lorem.sentence();
  const category = faker.string.fromCharacters(categories);
  const difficulty = faker.string.fromCharacters(difficulties);
  const questions: QuestionType[] = Array.from(
    { length: 10 },
    () =>
      generateQuestion({
        options_num: 4,
        withAnswer: true,
        withResponse: true,
        isMultipleAnswer: false,
      }) as QuestionType
  );
  const multipleAnswers = parseInt(faker.number.binary()) === 1 ? true : false;
  const createdAt = faker.date.recent();
  const remarks = faker.lorem.sentence();

  return {
    id,
    name,
    category,
    difficulty,
    questions,
    multipleAnswers,
    createdAt,
    remarks,
  } as GetQuizType<QuestionType>;
};

export const mockRoadmaps: Roadmaps[] = [
  {
    id: "1",
    name: "JavaScript 基礎到進階",
    topic: "Programming",
    description: "完整的 JavaScript 學習路徑，從基礎語法到高級概念",
    progress: 65,
    totalSections: 8,
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "2",
    name: "英語會話入門",
    topic: "Language",
    description: "基礎英語會話學習路徑，著重日常對話和發音",
    progress: 30,
    totalSections: 12,
    createdAt: new Date("2024-02-18"),
  },
  {
    id: "3",
    name: "微積分基礎",
    topic: "Math",
    description: "從基礎概念開始的微積分學習路徑",
    progress: 0,
    totalSections: 10,
    createdAt: new Date("2024-02-15"),
  },
];

export const mockRoadmap: Roadmap = {
  id: "js-101",
  name: "JavaScript 基礎到進階",
  description: "完整的 JavaScript 學習路徑指南",
  sections: [
    {
      id: "1",
      title: "JavaScript 基礎概念",
      description: "了解 JavaScript 的基本語法和概念",
      subsections: [
        {
          id: "1-1",
          title: "變數和數據類型",
          description: "學習 JavaScript 中的變數宣告和基本數據類型",
        },
        {
          id: "1-2",
          title: "運算子和表達式",
          description: "理解各種運算子的使用方式和運算優先順序",
        },
        {
          id: "1-3",
          title: "控制流程",
          description: "掌握條件語句和迴圈的使用",
        },
      ],
    },
    {
      id: "2",
      title: "函數和作用域",
      description: "深入理解 JavaScript 函數和作用域概念",
      subsections: [
        {
          id: "2-1",
          title: "函數宣告和表達式",
          description: "學習不同的函數定義方式",
        },
        {
          id: "2-2",
          title: "作用域和閉包",
          description: "理解變數作用域和閉包的概念",
        },
      ],
    },
    {
      id: "3",
      title: "物件和原型",
      description: "學習 JavaScript 物件導向程式設計",
      subsections: [
        {
          id: "3-1",
          title: "物件基礎",
          description: "了解物件的創建和使用方式",
        },
        {
          id: "3-2",
          title: "原型和繼承",
          description: "掌握原型鏈和繼承的概念",
        },
      ],
    },
  ],
};
