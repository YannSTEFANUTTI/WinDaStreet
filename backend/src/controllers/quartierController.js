const quartierModel = require("../models/quartierModel");

const quartierController = {
  getAllQuartier: (req, res, next) => {
    quartierModel
      .findAll()
      .then((quartier) => res.status(200).send(quartier))
      .catch((err) => next(err));
  },

  getOneQuartier: (req, res, next) => {
    const { id } = req.params;
    quartierModel
      .findOne(id)
      .then((quartier) => res.send(quartier))
      .catch((err) => next(err));
  },
};

module.exports = quartierController;
