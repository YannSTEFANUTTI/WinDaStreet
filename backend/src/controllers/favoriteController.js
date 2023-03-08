const favoriteModel = require("../models/favoriteModel");

const favoriteController = {
  getAllFavorites: (req, res, next) => {
    const { id } = req.params;
    favoriteModel
      .findAll(id)
      .then((favorite) => res.send(favorite))
      .catch((err) => next(err));
  },

  addNewFavorite: (req, res, next) => {
    favoriteModel
      .postNewFavorite(req.body)
      .then((result) => res.status(201).send({ id: result.insertId }))
      .catch((err) => next(err));
  },

  deleteFavorite: (req, res, next) => {
    favoriteModel
      .deleteFavorite(req.body)
      .then((result) => {
        if (result.affectedRows !== 1) {
          return res.status(404).send(`Favorite not found`);
        }
        return res.status(200).send(`Favorite deleted`);
      })
      .catch((err) => next(err));
  },
};

module.exports = favoriteController;
