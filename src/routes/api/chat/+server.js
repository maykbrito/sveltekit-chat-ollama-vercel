import { createOllama } from "ollama-ai-provider";
import { streamText } from "ai";

const ollama = createOllama();

export async function POST({ request }) {
  const { messages } = await request.json();

  const result = await streamText({
    model: ollama("gemma2"),
    messages,
  });

  return result.toAIStreamResponse();
}