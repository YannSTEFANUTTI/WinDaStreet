const db = require("../config");

const findAll = async () => {
  const [res] = await db.promise().query("SELECT * FROM user");
  return res;
};

const findNotFriend = (id) => {
  return db
    .promise()
    .query(
      `SELECT * FROM user
    WHERE id not in (SELECT user_id  FROM friendrequest WHERE request_id = ? ) 
    AND id not in (SELECT friend_id  FROM friend WHERE user_id = ?)
    AND id not in (SELECT user_id  FROM friend WHERE friend_id = ?) ;`,
      [id, id, id]
    )
    .then(([res]) => res);
};

const findOne = async (id) => {
  const [res] = await db
    .promise()
    .query("SELECT * FROM user WHERE id = ?", [id]);
  return res;
};

const findByEmail = async (mail) => {
  const [res] = await db
    .promise()
    .query("SELECT * FROM user WHERE mail = ?", [mail]);
  return res;
};

const createOne = async ({ mail, userName, password, avatar }) => {
  const [res] = await db
    .promise()
    .query(
      "INSERT INTO user (mail,userName,password,isAdmin,avatar) VALUES (?,?,?,?,?)",
      [mail, userName, password, 0, avatar]
    );
  return res;
};

const deleteOne = (id) => {
  return db
    .promise()
    .query(`DELETE FROM user WHERE user.id = ? ;`, [id])
    .then(([res]) => res);
};

const updateOne = async (id, user) => {
  const [res] = await db
    .promise()
    .query("UPDATE user SET ? WHERE id = ?", [user, id]);
  return res;
};
const verifyData = async (mail, password) => {
  const [res] = await db
    .promise()
    .query("SELECT * FROM user WHERE mail = ? AND password = ?", [
      mail,
      password,
    ]);
  return res;
};

module.exports = {
  findAll,
  findNotFriend,
  findOne,
  findByEmail,
  createOne,
  deleteOne,
  updateOne,
  verifyData,
};
