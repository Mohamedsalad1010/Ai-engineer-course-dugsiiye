import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";

import Movie from "../../models/movie";
import User from "../../models/user";
import Review from "../../models/Review";
// import Joke from "@/models/Joke";

export async function GET() {
  try {
    await connectDB();

    await Review.deleteMany({});
    await Movie.deleteMany({});
    await User.deleteMany({});
    // await Joke.deleteMany({});

    const movies = await Movie.insertMany([
      {
        title: "Interstellar",
        year: 2014,
        genre: "sci-fi",
        rating: 8.7,
        director: "Christopher Nolan",
        description: "A team travels through a wormhole in space.",
      },

      {
        title: "Inception",
        year: 2010,
        genre: "sci-fi",
        rating: 8.8,
        director: "Christopher Nolan",
        description: "A thief enters people's dreams.",
      },

      {
        title: "The Matrix",
        year: 1999,
        genre: "sci-fi",
        rating: 8.7,
        director: "The Wachowskis",
        description: "A hacker discovers the reality he knows is a simulation.",
      },

      {
        title: "The Godfather",
        year: 1972,
        genre: "crime",
        rating: 9.2,
        director: "Francis Ford Coppola",
        description: "The story of a powerful crime family.",
      },

      {
        title: "The Dark Knight",
        year: 2008,
        genre: "action",
        rating: 9.0,
        director: "Christopher Nolan",
        description: "Batman faces the Joker.",
      },
    ]);

    const users = await User.insertMany([
      {
        name: "Ahmed",
        email: "ahmed@example.com",
        age: 30,
        favorite_genre: "sci-fi",
      },

      {
        name: "Mohamed",
        email: "mohamed@example.com",
        age: 22,
        favorite_genre: "action",
      },

      {
        name: "Fatima",
        email: "fatima@example.com",
        age: 27,
        favorite_genre: "crime",
      },
    ]);

    await Review.insertMany([
      {
        movie_id: movies[0]._id,
        user_id: users[0]._id,
        rating: 9,
        comment: "Amazing movie!",
      },

      {
        movie_id: movies[1]._id,
        user_id: users[1]._id,
        rating: 9,
        comment: "Very creative.",
      },
    ]);

    // await Joke.insertMany([
    //   {
    //     externalId: "local-1",
    //     joke: "Why don't scientists trust atoms? Because they make up everything!",
    //     category: "general",
    //   },

    //   {
    //     externalId: "local-2",
    //     joke: "Why do programmers prefer dark mode? Because light attracts bugs.",
    //     category: "programming",
    //   },

    //   {
    //     externalId: "local-3",
    //     joke: "What do you call fake spaghetti? An impasta!",
    //     category: "dad",
    //   },
    // ]);

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      movies: movies.length,
      users: users.length,
    });
  } catch (error) {
    console.error("Seed error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to seed database",
      },
      {
        status: 500,
      }
    );
  }
}