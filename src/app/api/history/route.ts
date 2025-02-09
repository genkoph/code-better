import { type Submission } from "@prisma/client";
import { getSubmissions } from "@/lib/db";

export async function GET() {
  try {
    const submissions = await getSubmissions();

    const formatSubmission = ({ code, ...submission }: Submission) => ({
      ...submission,
      code: code.slice(0, 100),
    });

    return Response.json(submissions.map(formatSubmission));
  } catch (error) {
    console.error("Failed to get submissions:", error);
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}
