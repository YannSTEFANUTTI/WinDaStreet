const express = require("express");
const friendRequestController = require("../controllers/friendRequestController");

const friendRequestRouter = express.Router();

friendRequestRouter.get("/:id", friendRequestController.getAllfriendRequests);
friendRequestRouter.post("/", friendRequestController.addNewFriendRequest);
friendRequestRouter.delete("/:id", friendRequestController.deleteFriendRequest);

module.exports = friendRequestRouter;
