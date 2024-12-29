import Cookies from "js-cookie";
import axios from "axios";
import { CreateQuizType } from "@/lib/type";

const API_URL = import.meta.env.VITE_API_URL;

export const createQuiz = async (formdata: CreateQuizType) => {
  try {
    const token = await Cookies.get("token");
    if (!token) {
      throw new Error("使用者請重新登入！");
    }

    const response = await axios.post(`${API_URL}/quiz`, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("建立測驗錯誤！");
    }
  } catch (error: any) {
    return error;
  }
};
