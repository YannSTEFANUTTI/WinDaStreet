const express = require("express");
const visitedControllers = require("../controllers/visitedControllers");

const visitedRouter = express.Router();

visitedRouter.get("/:id", visitedControllers.getAllVisits);
visitedRouter.get("/:id/:art_id", visitedControllers.getOneVisit);
visitedRouter.post("/", visitedControllers.createVisit);
module.exports = visitedRouter;
