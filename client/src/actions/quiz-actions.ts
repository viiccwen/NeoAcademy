import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
import { CreateQuizType, QuizReturnType } from "@/lib/type";
import { DelayFunc } from "@/lib/utils";
import { mock_question_1, mock_question_2 } from "@test/mock-quiz";

const API_URL = import.meta.env.VITE_API_URL;

/**
 *
 * @param formdata: CreateQuizType
 * @returns Promise<QuizReturnType>
 */
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
