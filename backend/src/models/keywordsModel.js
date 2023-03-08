const db = require("../../config");

const findAll = (userId) => {
  return db
    .promise()
    .query("SELECT * FROM keywords WHERE art_id = ? ;", [userId])
    .then((res) => res);
};

const postNewKeyword = (infoKeyword) => {
  return db
    .promise()
    .query("INSERT INTO keywords SET ?", [infoKeyword])
    .then(([res]) => res);
};

module.exports = {
  findAll,
  postNewKeyword,
};
