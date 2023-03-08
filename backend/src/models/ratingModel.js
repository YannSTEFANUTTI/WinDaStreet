const db = require("../../config");

const findAverageNote = (id) => {
  return db
    .promise()
    .query(
      "SELECT name, art_id, AVG(note) AS 'note moyenne de l oeuvre' FROM rating JOIN art ON rating.art_id=art.id WHERE id= ?",
      [id]
    )
    .then(([note]) => note);
};

const addNote = (rating) => {
  return db
    .promise()
    .query("INSERT INTO rating SET ?", [rating])
    .then(([res]) => res);
};

module.exports = { findAverageNote, addNote };
