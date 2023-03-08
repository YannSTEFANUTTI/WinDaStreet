const express = require("express");
const scoreController = require("../controllers/scoreControllers");

const scoreRouter = express.Router();

scoreRouter.get("/", scoreController.getAllScore);
scoreRouter.get("/:id", scoreController.getScore);
scoreRouter.post("/:id", scoreController.createScore);
scoreRouter.put("/:id", scoreController.incrementScore);
scoreRouter.delete("/:id", scoreController.deleteScore);

module.exports = scoreRouter;
