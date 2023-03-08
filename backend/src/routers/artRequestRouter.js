const express = require("express");
const artRequestController = require("../controllers/artRequestController");

const artRequestRouter = express.Router();

artRequestRouter.get("/", artRequestController.getAllRequest);
artRequestRouter.post("/", artRequestController.postNewRequest);
artRequestRouter.delete("/:id", artRequestController.deleteRequest);

module.exports = artRequestRouter;
