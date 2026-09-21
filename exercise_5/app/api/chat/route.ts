import { openai } from "@ai-sdk/openai";

import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  stepCountIs,
} from "ai";

import { databaseTool } from "../../lib/database_tool";
import z from "zod";
import { movieTool } from "@/app/lib/movie_tool";
import { jokeTool } from "@/app/lib/joke_tool";

export async function POST(request: Request) {

  const { messages }: {
    messages: UIMessage[];
  } = await request.json();

  const result = streamText({

    model: openai("gpt-4o"),

    messages: await convertToModelMessages(messages),

    stopWhen: stepCountIs(5),

    system: `
      You are a helpful assistant.

      Use database tool for:
      movies, users, ratings, genres and ages.

      Search movies using OMDb API
      Get a random dad joke
      Never invent tool results.
    `,

    tools: {
      database: databaseTool,
      movieData: movieTool,
      joke: jokeTool,
    },
  });

  return result.toUIMessageStreamResponse();
}