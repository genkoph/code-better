import { type Message } from "ai";
import { motion } from "motion/react";
import { Bot, User } from "lucide-react";
import Markdown from "react-markdown";

import Editor from "@/components/editor";
import { type Language } from "@/lib/consts";

interface Props {
  role: Message["role"];
  content: Message["content"];
  language?: Language;
}

function ChatMessage({ role, content, language }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-4"
    >
      {role === "user" && (
        <>
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl w-full md:w-[70%] overflow-hidden ml-auto h-[300px]">
            <Editor
              options={{ readOnly: true }}
              value={content}
              language={language}
              width="100%"
              height="100%"
            />
          </div>
          <div className="size-10 border border-zinc-200 dark:border-zinc-800 rounded-full grid place-items-center">
            <User className="size-4" />
          </div>
        </>
      )}

      {role === "assistant" && (
        <>
          <div className="size-10 border border-zinc-200 dark:border-zinc-800 rounded-full grid place-items-center">
            <Bot className="size-4" />
          </div>
          <div className="w-full md:w-[70%] text-zinc-600 dark:text-zinc-200 rounded-xl">
            <Markdown className="prose prose-zinc dark:prose-invert space-y-4 [&_pre]:border [&_pre]:border-zinc-200 dark:[&_pre]:border-zinc-800 [&_pre]:rounded-md [&_pre]:p-4 [&_pre]:bg-zinc-100 dark:[&_pre]:bg-zinc-800 [&_pre]:text-zinc-900 dark:[&_pre]:text-zinc-200">
              {content}
            </Markdown>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default ChatMessage;
