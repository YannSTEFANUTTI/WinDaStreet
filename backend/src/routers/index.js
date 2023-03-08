const express = require("express");
const favoriteRouter = require("./favoriteRouter");
const friendRouter = require("./friendRouter");
const friendRequestRouter = require("./friendRequestRouter");
const keywordsRouter = require("./keywordsRouter");
const artRouter = require("./artRouter");
const artisteRouter = require("./artisteRouter");
const artRequestRouter = require("./artRequestRouter");
const UsersRouter = require("./UsersRouter");
const scoreRouter = require("./scoreRouter");
const visitedRouter = require("./visitedRouter");
const visitedRequestRouter = require("./visitedRequestRouter");
const photoRouter = require("./photoRouter");
const quartierRouter = require("./quartierRouter");
const ratingRouter = require("./ratingRouter");
const commentsRouter = require("./commentsRouter");
const notificationRouter = require("./notificationRouter");

const router = express.Router();

router.use("/favorite", favoriteRouter);
router.use("/friend", friendRouter);
router.use("/friendrequest", friendRequestRouter);
router.use("/keywords", keywordsRouter);
router.use("/photo", photoRouter);
router.use("/quartier", quartierRouter);
router.use("/rating", ratingRouter);
router.use("/art", artRouter);
router.use("/artiste", artisteRouter);
router.use("/artrequest", artRequestRouter);
router.use("/user", UsersRouter);
router.use("/score", scoreRouter);
router.use("/visited", visitedRouter);
router.use("/visitedrequest", visitedRequestRouter);
router.use("/comments", commentsRouter);
router.use("/notif", notificationRouter);

module.exports = router;
