const artisteModel = require("../models/artisteModel");

const artisteController = {
  getAllArtiste: (req, res, next) => {
    artisteModel
      .findAll()
      .then((art) => res.send(art))
      .catch((err) => next(err));
  },

  postNewArtiste: (req, res, next) => {
    const artiste = req.body;
    artisteModel
      .createOne(artiste)
      .then((result) => {
        res.status(201).send({ id: result.insertId, artiste });
      })
      .catch((err) => next(err));
  },

  deleteArtiste: (req, res, next) => {
    const { id } = req.params;
    artisteModel
      .deleteOne(id)
      .then((result) => {
        if (result.affectedRows !== 1) {
          return res.status(404).send(`Artiste ${id} not found`);
        }
        return res.status(200).send(`Artiste ${id} deleted`);
      })
      .catch((err) => next(err));
  },
};

module.exports = artisteController;
