const express = require("express");
const favoriteController = require("../controllers/favoriteController");

const favoriteRouter = express.Router();

favoriteRouter.get("/:id", favoriteController.getAllFavorites);
favoriteRouter.post("/", favoriteController.addNewFavorite);
favoriteRouter.delete("/", favoriteController.deleteFavorite);

module.exports = favoriteRouter;
