const friendModel = require("../models/friendModel");

const friendController = {
  // Get all friends
  getAllFriends: (req, res, next) => {
    const { id } = req.params;
    friendModel
      .findAll(id)
      .then((friend) => res.send(friend))
      .catch((err) => next(err));
  },

  // Add a new friend
  addNewFriend: (req, res, next) => {
    friendModel
      .postNewFriend(req.body)
      .then((result) => res.status(201).send({ id: result.insertId }))
      .catch((err) => next(err));
  },

  // Delete a friend
  deleteFriend: (req, res, next) => {
    friendModel
      .deleteFriend(req.body)
      .then((result) => {
        if (result.affectedRows !== 1) {
          return res.status(404).send(`Friend not found`);
        }
        return res.status(200).send(`Friend deleted`);
      })
      .catch((err) => next(err));
  },
};

module.exports = friendController;
