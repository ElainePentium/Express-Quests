const database = require("./database");
const argon2 = require("argon2");


const getUsers = (req, res) => {
  database
    .query("select id, firstname, lastname, email, city, language from users")
    // DESTRUCUTRATION
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query(`
      SELECT firstname, lastname, email, city, language FROM users 
      WHERE id = ?`, [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language, hashedPassword } = req.body;

  database
    .query(`
    INSERT INTO
      users (firstname, lastname, email, city, language, hashedPassword)
      VALUES
      (?, ?, ?, ?, ?, ?)
      `, [firstname, lastname, email, city, language, hashedPassword])
    .then( res.send("User created"))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error creating data from database");
    });

};

const updateUser = (req, res) => {
  const { hashedPassword } = req.body;
  const id = parseInt(req.params.id); 

  database
    .query(`
      UPDATE users
      SET hashedPassword = ?
      WHERE id = ?
      `, [hashedPassword, id])
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error creating data from database");
    });
};

const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { email } = req.body;

  database
    .query(`
      SELECT * FROM users WHERE email = ?`, [email])
    .then(([users]) => {
      if (users[0] != null) {
        // res.json(users[0]).send("Found email");
        req.user = users[0]
        next();
      } else {
        res.status(401).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};


module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  getUserByEmailWithPasswordAndPassToNext
};
