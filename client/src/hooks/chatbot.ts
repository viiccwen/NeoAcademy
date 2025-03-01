import { sendMessage } from "@/actions/message-actions";
import { ChatMessages } from "@/lib/type";
import { useChatbotStore } from "@/stores/chatbot";
import { useMessageStore } from "@/stores/message-store";
import { useUserStore } from "@/stores/user-store";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export const useChatbot = () => {
  const messageScrollRef = useRef<HTMLDivElement>(null);
  const mutation = useSendChatbotMessage();
  const { isSubmitting, messages, setMessage, resetMessage } =
    useMessageStore();
  const { isPanelOpen, userInput, setIsPanelOpen, setUserInput } =
    useChatbotStore();

  const setInputFromExternal = (text: string) => {
    setUserInput(text);
    setIsPanelOpen(true);
  };

  const sendMessage = async () => {
    if (userInput.trim()) {
      setMessage(`user: ${userInput}`);

      // add chatbot response
      mutation
        .mutateAsync({
          previousMessages: messages,
          currentMessage: userInput,
        })
        .then((response) => {
          // replace LaTeX syntax
          // \(...\) -> $...$
          // \[...\] -> $$...$$
          const replacedResponse = response
            .replace(/\\\(/g, "$")
            .replace(/\\\)/g, "$")
            .replace(/\\\[/g, "$$")
            .replace(/\\\]/g, "$$");

          setMessage(`bot: ${replacedResponse}`);
        })
        .catch((error) => {
          toast.error(error.message || "發生錯誤！");
        });

      setUserInput("");
    }
  };

  useEffect(() => {
    if (messageScrollRef.current) {
      messageScrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isSubmitting, isPanelOpen]);

  return {
    isSubmitting,
    isPanelOpen,
    messages,
    messageScrollRef,
    userInput,
    resetMessage,
    setMessage,
    setIsPanelOpen,
    setUserInput,
    setInputFromExternal,
    sendMessage,
  };
};

export const useSendChatbotMessage = () => {
  const { token } = useUserStore();
  const { setIsSubmitting } = useMessageStore();

  return useMutation({
    mutationKey: ["chatbot", "send"],
    mutationFn: ({ previousMessages, currentMessage }: ChatMessages) =>
      sendMessage(token!, previousMessages, currentMessage) as Promise<string>,
    onMutate: () => {
      setIsSubmitting(true);
    },
    onError: (error: any) => {
      toast.error(error.message || "發生錯誤！");
      setIsSubmitting(false);
    },
    onSuccess: (response: string) => {
      setIsSubmitting(false);
      return response;
    },
  });
};
