const scoreModel = require("../models/scoreModel");

// Create a new score
const createScore = (req, res, next) => {
  const { id } = req.params;
  scoreModel
    .createScore(0, id)
    .then((score) => {
      res.status(201).json(score);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      next(err);
    });
};

// Get a score
const getScore = (req, res, next) => {
  const { id } = req.params;
  scoreModel
    .getOneScore(id)
    .then((score) => {
      if (!score) {
        return res.status(404).json({ error: "Score non trouvé !" });
      }
      return res.status(200).json(score);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      next(err);
    });
};

// Get all scores
const getAllScore = (req, res, next) => {
  scoreModel
    .getAllScore()
    .then((score) => {
      if (!score) {
        return res.status(404).json({ error: "Score non trouvé !" });
      }
      return res.status(200).json(score);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      next(err);
    });
};

// Update a score
const incrementScore = (req, res, next) => {
  const { id } = req.params;
  const { Score } = req.body;
  scoreModel
    .incrementScore(id, Score)
    .then((score) => {
      if (!score) {
        return res.status(404).json({ error: "Score non trouvé !" });
      }
      return res.status(200).json(score);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      next(err);
    });
};

// Delete a score
const deleteScore = (req, res, next) => {
  const { id } = req.params;
  scoreModel
    .deleteOne(id)
    .then((result) => res.send(result))
    .catch((err) => next(err));
};

module.exports = {
  incrementScore,
  createScore,
  getScore,
  getAllScore,
  deleteScore,
};
