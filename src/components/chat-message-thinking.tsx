import { Bot } from "lucide-react";
import { motion } from "motion/react";

function ChatMessageThinking() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="flex items-center gap-4"
    >
      <div className="size-10 border border-zinc-200 dark:border-zinc-800 rounded-full grid place-items-center">
        <Bot className="size-4" />
      </div>
      <span className="text-zinc-400">Thinking...</span>
    </motion.div>
  );
}

export default ChatMessageThinking;
