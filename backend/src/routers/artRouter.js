const express = require("express");
const artController = require("../controllers/artController");

const artRouter = express.Router();
artRouter.get("/quartier", artController.getArtsQuartier);
artRouter.get("/getby/:id", artController.getArtBy);
artRouter.get("/notvisited/:id", artController.getNotVisited);
artRouter.get("/", artController.getArts);
artRouter.get("/:id", artController.getOneArt);
artRouter.post("/", artController.postNewArt);
artRouter.delete("/:id", artController.deleteArt);
artRouter.put("/:id", artController.updateArt);

module.exports = artRouter;
