import { motion } from "motion/react";
import { ArrowUp, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import Editor from "@/components/editor";
import { Button } from "@/components/shadcn/button";
import { LANGUAGES, type Language } from "@/lib/consts";

interface Props {
  language: Language;
  onLanguageChange: (language: Language) => void;
  value: string;
  onValueChange: (input: string) => void;
  onSubmit: () => void;
}

function ChatInput({
  language,
  onLanguageChange,
  value: input,
  onValueChange,
  onSubmit,
}: Props) {
  return (
    <div className="w-full h-full grid place-items-center">
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-zinc-200 dark:border-zinc-800 rounded-xl w-full h-[70vh] flex flex-col"
      >
        <div className="h-full">
          <Editor
            value={input}
            onValueChange={onValueChange}
            language={language}
            width="100%"
            height="100%"
          />
        </div>
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-4 flex items-center gap-2 justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {LANGUAGES[language]}
                <ChevronDown className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={language}
                onValueChange={(value) => onLanguageChange(value as Language)}
              >
                {Object.entries(LANGUAGES).map(([key, value]) => (
                  <DropdownMenuRadioItem key={key} value={key}>
                    {value}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="sm" onClick={onSubmit}>
            <ArrowUp />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default ChatInput;
