import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, RotateCcw, Send } from "lucide-react";
import { useChatbot } from "@/hooks/chatbot";

export function ChatBot() {
  const {
    isOpen,
    setIsOpen,
    messages,
    resetMessage,
    input,
    setInput,
    sendMessage,
  } = useChatbot();

  return (
    <div className="fixed bottom-4 right-4 z-50">
        {/* trigger button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full w-10 h-10 ${
          isOpen
            ? "bg-blue-600 hover:bg-blue-500"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white shadow-lg transition-colors `}
        aria-label={isOpen ? "Close Chat Bot" : "Open Chat Bot"}
      >
        <Bot />
      </Button>

      {/* chat panel */}
      {isOpen && (
        <div className="mt-2 w-80 rounded-lg shadow-lg border border-slate-900 animate-slide-up bg-black">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-semibold">AI 助手</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetMessage}
              className=""
            >
                <RotateCcw />
            </Button>
          </div>
          <div className="p-4 max-h-[40vh] overflow-y-auto">
            {messages.map((message, index) => (
              <p
                key={index}
                className={`mb-2 ${
                  message.startsWith("You:") ? "text-right" : "text-left"
                }`}
              >
                {message}
              </p>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="輸入您的訊息..."
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                size="icon"
                aria-label="Send Message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
