require("dotenv").config();
const express = require("express");

const app = express();

const port = process.env.APP_PORT ?? 5000;


const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};
app.get("/", welcome);


const movieHandlers = require("./movieHandlers");
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);


const { hashPassword } = require("./auth.js");
app.post("/api/users", hashPassword, userHandlers.postUser);
app.put("/api/users/:id", hashPassword, userHandlers.updateUser);




app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
