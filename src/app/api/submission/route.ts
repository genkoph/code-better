import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createDataStreamResponse, smoothStream, streamText } from "ai";

import { createSubmission } from "@/lib/db";
import { OPENROUTER_MODEL } from "@/lib/consts";
import { submissionSchema } from "@/lib/schemas";

// NOTE: roast my prompt (I'm new at this)
function system(language: string) {
  return `
    If the code is not written in ${language}, inform the user that he has provided invalid ${language} code.

    You are a software developer responsible for conducting code reviews in the Engineering department of a technology/software company.
    After reviewing a code submission, return a concise report summarizing the findings.

    When formatting the response, bold each section title and give each section space to breathe. Avoid code blocks and tables at any cost.

    Strictly format the response as:
    1. briefly summarize code logic (1 sentence)
    2. count the strengths of the code (unordered list)
    3. give recommendations (unordered list)
    4. overall assessment (small text)
  `;
}

export async function POST(request: Request) {
  const body = await request.json();

  const { error, data } = await submissionSchema.safeParseAsync(body);

  if (error) {
    console.error("Invalid request body:", error);
    return Response.json({ error: error.message }, { status: 400 });
  }

  const openrouter = createOpenRouter({
    apiKey: process.env.OPEN_ROUTER_API_KEY,
  });

  return createDataStreamResponse({
    execute: (dataStream) => {
      const result = streamText({
        model: openrouter(OPENROUTER_MODEL),
        system: system(data.language),
        messages: data.messages,
        maxTokens: 450,
        experimental_transform: smoothStream({
          chunking: "word",
        }),
        onFinish: async ({ text }) => {
          try {
            await createSubmission({
              id: data.id,
              code: data.messages[0].content,
              language: data.language,
              feedback: text,
            });
          } catch (error) {
            console.error("Failed to save submission:", error);
          }
        },
      });

      result.mergeIntoDataStream(dataStream);
    },
    onError: (error) => {
      return "Something went wrong: " + error;
    },
  });
}
