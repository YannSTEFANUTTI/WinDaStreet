const express = require("express");
const keywordsController = require("../controllers/keywordsController");

const keywordsRouter = express.Router();

keywordsRouter.get("/:id", keywordsController.getAllKeywords);
keywordsRouter.post("/", keywordsController.addNewKeyword);

module.exports = keywordsRouter;
