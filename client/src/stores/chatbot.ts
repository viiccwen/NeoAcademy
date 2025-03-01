import { create } from "zustand";

interface ChatbotStore {
  isPanelOpen: boolean;
  userInput: string;
  setUserInput: (userInput: string) => void;
  setIsPanelOpen: (isPanelOpen: boolean) => void;
}

export const useChatbotStore = create<ChatbotStore>()((set) => ({
  isPanelOpen: false,
  userInput: "",

  setIsPanelOpen(isPanelOpen) {
    set(() => ({
      isPanelOpen,
    }));
  },
  setUserInput(userInput) {
    set(() => ({
      userInput,
    }));
  },
}));
