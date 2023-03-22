/* eslint-disable consistent-return */
const friendModel = require("../models/friendModel");

const friendController = {
  // Get all friends
  getAllFriends: async (req, res, next) => {
    try {
      const { id } = req.params;
      const friends = await friendModel.findAll(id);
      res.send(friends);
    } catch (err) {
      next(err);
    }
  },

  // Add a new friend
  addNewFriend: async (req, res, next) => {
    try {
      const result = await friendModel.postNewFriend(req.body);
      res.status(201).send({ id: result.insertId });
    } catch (err) {
      next(err);
    }
  },

  // Delete a friend
  deleteFriend: async (req, res, next) => {
    try {
      const result = await friendModel.deleteFriend(req.body);
      if (result.affectedRows !== 1) {
        return res.status(404).send(`Friend not found`);
      }
      return res.status(200).send(`Friend deleted`);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = friendController;
