const db = require("../../config");

const findAll = () => {
  return db
    .promise()
    .query(
      `SELECT art.id, art.name, date, adress, art.description, artiste.name as artiste, GROUP_CONCAT(photo) as photo, 
      artiste.description as artiste_description, quartier_name, artiste_id, quartier_id 
      FROM art 
      JOIN artiste ON artiste_id=artiste.id 
      JOIN quartier ON quartier_id=quartier.id
      JOIN photo ON photo.art_id=art.id
      GROUP BY art.id
      ORDER BY art.id ASC ;`
    )
    .then(([res]) => res);
};

const findAllNotVisited = (id) => {
  return db
    .promise()
    .query(
      `SELECT * FROM art WHERE id IN (SELECT art_id FROM visited WHERE user_id = ?);`,
      [id]
    )
    .then(([res]) => res);
};

const findOne = (id) => {
  return db
    .promise()
    .query(
      "SELECT art.id, art.name, date, adress, art.description, artiste.name as artiste, artiste.description as artiste_description, quartier_name FROM art JOIN artiste ON artiste_id=artiste.id JOIN quartier ON quartier_id=quartier.id WHERE art.id = ? ;",
      [id]
    )
    .then(([res]) => res);
};

const findBy = (id, column) => {
  return db
    .promise()
    .query(
      `SELECT art.id as id, 
        art.name as name, 
        date, 
        adress, 
        art.description, 
        artiste.name as artiste, 
        artiste.description as artiste_description,
        quartier_name, quartier_id, GROUP_CONCAT(photo) as photo
        FROM art 
        JOIN artiste ON artiste_id=artiste.id 
        JOIN quartier ON quartier_id=quartier.id
        LEFT JOIN photo ON photo.art_id=art.id
        WHERE ${column} = ?
        GROUP BY art.id
        ORDER BY art.id ASC ;`,
      [id]
    )
    .then(([res]) => res);
};

const createOne = (artRequest) => {
  return db
    .promise()
    .query("INSERT INTO art SET ? ;", [artRequest])
    .then(([res]) => res);
};

const deleteOne = (artId) => {
  return db
    .promise()
    .query("DELETE FROM art WHERE id = ? ;", [artId])
    .then(([res]) => res);
};

const updateOne = (artId, artInfo) => {
  return db
    .promise()
    .query("UPDATE art SET ? WHERE id = ?", [artInfo, artId])
    .then(([res]) => res);
};

const numberQuartier = (id) => {
  return db
    .promise()
    .query(
      `SELECT COUNT(*) AS total, quartier_name, quartier.id FROM art INNER JOIN quartier ON art.quartier_id=quartier.id GROUP BY quartier_name, quartier.id ;`,
      [id]
    )
    .then(([res]) => [res]);
};

module.exports = {
  findAll,
  findAllNotVisited,
  findOne,
  findBy,
  createOne,
  deleteOne,
  updateOne,
  numberQuartier,
};
