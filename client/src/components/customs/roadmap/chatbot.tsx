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

      {/* chat panel */}
      {isPanelOpen && (
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

          {/* messages */}
          <div className="p-4 text-sm max-h-[50vh] space-y-10 overflow-y-auto">
            {messages.map((message, index) => (
              <>
                {message.startsWith("bot:") ? (
                  <div
                    key={`bot-${index}`}
                    className={"mb-2 space-y-5 text-left"}
                  >
                    <ReactMarkdown
                      remarkPlugins={[[math]]}
                      rehypePlugins={[RehypeKatex]}
                      components={{
                        ul: ({ children }) => (
                          <ul className="list-disc pl-4">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal pl-4">{children}</ol>
                        ),
                        li: ({ children }) => (
                          <li className="pl-2 pt-2">{children}</li>
                        ),
                      }}
                    >
                      {message.replace("bot: ", "")}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <Card
                      key={`user-${index}`}
                      className={
                        "border w-fit border-blue-500 bg-blue-900/20 text-right"
                      }
                    >
                      <CardContent className="p-2">
                        <div className="whitespace-pre-wrap text-left">
                          <ReactMarkdown>
                            {message.replace("user: ", "")}
                          </ReactMarkdown>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </>
            ))}
            {/* waiting reply animation */}
            {isSubmitting && (
              <div className="mb-2 text-left">
                <div className="flex items-center space-x-2 animate-pulse">
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  <span className="text-gray-400 text-xs">
                    AI 助手正在輸入…
                  </span>
                </div>
              </div>
            )}
            {/* message scrool end-ref */}
            <div ref={messageScrollRef} />
          </div>

          {/* input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="輸入您的訊息..."
                className="flex-1 resize-none"
              />
              <Button
                onClick={sendMessage}
                size="icon"
                aria-label="Send Message"
                disabled={!userInput.trim()}
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
