import Groq from "groq-sdk";
import dotenv from "dotenv";
import { buildPrompt } from "./prompt.js";

dotenv.config({ quiet: true });

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function summarizeText(text) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing. Check your .env file.");
  }

  const prompt = buildPrompt(text);

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    messages: [
      {
        role: "system",                                 // sets the model's behaviour globally
        content: "You are a JSON-only text analyst. You never respond with prose, markdown, or explanations. You always return a single valid JSON object and nothing else.",
      },
      {
        role: "user",                                   // the actual task with the text
        content: prompt,
      },
    ],
  });

  const raw = response.choices[0]?.message?.content?.trim();

  if (!raw) {
    throw new Error("Empty response received from Groq API.");
  }

  // Safety net — strip markdown wrappers if model misbehaves
  const cleaned = raw
    .replace(/^```json/, "")
    .replace(/^```/, "")
    .replace(/```$/, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error(`LLM returned invalid JSON:\n${raw}`);
  }
}