import axios, { AxiosResponse } from "axios";
import { CreateRoadmapType, Roadmap, Roadmaps } from "@/lib/type";

const API_URL = import.meta.env.VITE_API_URL;

export const createRoadmap = async (
  token: string,
  formdata: CreateRoadmapType
): Promise<Roadmap> => {
  try {
    const response: AxiosResponse<Roadmap, any> = await axios.post(
      `${API_URL}/roadmap`,
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
      throw new Error("建立學習路徑錯誤！");
    }
  } catch (error: any) {
    throw new Error(error.message || "未知錯誤發生！");
  }
};

// single roadmap
export const getRoadmap = async (token: string, id: string) => {
  try {
    const response: AxiosResponse<Roadmap, any> = await axios.get(
      `${API_URL}/roadmap/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("取得學習路徑錯誤！");
    }
  } catch (error: any) {
    throw new Error(error.message || "未知錯誤發生！");
  }
};

// all roadmap
export const getRoadmaps = async (token: string) => {
  try {
    const response: AxiosResponse<Roadmaps[], any> = await axios.get(
      `${API_URL}/roadmap`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("取得學習路徑錯誤！");
    }
  } catch (error: any) {
    throw new Error(error.message || "未知錯誤發生！");
  }
};

export const deleteRoadmap = async (token: string, id: string) => {
  try {
    const response: AxiosResponse<any, any> = await axios.delete(
      `${API_URL}/roadmap/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 204) {
      return true;
    } else {
      throw new Error("刪除學習路徑錯誤！");
    }
  } catch (error: any) {
    throw new Error(error.message || "未知錯誤發生！");
  }
};
