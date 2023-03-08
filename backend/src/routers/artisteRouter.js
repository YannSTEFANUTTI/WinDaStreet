const express = require("express");
const artisteController = require("../controllers/artisteController");

const artisteRouter = express.Router();

artisteRouter.get("/", artisteController.getAllArtiste);
artisteRouter.post("/", artisteController.postNewArtiste);
artisteRouter.delete("/:id", artisteController.deleteArtiste);

module.exports = artisteRouter;
