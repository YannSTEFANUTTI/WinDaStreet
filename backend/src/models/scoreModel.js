/* eslint-disable camelcase */
const db = require("../../config");

// Create a new score
const createScore = (score, user_id) => {
  return db
    .promise()
    .query("INSERT INTO scores SET ?", [{ score, user_id }])
    .then(([res]) => res);
};

// Get all scores
const getAllScore = () => {
  return db
    .promise()
    .query(
      "SELECT userName, score, avatar FROM scores JOIN user ON user.id = scores.user_id ORDER BY score DESC;"
    )
    .then(([res]) => res);
};

// Get a score
const getOneScore = (id) => {
  return db
    .promise()
    .query("SELECT * FROM scores WHERE user_id = ?", [id])
    .then(([res]) => res);
};

// Update a score
const incrementScore = (id, score) => {
  return db
    .promise()
    .query("UPDATE scores SET score = ? WHERE user_id = ?", [score, id])
    .then(([res]) => res);
};

// Delete a score
const deleteOne = (id) => {
  return db
    .promise()
    .query("DELETE FROM scores WHERE user_id = ?", [id])
    .then(([res]) => res);
};

module.exports = {
  createScore,
  getAllScore,
  getOneScore,
  incrementScore,
  deleteOne,
};
