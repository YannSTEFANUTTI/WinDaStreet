const db = require("../../config");

const findAll = () => {
  return db
    .promise()
    .query("SELECT * FROM artRequest ;")
    .then(([res]) => res);
};

const createOne = (request) => {
  return db
    .promise()
    .query("INSERT INTO artRequest SET ? ;", [request])
    .then(([res]) => res);
};

const deleteOne = (requestId) => {
  return db
    .promise()
    .query("DELETE FROM artRequest WHERE id = ? ;", [requestId])
    .then(([res]) => res);
};

module.exports = {
  findAll,
  createOne,
  deleteOne,
};
