import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface MessageStore {
  messages: string[];
  setMessage: (message: string) => void;
  resetMessage(): void;
}

export const useMessageStore = create<MessageStore>()(
  persist(
    (set) => ({
      messages: [],
      setMessage(message) {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      },
      resetMessage() {
        set(() => ({
          messages: [],
        }));
      },
    }),
    {
      name: "message-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
