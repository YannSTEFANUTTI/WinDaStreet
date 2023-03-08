const express = require("express");
const commentsController = require("../controllers/commentsController");

const commentsRouter = express.Router();

commentsRouter.get("/:id", commentsController.getAllByArt);
commentsRouter.post("/", commentsController.postComment);
commentsRouter.delete("/", commentsController.deleteComment);
commentsRouter.put("/", commentsController.updateComment);

module.exports = commentsRouter;
