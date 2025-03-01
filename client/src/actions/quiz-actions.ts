import axios, { AxiosResponse } from "axios";
import {
  AnsweredQuestionType,
  CreateQuizType,
  GetAllQuizType,
  GetQuizType,
  QuestionType,
  QuizReturnType,
  SubmitQuizReturnType,
  SubmitQuizType,
} from "@/lib/type";

const API_URL = import.meta.env.VITE_API_URL;

export const createQuiz = async (
  token: string,
  formdata: CreateQuizType
): Promise<QuizReturnType> => {
  try {
    const response: AxiosResponse<QuizReturnType, any> = await axios.post(
      `${API_URL}/quiz`,
      formdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("建立測驗錯誤！");
    }
  } catch (error: any) {
    throw new Error(error.message || "未知錯誤發生！");
  }
};

export const submitQuiz = async ({
  token,
  quizId,
  answers,
}: SubmitQuizType & { token: string }): Promise<SubmitQuizReturnType> => {
  try {
    const response: AxiosResponse<SubmitQuizReturnType, any> = await axios.put(
      `${API_URL}/quiz/${quizId}`,
      answers,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 204) {
      return response.data;
    } else {
      throw new Error("提交測驗錯誤！");
    }
  } catch (error: any) {
    throw new Error(error.message || "未知錯誤發生！");
  }
};

export const getQuiz = async <T extends QuestionType | AnsweredQuestionType>(
  quizId: string,
  token: string,
  isAnswered: boolean
): Promise<GetQuizType<T>> => {
  const type = isAnswered ? "details" : "take-quiz";
  try {
    const response: AxiosResponse<GetQuizType<T>, any> = await axios.get(
      `${API_URL}/quiz/${quizId}?type=${type}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("取得測驗錯誤！");
    }
  } catch (error: any) {
    throw new Error(error.message || "未知錯誤發生！");
  }
};

export const deleteQuiz = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`${API_URL}/quiz/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      return;
    } else {
      throw new Error("刪除測驗資料錯誤！");
    }
  } catch (error: any) {
    throw new Error(error.message || "未知錯誤發生！");
  }
};

export const getAllQuiz = async (token: string): Promise<GetAllQuizType> => {
  try {
    const response: AxiosResponse<GetAllQuizType, any> = await axios.get(
      `${API_URL}/quiz?type=take-quiz`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("刪除測驗資料錯誤！");
    }
  } catch (error: any) {
    throw new Error(error.message || "未知錯誤發生！");
  }
};

export const getDetailsAllQuiz = async (
  token: string
): Promise<GetQuizType<QuestionType | AnsweredQuestionType>[]> => {
  try {
    const response: AxiosResponse<
      GetQuizType<QuestionType | AnsweredQuestionType>[],
      any
    > = await axios.get(`${API_URL}/quiz?type=details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("刪除測驗資料錯誤！");
    }
  } catch (error: any) {
    throw new Error(error.message || "未知錯誤發生！");
  }
};
