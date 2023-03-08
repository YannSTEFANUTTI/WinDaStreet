const db = require("../../config");

const findAllByArt = (artId) => {
  return db
    .promise()
    .query(
      "SELECT commentaires.*, userName FROM commentaires JOIN user ON user.id=user_id WHERE art_id = ? ORDER BY id DESC ;",
      [artId]
    )
    .then(([res]) => res);
};

const createOne = (commentInfo) => {
  return db
    .promise()
    .query("INSERT INTO commentaires SET ?", [commentInfo])
    .then(([res]) => res);
};

const deleteOne = (commentInfo) => {
  const { artId, userId } = commentInfo;
  return db
    .promise()
    .query("DELETE FROM commentaires WHERE art_id = ? AND user_id = ? ;", [
      artId,
      userId,
    ])
    .then(([res]) => res);
};

const updateOne = (commentInfo) => {
  return db
    .promise()
    .query("UPDATE commentaires SET ? WHERE art_id = ? AND user_id = ? ;", [
      commentInfo,
      commentInfo.art_id,
      commentInfo.user_id,
    ])
    .then(([res]) => res);
};

module.exports = {
  findAllByArt,
  createOne,
  deleteOne,
  updateOne,
};
