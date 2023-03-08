const artRequestModel = require("../models/artRequestModel");

const artRequestController = {
  getAllRequest: (req, res, next) => {
    artRequestModel
      .findAll()
      .then((arts) => res.send(arts))
      .catch((err) => next(err));
  },

  postNewRequest: (req, res, next) => {
    const artRequest = req.body;
    artRequestModel
      .createOne(artRequest)
      .then((result) => {
        res.status(201).send({ id: result.insertId, artRequest });
      })
      .catch((err) => next(err));
  },

  deleteRequest: (req, res, next) => {
    const { id } = req.params;
    artRequestModel
      .deleteOne(id)
      .then((result) => {
        if (result.affectedRows !== 1) {
          return res.status(404).send(`Request ${id} not found`);
        }
        return res.status(200).send(`Request ${id} deleted`);
      })
      .catch((err) => next(err));
  },
};

module.exports = artRequestController;
