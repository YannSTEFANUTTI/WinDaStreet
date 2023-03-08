const photoModel = require("../models/photoModel");

const photoController = {
  getArtPhoto: (req, res, next) => {
    const { id } = req.params;
    photoModel
      .findOne(id)
      .then((photo) => res.send(photo))
      .catch((err) => next(err));
  },

  createdArtPhoto: (req, res, next) => {
    const { id } = req.params;
    const path = `/public/newArtPictures/${req.file.filename}`;
    const photoInfo = {
      art_id: id,
      photo: path,
    };
    photoModel
      .createdOne(photoInfo)
      .then((photo) => {
        res.status(201).send({ id: photo.insertId });
      })
      .catch((err) => next(err));
  },

  deleteArtPhoto: (req, res, next) => {
    photoModel
      .deleteOne(req.body)
      .then((photo) => {
        if (photo.affectedRows !== 1) {
          return res.status(404).send("photo is not found");
        }
        return res.status(200).send("it's good");
      })
      .catch((err) => next(err));
  },
};
module.exports = photoController;
