import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
import { CreateQuizType, QuizReturnType } from "@/lib/type";
import { DelayFunc } from "@/lib/utils";
import { mock_question_1, mock_question_2 } from "@test/mock-quiz";

const API_URL = import.meta.env.VITE_API_URL;

export const createQuiz = async (
  formdata: CreateQuizType
): Promise<QuizReturnType> => {
  try {
    // todo: test
    return DelayFunc({
      isError: false,
      delay: 2000,
      func: () => mock_question_2,
    });

    const token = await Cookies.get("token");
    if (!token) {
      throw new Error("使用者請重新登入！");
    }

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

// todo: only support update name now
interface UpdateQuizType {
  type: "name" | "category" | "description" | "questions";
  text: string;
}

export const updateQuiz = async ({ type, text }: UpdateQuizType) => {
  try {
    const token = await Cookies.get("token");
    if (!token) {
      throw new Error("使用者請重新登入！");
    }

    const response: AxiosResponse<QuizReturnType, any> = await axios.post(
      `${API_URL}/quiz/update/${type}`,
      text,
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

export const deleteQuiz = async (id: string) => {
  try {
    const token = await Cookies.get("token");
    if (!token) {
      throw new Error("使用者請重新登入！");
    }

    const response = await axios.delete(`${API_URL}/quiz`, {
      params: {
        id,
      },
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
