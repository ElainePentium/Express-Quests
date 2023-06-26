const database = require("./database");

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
    .query("select firstname, lastname, email, city, language from users where id = ?", [id])
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
  const { firstname, lastname, email, city, language, hashedPassword }= req.body
  console.log(`postUser ${firstname}`);
  // console.log(req.body)


  database
    .query(`insert into
        users (firstname, lastname, email, city, language, hashedPassword)
        values (?, ?, ?, ?, ?, ?);`, 
        [firstname, lastname, email, city, language, hashedPassword])
}


const updateUser = (req, res) => {
  const hashedPassword = req.body.hashedPassword
  const id = parseInt(req.params.id)
  console.log(`updateUser ${id}`)

  database
    .query(
      "update users set hashedPassword = ? where id = ?", 
      [hashedPassword, id]
    )
    .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        }
        else {
          res.sendStatus(204);
        }
      }
    )
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing user");
    });
}

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser
};
