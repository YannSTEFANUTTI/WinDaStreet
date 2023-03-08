const ratingModel = require("../models/ratingModel");

const ratingController = {
  getArtRating: (req, res, next) => {
    const { id } = req.params;

    ratingModel
      .findAverageNote(id)
      .then((note) => res.send(note))
      .catch((err) => next(err));
  },

  addArtRating: (req, res, next) => {
    const rating = req.body;
    ratingModel
      .addNote(rating)
      .then(() => res.status(201).send(rating))
      .catch((err) => next(err));
  },
};

module.exports = ratingController;
