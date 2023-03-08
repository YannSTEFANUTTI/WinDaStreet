const db = require("../../config");

const findAll = (userId) => {
  return db
    .promise()
    .query("SELECT * FROM favorite WHERE user_id = ? ;", [userId])
    .then(([res]) => res);
};
const postNewFavorite = (infoFavorite) => {
  return db
    .promise()
    .query("INSERT INTO favorite SET ?", [infoFavorite])
    .then(([res]) => res);
};

const deleteFavorite = (idSupprFavorite) => {
  const { userId, artId } = idSupprFavorite;
  return db
    .promise()
    .query("DELETE FROM favorite WHERE user_id = ? AND art_id = ?", [
      userId,
      artId,
    ])
    .then(([res]) => res);
};

module.exports = {
  findAll,
  postNewFavorite,
  deleteFavorite,
};
