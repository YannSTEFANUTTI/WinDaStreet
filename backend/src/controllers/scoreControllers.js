/* eslint-disable consistent-return */
const scoreModel = require("../models/scoreModel");

// Create a new score
const createScore = async (req, res, next) => {
  try {
    const { id } = req.params;
    const score = await scoreModel.createScore(0, id);
    res.status(201).json(score);
  } catch (err) {
    res.status(500).json({ error: err.message });
    next(err);
  }
};

// Get a score
const getScore = async (req, res, next) => {
  try {
    const { id } = req.params;
    const score = await scoreModel.getOneScore(id);
    if (!score) {
      return res.status(404).json({ error: "Score non trouvé !" });
    }
    return res.status(200).json(score);
  } catch (err) {
    res.status(500).json({ error: err.message });
    next(err);
  }
};

// Get all scores
const getAllScore = async (req, res, next) => {
  try {
    const score = await scoreModel.getAllScore();
    if (!score) {
      return res.status(404).json({ error: "Score non trouvé !" });
    }
    return res.status(200).json(score);
  } catch (err) {
    res.status(500).json({ error: err.message });
    next(err);
  }
};

// Update a score
const incrementScore = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { Score } = req.body;
    const score = await scoreModel.incrementScore(id, Score);
    if (!score) {
      return res.status(404).json({ error: "Score non trouvé !" });
    }
    return res.status(200).json(score);
  } catch (err) {
    res.status(500).json({ error: err.message });
    next(err);
  }
};

// Delete a score
const deleteScore = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await scoreModel.deleteOne(id);
    res.send(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  incrementScore,
  createScore,
  getScore,
  getAllScore,
  deleteScore,
};
