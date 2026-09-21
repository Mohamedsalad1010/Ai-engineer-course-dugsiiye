 AI SDK Exercise: Database Chat, Movie Database & Dad Jokes Tools
Exercise Requirements
Part 1: Database Chat Tool 🗄️
Objective: Create a tool that converts natural language queries into database operations

Requirements:

Choose either MySQL or MongoDB as your database
Set up database connection and schema
Create tables/collections for: movies, users, reviews
Implement natural language to SQL/NoSQL query conversion
Handle basic queries like:
"Show me all sci-fi movies"
"Find users over 25"
"Get movies with rating above 8.5"
"Count total movies by genre"
Add query validation and error handling
Return structured results with metadata
Database Schema Requirements:

Movies: id, title, year, genre, rating, director, description
Users: id, name, email, age, favorite_genre
Reviews: id, movie_id, user_id, rating, comment, date
Part 2: Movie Database Tool 🎬
Objective: Integrate with external movie API to fetch detailed movie information

Requirements:

Use OMDb API (free tier: 1000 requests/day)
Get free API key from omdbapi.com
Implement movie search by title and year
Fetch movie details: plot, cast, ratings, poster, runtime
Handle API errors and rate limiting
Add movie recommendations based on genre/year
Cache results in your chosen database
Support partial title matching
API Integration:

Search endpoint: http://www.omdbapi.com/?t={title}&y={year}&apikey={key}
Handle "Movie not found" responses
Implement fallback for API failures
Part 3: Dad Jokes Tool 😄
Objective: Create entertainment tool with random joke generation

Requirements:

Use icanhazdadjoke.com API (free, no API key needed)
Implement random joke fetching
Add joke categories: dad jokes, programming jokes, general jokes
Store jokes in your database for offline access
Handle API failures with local joke fallback
Add joke rating system (thumbs up/down)
Implement joke search by keywords
API Endpoints:

Random joke: https://icanhazdadjoke.com/
Headers: Accept: application/json
Fallback to local joke database if API fails