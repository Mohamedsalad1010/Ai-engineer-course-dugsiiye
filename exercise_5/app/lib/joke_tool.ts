import { tool } from "ai";
import { z } from "zod";

type JokeResponse = {
  id: string;
  joke: string;
  status: number;
};
export const jokeTool = tool({
  description: "Get a random dad joke",

  inputSchema: z.object({}),

  execute: async () => {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
        "User-Agent": "My AI Chat App",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch joke");
    }

    const data: JokeResponse = await response.json();

    return {
      joke: data.joke,
      id: data.id,
    };
  },
});
