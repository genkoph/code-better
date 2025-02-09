import { z } from "zod";
import { CODE_SNIPPET_MAX_LENGTH, CODE_SNIPPET_MIN_LENGTH } from "@/lib/consts";

export const snippetSchema = z
  .string()
  .min(CODE_SNIPPET_MIN_LENGTH)
  .max(CODE_SNIPPET_MAX_LENGTH);

export const submissionSchema = z.object({
  id: z.string(),
  language: z.string(),
  messages: z.array(
    z.object({
      id: z.string().optional(),
      content: snippetSchema,
      role: z.enum(["system", "user", "assistant", "data"]),
    })
  ),
});
