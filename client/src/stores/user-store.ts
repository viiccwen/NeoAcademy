import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserType = {
  name: string;
  email: string;
};

interface UserStore {
  user: UserType | null;
  token: string | null;
  isAuth: boolean;

  setUser(user: UserType): void;
  setToken(token: string): void;
  setIsAuth(isAuth: boolean): void;

  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuth: false,

      setUser(user) {
        set(() => ({
          user,
          isAuth: true,
        }));
      },
      setToken(token) {
        set(() => ({
          token,
        }));
      },
      setIsAuth(isAuth) {
        set(() => ({
          isAuth,
        }));
      },

      logout: () => {
        set(() => ({
          user: null,
          token: null,
          isAuth: false,
        }));
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
