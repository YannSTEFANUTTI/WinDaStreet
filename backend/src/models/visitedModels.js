/* eslint-disable camelcase */
const db = require("../../config");

const createVisit = (visitInfo) => {
  return db
    .promise()
    .query("INSERT INTO visited SET ?", [visitInfo])
    .then(([res]) => res);
};

const getAllVisits = (id) => {
  return db
    .promise()
    .query("SELECT * FROM visited WHERE user_id = ?", [id])
    .then(([res]) => res);
};

const getOneVisit = (id, art_id) => {
  return db
    .promise()
    .query("SELECT * FROM visited WHERE user_id = ? AND art_id = ?", [
      id,
      art_id,
    ])
    .then(([res]) => res);
};

module.exports = {
  createVisit,
  getAllVisits,
  getOneVisit,
};
