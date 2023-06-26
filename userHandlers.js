const database = require("./database");

const getUsers = (req, res) => {
  database
    .query("select * from users")
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
    .query("select * from users where id = ?", [id])
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

module.exports = {
  getUsers,
  getUserById,
};


// Créer une route GET /api/users, cette route doit renvoyer un statut 200 et une liste d'utilisateurs de la base de données au format json
// Créez une route GET /api/users/:id qui renverra uniquement l'utilisateur de la base de données correspondant à l'identifiant défini dans l'url
// S'il y a un utilisateur qui correspond aux paramètres, renvoie une réponse avec un statut 200 et l'utilisateur correspondant en tant qu'objet json
// Sinon, retourne un statut 404 avec un message "Not Found"
// Publie une URL d'un dépôt GitHub avec ton application complète comme solution.

// 🧐 Critères de validation
//  Le serveur fonctionne
//  L'url /api/users affiche la liste des utilisateurs au format json
//  L'url /api/users/2 affiche un utilisateur au format json
//  L'url /api/users/0 affiche "Not found"