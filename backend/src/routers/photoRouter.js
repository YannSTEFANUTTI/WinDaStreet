const express = require("express");
const multer = require("multer");
const photoController = require("../controllers/photoController");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "../frontend/public/newArtPictures");
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

const photoRouter = express.Router();

photoRouter.get("/:id", photoController.getArtPhoto);
photoRouter.post(
  "/:id",
  upload.single("artPic"),
  photoController.createdArtPhoto
);

module.exports = photoRouter;
