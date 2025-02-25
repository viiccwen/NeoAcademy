import axios, { AxiosResponse } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const sendMessage = async (
  token: string,
  previousMessages: string[],
  currentMessage: string
) => {
  try {
    const response: AxiosResponse<any, any> = await axios.post(
      `${API_URL}/chatbot`,
      { previousMessages, currentMessage },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("傳送訊息錯誤！");
    }
  } catch (error: any) {
    throw new Error(error.message || "未知錯誤發生！");
  }
};
