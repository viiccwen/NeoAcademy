import { faker } from "@faker-js/faker";
import { GetQuizType, QuestionType } from "./type";

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
}: GenerateQuestionType): QuestionType | { response: number[], answer: number[] } => {
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

  if(!withResponse) {
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
