import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserType = {
  name: string;
  email: string;
};

interface UserStore {
  user: UserType | null;
  expiry: number;
  token: string | null;
  isAuth: boolean;
  analysis: string | null;

  setUser(user: UserType): void;
  setExpiry(expiry: number): void;
  setToken(token: string): void;
  setIsAuth(isAuth: boolean): void;
  setAnalysis(analysis: string): void;

  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      expiry: 0,
      token: null,
      isAuth: false,
      analysis: null,

      setUser(user) {
        set(() => ({
          user,
          isAuth: true,
        }));
      },
      setExpiry(expiry) {
        set(() => ({
            expiry
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
          expiry: 0,
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
