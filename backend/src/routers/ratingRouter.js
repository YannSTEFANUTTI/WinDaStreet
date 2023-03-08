const express = require("express");
const ratingController = require("../controllers/ratingController");

const ratingRouter = express.Router();

ratingRouter.get("/:id", ratingController.getArtRating);
ratingRouter.post("/", ratingController.addArtRating);

module.exports = ratingRouter;
