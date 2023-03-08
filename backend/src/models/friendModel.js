const db = require("../../config");

const findAll = (userId) => {
  return db
    .promise()
    .query(
      "SELECT userName, score, avatar FROM friend JOIN user ON user.id=friend.friend_id OR user.id=friend.user_id JOIN scores ON scores.user_id = user.id WHERE friend.user_id = ? OR friend.friend_id = ? GROUP BY username, score, avatar ORDER by score DESC;",
      [userId, userId, userId, userId]
    )
    .then(([res]) => res);
};

const postNewFriend = (infoFriend) => {
  return db
    .promise()
    .query("INSERT INTO friend SET ?", [infoFriend])
    .then(([res]) => res);
};

const deleteFriend = (idsupprFriend) => {
  const { userId, friendId } = idsupprFriend;
  return db
    .promise()
    .query("DELETE FROM friend WHERE user_id = ? AND friend_id = ?", [
      userId,
      friendId,
    ])
    .then(([res]) => res);
};

module.exports = {
  findAll,
  postNewFriend,
  deleteFriend,
};
