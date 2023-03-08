const express = require("express");
const multer = require("multer");
const visitRequestController = require("../controllers/visitRequestController");

const visitedRequestRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "../frontend/public/userPictures");
  },
  filename: (req, file, callBack) => {
    const ext = file.mimetype.split("/")[1];
    const fileName = file.originalname.substring(
      0,
      file.originalname.lastIndexOf(".")
    );
    callBack(null, `${fileName}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });

visitedRequestRouter.get("/", visitRequestController.getAllVisitRequests);
visitedRequestRouter.get("/:id", visitRequestController.getVisitRequest);
visitedRequestRouter.post(
  "/",
  upload.single("userPicture"),
  visitRequestController.createVisitRequest
);
visitedRequestRouter.delete("/", visitRequestController.deleteVisitRequest);

module.exports = visitedRequestRouter;
