import { DelayFunc } from "@/lib/utils";
import { UserType } from "@/stores/user-store";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

// GET /user: get user
export const getUser = async (token: string | null) => {
  try {
    const res: UserType = {
      name: "Neo Wang",
      email: "wang@gmail.com"
    };

    // todo: remove this line
    return DelayFunc({
      isError: false,
      delay: 1000,
      func: () => res,
    });

    if (!token) {
      throw new Error("使用者請重新登入！");
    }

    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("取得使用者資料錯誤！");
    }
  } catch (error: any) {
    throw new Error(error.message || "未知錯誤發生！");
  }
};

// DELETE /user: delete user
export const deleteUser = async (token: string | null) => {
  try {
    const response = await axios.delete(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return true;
    } else {
      throw new Error("刪除使用者資料錯誤！");
    }
  } catch (error: any) {
    throw new Error(error.message || "未知錯誤發生！");
  }
};
