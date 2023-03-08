const express = require("express");
const notificationsController = require("../controllers/notificationsController");

const notificationRouter = express.Router();

notificationRouter.get("/:id", notificationsController.getAllById);
notificationRouter.post("/", notificationsController.postOne);
notificationRouter.delete("/:id", notificationsController.deleteOne);

module.exports = notificationRouter;
