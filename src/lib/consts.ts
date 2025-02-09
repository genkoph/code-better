export const LANGUAGES = {
  python: "Python",
  javascript: "JavaScript",
  typescript: "TypeScript",
};

export type Language = keyof typeof LANGUAGES;

export const DEFAULT_LANGUAGE: keyof typeof LANGUAGES = "typescript";

export const EDITOR_PLACEHOLDER = `/**
 * Welcome to Code Better! Your AI code review assistant.
 * 
 * 
 * 
 * You can submit any code you want me to review, and I'll analyze it for you.
 * 
 * My goal is to help you understand the code and provide suggestions for improvement.
 * 
 * 
 * 
 * Happy coding!
 */
`;

export const ENDPOINTS = {
  history: "/api/history",
  submission: "/api/submission",
};

export const OPENROUTER_MODEL = "google/gemini-2.0-flash-001";

export const CODE_SNIPPET_MIN_LENGTH = 15;
export const CODE_SNIPPET_MAX_LENGTH = 500;
