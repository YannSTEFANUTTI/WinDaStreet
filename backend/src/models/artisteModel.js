const db = require("../../config");

const findAll = () => {
  return db
    .promise()
    .query("SELECT * FROM artiste ;")
    .then(([res]) => res);
};

const createOne = (artiste) => {
  return db
    .promise()
    .query("INSERT INTO artiste SET ? ;", [artiste])
    .then(([res]) => res);
};

const deleteOne = (artisteId) => {
  return db
    .promise()
    .query("DELETE FROM artiste WHERE id = ? ;", [artisteId])
    .then(([res]) => res);
};

module.exports = {
  findAll,
  createOne,
  deleteOne,
};
