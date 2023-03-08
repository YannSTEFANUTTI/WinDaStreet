const artModel = require("../models/artModel");

const artController = {
  getArts: (req, res, next) => {
    artModel
      .findAll()
      .then((arts) => res.send(arts))
      .catch((err) => next(err));
  },

  getOneArt: (req, res, next) => {
    const { id } = req.params;
    artModel
      .findOne(id)
      .then((art) => res.send(art))
      .catch((err) => next(err));
  },

  getNotVisited: (req, res, next) => {
    const { id } = req.params;
    artModel
      .findAllNotVisited(id)
      .then((art) => res.send(art))
      .catch((err) => next(err));
  },

  getArtBy: (req, res, next) => {
    const { id } = req.params;
    let { wichcolumn } = req.query;
    wichcolumn += "_id";
    artModel
      .findBy(id, wichcolumn)
      .then((arts) => res.send(arts))
      .catch((err) => next(err));
  },

  postNewArt: (req, res, next) => {
    const artRequest = req.body;
    artModel
      .createOne(artRequest)
      .then((result) =>
        res.status(201).send({ id: result.insertId, artRequest })
      )
      .catch((err) => next(err));
  },

  deleteArt: (req, res, next) => {
    const { id } = req.params;
    artModel
      .deleteOne(id)
      .then((result) => {
        if (result.affectedRows !== 1) {
          return res.status(404).send(`Art ${id} not found`);
        }
        return res.status(200).send(`Art ${id} deleted`);
      })
      .catch((err) => next(err));
  },

  updateArt: (req, res, next) => {
    const { id } = req.params;
    const artInfo = req.body;
    artModel
      .updateOne(id, artInfo)
      .then((result) => {
        if (result.affectedRows !== 1) {
          return res.status(404).send(`Art ${id} not found`);
        }
        return res.status(200).send({ message: `Art ${id} modified`, artInfo });
      })
      .catch((err) => next(err));
  },

  getArtsQuartier: (req, res, next) => {
    artModel
      .numberQuartier()
      .then(([art]) => res.send(art))
      .catch((err) => next(err));
  },
};

module.exports = artController;
