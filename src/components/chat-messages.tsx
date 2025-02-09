import { type Message } from "@ai-sdk/react";

import { type Language } from "@/lib/consts";
import ChatMessage from "@/components/chat-message";
import ChatMessageThinking from "@/components/chat-message-thinking";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";

interface Props {
  messages: Message[];
  isLoading: boolean;
  language: Language;
}

function ChatMessages({ messages, isLoading, language }: Props) {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>(isLoading);

  return (
    <div
      ref={messagesContainerRef}
      className="w-full h-full flex flex-col gap-10"
    >
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          role={message.role}
          content={message.content}
          language={language}
        />
      ))}

      {isLoading && messages[messages.length - 1].role === "user" && (
        <ChatMessageThinking />
      )}

      <div ref={messagesEndRef} className="shrink-0 min-w-[10px] min-h-[1px]" />
    </div>
  );
}

export default ChatMessages;
