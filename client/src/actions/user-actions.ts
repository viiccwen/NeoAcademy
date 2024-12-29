import axios from "axios";
const Cookies = require("js-cookie");
const API_URL = process.env.API_URL;

// GET /user: get user
export const getUser = async () => {
  try {
    const token = await Cookies.get("token");
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
    return error;
  }
};

// DELETE /user: delete user
export const deleteUser = async () => {
  try {
    const token = await Cookies.get("token");
    if (!token) {
      throw new Error("使用者請重新登入！");
    }

    const response = await axios.delete(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
        // remove token
        Cookies.remove("token");
    } else {
      throw new Error("刪除使用者資料錯誤！");
    }
  } catch (error: any) {
    return error;
  }
};
