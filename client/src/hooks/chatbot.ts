import { sendMessage } from "@/actions/message-actions";
import { ChatMessages } from "@/lib/type";
import { useMessageStore } from "@/stores/message-store";
import { useUserStore } from "@/stores/user-store";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export const useChatbot = () => {
  const { messages, setMessage, resetMessage } = useMessageStore();
  const mutation = useSendChatbotMessage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessage(`You: ${input}`);

      // add chatbot response
      mutation
        .mutateAsync({
          previousMessages: messages,
          currentMessage: input,
        })
        .then((response) => {
          setMessage(`Bot: ${response}`);
        })
        .catch((error) => {
          console.error(error); // error handling
        });

      setInput("");
    }
  };

  return {
    isOpen,
    setIsOpen,
    messages,
    setMessage,
    resetMessage,
    input,
    setInput,
    sendMessage,
  };
};

export const useSendChatbotMessage = () => {
  const { token } = useUserStore();

  return useMutation({
    mutationKey: ["chatbot", "send"],
    mutationFn: ({ previousMessages, currentMessage }: ChatMessages) =>
      sendMessage(token!, previousMessages, currentMessage) as Promise<string>,
    onMutate: () => {
      toast.loading("傳送訊息中...");
    },
    onError: (error: any) => {
      toast.error(error.message || "發生錯誤！");
    },
    onSuccess: (response: string) => {
      toast.dismiss();
      return response;
    },
  });
};
