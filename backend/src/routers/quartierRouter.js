const express = require("express");
const quartierController = require("../controllers/quartierController");

const quartierRouter = express.Router();

quartierRouter.get("/", quartierController.getAllQuartier);
quartierRouter.get("/:id", quartierController.getOneQuartier);

module.exports = quartierRouter;
