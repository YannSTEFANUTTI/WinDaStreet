const db = require("../../config");

const findAll = () => {
  return db
    .promise()
    .query("SELECT * FROM quartier")
    .then(([res]) => res);
};

const findOne = (id) => {
  return db
    .promise()
    .query("SELECT * FROM quartier WHERE id = ?", [id])
    .then(([quartier]) => quartier);
};

module.exports = { findAll, findOne };
