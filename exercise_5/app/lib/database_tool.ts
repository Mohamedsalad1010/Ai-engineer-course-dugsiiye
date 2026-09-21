import { tool } from "ai";
import { z } from "zod";

import { connectDB } from "./mongodb";

import Movie from "../models/movie";
import User from "../models/user";

export const databaseTool = tool({
  description: `
    Search the application database.

    Use this tool for:
    - movies
    - users
    - movie ratings
    - movie genres
    - user ages
    - movie counts
  `,

  inputSchema: z.object({
    collection: z.enum(["movies", "users"]),

    operation: z.enum(["find", "countByGenre"]),

    genre: z.string().optional(),

    minRating: z.number().optional(),

    minAge: z.number().optional(),
  }),

  execute: async ({ collection, operation, genre, minRating, minAge }) => {
    try {
      await connectDB();

      // MOVIES
      if (collection === "movies") {
        if (operation === "find") {
          const filter: any = {};

          if (genre) {
            filter.genre = genre.toLowerCase();
          }

          if (minRating) {
            filter.rating = {
              $gt: minRating,
            };
          }

          const movies = await Movie.find(filter);

          return {
            success: true,
            results: movies,
            metadata: {
              collection: "movies",
              count: movies.length,
            },
          };
        }

        if (operation === "countByGenre") {
          const movies = await Movie.aggregate([
            {
              $group: {
                _id: "$genre",
                count: {
                  $sum: 1,
                },
              },
            },
          ]);

          return {
            success: true,
            results: movies,
            metadata: {
              collection: "movies",
              count: movies.length,
            },
          };
        }
      }

      // USERS
      if (collection === "users") {
        if (operation === "find") {
          const filter: any = {};

          if (minAge) {
            filter.age = {
              $gt: minAge,
            };
          }

          const users = await User.find(filter);

          return {
            success: true,
            results: users,
            metadata: {
              collection: "users",
              count: users.length,
            },
          };
        }
      }

      return {
        success: false,
        error: "Operation not supported",
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        error: "Database error",
      };
    }
  },
});
