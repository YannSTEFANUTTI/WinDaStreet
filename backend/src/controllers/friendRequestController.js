const friendRequestModel = require("../models/friendRequestModel");

const friendRequestController = {
  getAllfriendRequests: (req, res, next) => {
    const { id } = req.params;
    friendRequestModel
      .findAll(id)
      .then((friendRequest) => res.send(friendRequest))
      .catch((err) => next(err));
  },

  addNewFriendRequest: (req, res, next) => {
    friendRequestModel
      .postNewFriendRequest(req.body)
      .then((result) => {
        if (result.affectedRows !== 1) {
          return res.status(404).send("Friend not found");
        }
        return res.status(200).send("Friend successfully added");
      })
      .catch((err) => next(err));
  },

  deleteFriendRequest: (req, res, next) => {
    const { id } = req.params;
    friendRequestModel
      .deleteFriendRequest(id)
      .then((result) => {
        if (result.affectedRows !== 1) {
          return res.status(404).send(`Friend not found`);
        }
        return res.status(200).send(`Friend rejected`);
      })
      .catch((err) => next(err));
  },
};

module.exports = friendRequestController;
