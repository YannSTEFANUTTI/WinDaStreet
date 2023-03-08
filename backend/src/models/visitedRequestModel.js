/* eslint-disable camelcase */
const db = require("../../config");

const createVisitRequest = (request) => {
  const query = `INSERT INTO visitedrequest SET ?`;
  return db
    .promise()
    .query(query, [request])
    .then(([res]) => res);
};

const getAllVisitRequests = () => {
  return db
    .promise()
    .query(
      `SELECT art.id, art.name, art.date, adress, art.description, artiste.name as artiste, GROUP_CONCAT(photo.photo) as photo, 
      artiste.description as artiste_description, quartier_name, artiste_id, quartier_id, user.userName, user.id as user_id, visitedrequest.photo as user_photo
      FROM art 
      JOIN artiste ON artiste_id=artiste.id 
      JOIN quartier ON quartier_id=quartier.id
      JOIN photo ON photo.art_id=art.id
      JOIN visitedrequest ON art.id=visitedrequest.art_id
      JOIN user ON visitedrequest.user_id=user.id
      GROUP BY art.id, user.userName, visitedrequest.photo, user_id
      ORDER BY art.id ASC ;`
    )
    .then(([res]) => res);
};

const getVisitRequest = (req, res) => {
  const { user_id, art_id } = req.body;
  const query = `SELECT * FROM visitedrequest WHERE user_id = $1 AND art_id = $2`;
  db.query(query, [user_id, art_id], (err, result) => {
    if (err) {
      res.status(500).send("Error getting visit request");
    } else {
      res.status(200).send(result.rows);
    }
  });
};

const deleteVisitRequest = (user_id, art_id) => {
  const query = `DELETE FROM visitedrequest WHERE user_id = ? AND art_id = ?`;
  return db
    .promise()
    .query(query, [user_id, art_id])
    .then(([res]) => res);
};

module.exports = {
  createVisitRequest,
  getAllVisitRequests,
  getVisitRequest,
  deleteVisitRequest,
};
