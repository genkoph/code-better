import { notFound } from "next/navigation";

import Chat from "@/components/chat";
import { getSubmission } from "@/lib/db";

interface Props {
  params: Promise<{ id: string }>;
}

async function Page({ params }: Props) {
  const { id } = await params;

  const submission = await getSubmission(id);

  if (!submission) {
    notFound();
  }

  return (
    <Chat
      id={submission.id}
      initialLanguage={
        submission.language as "python" | "javascript" | "typescript"
      }
      initialMessages={[
        { id: "user", content: submission.code, role: "user" },
        { id: "assistant", content: submission.feedback, role: "assistant" },
      ]}
    />
  );
}

export default Page;
