const db = require("../../config");

const findAll = (userId) => {
  return db
    .promise()
    .query(
      "SELECT friendrequest.id as id, userName, user_id, request_id FROM friendrequest JOIN user ON request_id=user.id WHERE user_id = ? ;",
      [userId]
    )
    .then(([res]) => res);
};

const postNewFriendRequest = (infoFriendRequest) => {
  return db
    .promise()
    .query("INSERT INTO friendrequest SET ?", [infoFriendRequest])
    .then(([res]) => res);
};

const deleteFriendRequest = (id) => {
  return db
    .promise()
    .query("DELETE FROM friendrequest WHERE id = ?", [id])
    .then(([res]) => res);
};

module.exports = {
  findAll,
  postNewFriendRequest,
  deleteFriendRequest,
};
