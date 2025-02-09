"use client";

import { type Message } from "ai";
import { toast } from "sonner";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { useSWRConfig } from "swr";

import {
  type Language,
  ENDPOINTS,
  DEFAULT_LANGUAGE,
  EDITOR_PLACEHOLDER,
  CODE_SNIPPET_MIN_LENGTH,
  CODE_SNIPPET_MAX_LENGTH,
} from "@/lib/consts";
import ChatInput from "@/components/chat-input";
import ChatMessages from "@/components/chat-messages";
import { snippetSchema } from "@/lib/schemas";

interface Props {
  id: string;
  initialMessages?: Message[];
  initialLanguage?: Language;
}

function Chat({ id, initialMessages, initialLanguage }: Props) {
  const { mutate } = useSWRConfig();
  const [language, setLanguage] = useState(initialLanguage ?? DEFAULT_LANGUAGE);

  const { messages, handleSubmit, input, setInput, isLoading } = useChat({
    id,
    initialMessages,
    api: ENDPOINTS.submission,
    body: { id, language },
    initialInput: EDITOR_PLACEHOLDER,
    onError: () => toast.error("Something went wrong."),
    onFinish: () => mutate(ENDPOINTS.history),
  });

  const submit = () => {
    const { success } = snippetSchema.safeParse(input);

    if (!success) {
      toast.error(
        `Code snippet must be between ${CODE_SNIPPET_MIN_LENGTH} and ${CODE_SNIPPET_MAX_LENGTH} characters.`
      );
      return;
    }

    window.history.replaceState({}, "", `/review/${id}`);
    handleSubmit(undefined);
  };

  return (
    <div className="max-w-screen-md w-full h-full mx-auto">
      {messages.length === 0 && (
        <ChatInput
          value={input}
          onSubmit={submit}
          language={language}
          onValueChange={setInput}
          onLanguageChange={setLanguage}
        />
      )}

      {messages.length > 0 && (
        <ChatMessages
          messages={messages}
          language={language}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default Chat;
