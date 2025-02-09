import { Submission } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function createSubmission(
  submission: Omit<Submission, "createdAt">
) {
  await prisma.submission.create({ data: submission });
}

export async function getSubmission(id: string) {
  return await prisma.submission.findUnique({ where: { id } });
}

export async function getSubmissions() {
  return await prisma.submission.findMany();
}
