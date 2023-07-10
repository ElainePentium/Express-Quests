const database = require("./database");

const getMovies = (req, res) => {
  database
    .query("select * from movies")
    // DESTRUCUTRATION
    .then(([movies]) => {
      res.json(movies);
    })
    // SANS DESTRUCUTRATION
    // .then((result) => {
    //   const movies = result[0];
    //   console.log(movies);
    // })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from movies where id = ?", [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(`
      INSERT INTO
        movies (title, director, year, color, duration)
        VALUES
          (?, ?, ?, ?, ?)
      `, [title, director, year, color, duration])
    .then( res.send("Movie added"))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getMovies,
  getMovieById,
  postMovie
};
