import { tool } from "ai";
import { z } from "zod";

export const movieTool = tool({
  description: "Search movies using OMDb API",

  inputSchema: z.object({
    title: z.string(),
    year: z.number().optional(),
  }),

  execute: async ({ title, year }) => {
    const params = new URLSearchParams({
      apikey: process.env.OMDB_API_KEY!,
      s: title,
    });

    if (year !== undefined) {
      params.set("y", String(year));
    }

    const response = await fetch(
      `https://www.omdbapi.com/?${params.toString()}`
    );

    const data = await response.json();

    return {
      success: true,
      movies: data.Search || [],
    };
  },
});