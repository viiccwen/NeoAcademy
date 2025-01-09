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
  analysis: string | null;

  setUser(user: UserType): void;
  setToken(token: string): void;
  setIsAuth(isAuth: boolean): void;
  setAnalysis(analysis: string): void;

  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuth: false,
      analysis: null,

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
      setAnalysis(analysis) {
        set(() => ({
          analysis,
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
