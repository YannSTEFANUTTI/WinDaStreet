const keywordsModel = require("../models/keywordsModel");

const keywordsController = {
  getAllKeywords: (req, res, next) => {
    const { id } = req.params;
    keywordsModel
      .findAll(id)
      .then((keywords) => res.send(keywords))
      .catch((err) => next(err));
  },

  addNewKeyword: (req, res, next) => {
    keywordsModel
      .postNewKeyword(req.body)
      .then((result) => res.status(201).send({ id: result.insertId }))
      .catch((err) => next(err));
  },
};

module.exports = keywordsController;
