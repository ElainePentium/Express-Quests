require("dotenv").config();
const express = require("express");

const port = process.env.APP_PORT ?? 5000;

// init the express app
const app = express();
app.use(express.json());


const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};


// define the index route
app.get("/", welcome);


const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");
const { hashPassword, verifyPassword, verifyToken  } = require("./auth");


app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.post("/api/movies", verifyToken, movieHandlers.postMovie);

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

app.post("/api/users", hashPassword, userHandlers.postUser);
app.put("/api/users/:id", hashPassword, userHandlers.updateUser);

app.post("/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

app.get("/api/dashboard", verifyToken, (req, res) => {
  res.status(200).send("Hello from Dashboard")
})


// app.post("/api/login", isItDwight);
// const isItDwight = (req, res) => {
//   if (req.body.email === "dwight@theoffice.com" && req.body.password === "123456") {
//     res.send("Credentials are valid");
//   } else {
//     res.sendStatus(401);
//   }
// };


// listen to incoming requests
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
