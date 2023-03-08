const db = require("../config");

const findAllById = (id) => {
  return db
    .promise()
    .query("SELECT id, notification FROM notifications WHERE user_id = ? ;", [
      id,
    ])
    .then(([res]) => res);
};

const createOne = (notifInfo) => {
  return db
    .promise()
    .query("INSERT INTO notifications SET ? ;", [notifInfo])
    .then(([res]) => res);
};

const deleteOne = (id) => {
  return db
    .promise()
    .query("DELETE FROM notifications WHERE id = ? ;", [id])
    .then(([res]) => res);
};

module.exports = {
  findAllById,
  createOne,
  deleteOne,
};
