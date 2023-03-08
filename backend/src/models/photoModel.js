const db = require("../../config");

const findOne = (id) => {
  return db
    .promise()
    .query("SELECT * FROM photo WHERE art_id = ?", [id])
    .then(([res]) => res);
};

const createdOne = (request) => {
  return db
    .promise()
    .query("INSERT INTO photo SET ? ", [request])
    .then(([res]) => res);
};

module.exports = { findOne, createdOne };
