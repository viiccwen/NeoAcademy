import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
import {
  CreateQuizType,
  GetAllQuizType,
  GetQuizType,
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
  quizId,
  answers,
}: SubmitQuizType): Promise<SubmitQuizReturnType> => {
  try {
    // todo: test
    // return DelayFunc({
    //   isError: false,
    //   delay: 2000,
    //   func: () => mock_wrong_question_1,
    // });

    const token = await Cookies.get("token");
    if (!token) {
      throw new Error("使用者請重新登入！");
    }

    const response: AxiosResponse<SubmitQuizReturnType, any> = await axios.put(
      `${API_URL}/quiz/${quizId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        answers,
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("提交測驗錯誤！");
    }
  } catch (error: any) {
    throw new Error(error.message || "未知錯誤發生！");
  }
};

export const getQuiz = async (quizId: string): Promise<GetQuizType> => {
  try {
    // todo: test
    // return DelayFunc({
    //   isError: false,
    //   delay: 2000,
    //   func: () => mock_get_quiz_1,
    // });

    const token = await Cookies.get("token");
    if (!token) {
      throw new Error("使用者請重新登入！");
    }

    const response: AxiosResponse<GetQuizType, any> = await axios.get(
      `${API_URL}/quiz/${quizId}`,
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

export const getAllQuiz = async (token: string): Promise<GetAllQuizType> => {
  try {
    const response: AxiosResponse<GetAllQuizType, any> = await axios.get(
      `${API_URL}/quiz`,
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

export const getDetailsAllQuiz = async (): Promise<GetQuizType[]> => {
  try {
    // todo: test
    // return DelayFunc({
    //   isError: false,
    //   delay: 2000,
    //   func: () => Array.from({ length: 10 }, generateQuiz),
    // });

    const token = await Cookies.get("token");
    if (!token) {
      throw new Error("使用者請重新登入！");
    }

    const response: AxiosResponse<GetQuizType[], any> = await axios.get(
      `${API_URL}/quiz`,
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
