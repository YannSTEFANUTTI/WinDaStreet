/* eslint-disable camelcase */
const visitedModels = require("../models/visitedModels");

const createVisit = (req, res, next) => {
  visitedModels
    .createVisit(req.body)
    .then((visit) => {
      res.status(201).json(visit);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      next(err);
    });
};

const getAllVisits = (req, res, next) => {
  const { id } = req.params;
  visitedModels
    .getAllVisits(id)
    .then((visits) => {
      if (!visits) {
        return res.status(404).json({ error: "Visits non trouvé !" });
      }
      return res.status(200).json(visits);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      next(err);
    });
};

const getOneVisit = (req, res, next) => {
  const { id } = req.params;
  const { art_id } = req.body;
  visitedModels
    .getOneVisit(id, art_id)
    .then((visit) => {
      if (!visit) {
        return res.status(404).json({ error: "Visit non trouvé !" });
      }
      return res.status(200).json(visit);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      next(err);
    });
};

module.exports = {
  createVisit,
  getAllVisits,
  getOneVisit,
};
