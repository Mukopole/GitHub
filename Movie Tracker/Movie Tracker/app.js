"use strict";

const express = require("express");
const app = express();
const multer = require("multer");

const MOVIEDATA = {
  "frozen": {
    "release-year": 2013,
    "featured-song": "Let it go",
    "rotten-tomatoes": 90
  },
  "mulan": {
    "release-year": 1998,
    "featured-song": "I'll make a man out of you",
    "rotten-tomatoes": 86
  },
  "little-mermaid": {
    "release-year": 1989,
    "featured-song": "Under the sea",
    "rotten-tomatoes": 93
  },
  "tarzan": {
    "release-year": 1999,
    "featured-song": "You'll be in my heart",
    "rotten-tomatoes": 89
  }
};

// for application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware
// for multipart/form-data (required with FormData)
app.use(multer().none()); // requires the "multer" module

// Serve the HTML form
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Movie Tracker</title>
    </head>
    <body>
      <h1>Movie Tracker</h1>
      <form action="/add" method="post">
        <label for="movie">Movie:</label>
        <input type="text" id="movie" name="movie" required><br><br>
        <label for="year">Release Year:</label>
        <input type="number" id="year" name="year" required><br><br>
        <label for="song">Featured Song:</label>
        <input type="text" id="song" name="song" required><br><br>
        <label for="rating">Rotten Tomatoes Rating:</label>
        <input type="number" id="rating" name="rating" required><br><br>
        <button type="submit">Submit</button>
      </form>
    </body>
    </html>
  `);
});

// Define 'add' endpoint
app.post("/add", (req, res) => {
  const { movie, year, song, rating } = req.body;

  // Check if all required parameters are provided
  if (!movie || !year || !song || !rating) {
    res.status(400).send("Missing required parameters");
    return;
  }

  // Check if the movie already exists in MOVIEDATA
  if (MOVIEDATA[movie.toLowerCase()]) {
    // Update existing movie information
    MOVIEDATA[movie.toLowerCase()] = {
      "release-year": parseInt(year),
      "featured-song": song,
      "rotten-tomatoes": parseInt(rating)
    };
    res.send(`Updated information for ${movie}`);
  } else {
    // Add new movie information
    MOVIEDATA[movie.toLowerCase()] = {
      "release-year": parseInt(year),
      "featured-song": song,
      "rotten-tomatoes": parseInt(rating)
    };
    res.send(`Added information for ${movie}`);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
