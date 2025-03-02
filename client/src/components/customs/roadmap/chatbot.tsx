import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Bot, RotateCcw, Send } from "lucide-react";
import { useChatbot } from "@/hooks/chatbot";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import math from "remark-math";
import RehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css";

export function ChatBot() {
  const {
    isSubmitting,
    isPanelOpen,
    setIsPanelOpen,
    messages,
    resetMessage,
    userInput,
    setUserInput,
    sendMessage,
    messageScrollRef,
  } = useChatbot();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* trigger button */}
      <Button
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        className={`rounded-full w-14 h-14 ${
          isPanelOpen
            ? "bg-blue-600 hover:bg-blue-500"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white shadow-lg transition-colors `}
        aria-label={isPanelOpen ? "Close Chat Bot" : "Open Chat Bot"}
      >
        <Bot />
      </Button>

      {isPanelOpen && (
        <div className="mt-2 w-full max-w-[20rem] sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto rounded-lg shadow-lg border border-slate-900 animate-slide-up bg-black">
          {/* Header */}
          <div className="p-3 sm:p-4 border-b flex justify-between items-center">
            <h3 className="text-base sm:text-lg font-semibold">AI 助手</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetMessage}
              className="p-1"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="p-3 sm:p-4 text-xs sm:text-sm max-h-[40vh] sm:max-h-[50vh] space-y-6 sm:space-y-10 overflow-y-auto overflow-x-hidden">
            {messages.map((message, index) => (
              <div key={index}>
                {message.startsWith("bot:") ? (
                  <div className="mb-2 space-y-4 sm:space-y-5 text-left">
                    <ReactMarkdown
                      remarkPlugins={[math]}
                      rehypePlugins={[RehypeKatex]}
                      components={{
                        ul: ({ children }) => (
                          <ul className="list-disc pl-4">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal pl-4">{children}</ol>
                        ),
                        li: ({ children }) => (
                          <li className="pl-2 pt-1 sm:pt-2">{children}</li>
                        ),
                        code: ({ children }) => (
                          <code className="bg-gray-800 text-xs sm:text-sm p-1 rounded-md break-words text-wrap">
                            {children}
                          </code>
                        ),
                      }}
                    >
                      {message.replace("bot: ", "")}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <Card className="border w-fit max-w-[90%] sm:max-w-[80%] border-blue-500 bg-blue-900/20 text-right">
                      <CardContent className="p-2 sm:p-3">
                        <div className="whitespace-pre-wrap text-left">
                          <ReactMarkdown>
                            {message.replace("user: ", "")}
                          </ReactMarkdown>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            ))}
            {/* Waiting reply animation */}
            {isSubmitting && (
              <div className="mb-2 text-left">
                <div className="flex items-center space-x-2 animate-pulse">
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  <span className="text-gray-400 text-xs sm:text-sm">
                    AI 助手正在輸入…
                  </span>
                </div>
              </div>
            )}
            {/* Message scroll end-ref */}
            <div ref={messageScrollRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 border-t">
            <div className="flex items-center gap-2">
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="輸入您的訊息..."
                className="flex-1 resize-none text-xs sm:text-sm min-h-[40px] sm:min-h-[48px]"
              />
              <Button
                onClick={sendMessage}
                size="icon"
                aria-label="Send Message"
                disabled={!userInput.trim()}
                className="h-8 w-8 sm:h-10 sm:w-10"
              >
                <Send className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
