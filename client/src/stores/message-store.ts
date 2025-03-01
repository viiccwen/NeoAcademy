import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface MessageStore {
  isSubmitting: boolean;
  messages: string[];
  setIsSubmitting: (isSubmitting: boolean) => void;
  setMessage: (message: string) => void;
  resetMessage(): void;
}

export const useMessageStore = create<MessageStore>()(
  persist(
    (set) => ({
      isSubmitting: false,
      messages: [],
      setIsSubmitting(isSubmitting) {
        set(() => ({
          isSubmitting,
        }));
      },
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
