const express = require("express");
const friendController = require("../controllers/friendController");

const friendRouter = express.Router();

friendRouter.get("/:id", friendController.getAllFriends);
friendRouter.post("/", friendController.addNewFriend);
friendRouter.delete("/", friendController.deleteFriend);

module.exports = friendRouter;
