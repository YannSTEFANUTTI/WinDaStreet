const commentsModel = require("../models/commentsModel");

const commentsController = {
  getAllByArt: (req, res, next) => {
    if (res) {
      const { id } = req.params;
      return commentsModel
        .findAllByArt(id)
        .then((comments) => res.send(comments))
        .catch((err) => next(err));
    }
    const id = req.params;
    return commentsModel
      .findAllByArt(id)
      .then((rew) => rew)
      .catch((err) => console.error(err));
  },

  postComment: (req, res, next) => {
    const comment = req.body;
    commentsModel
      .createOne(comment)
      .then(() => res.status(201).send(comment))
      .catch((err) => next(err));
  },

  deleteComment: (req, res, next) => {
    const commentInfo = req.body;
    commentsModel
      .deleteOne(commentInfo)
      .then((result) => {
        if (result.affectedRows !== 1) {
          return res.status(404).send("Comment not found");
        }
        return res.status(200).send("Comment deleted");
      })
      .catch((err) => next(err));
  },

  updateComment: (req, res, next) => {
    const commentInfo = req.body;
    commentsModel
      .updateOne(commentInfo)
      .then((result) => {
        if (result.affectedRows !== 1) {
          return res.status(404).send(`Comment not found`);
        }
        return res.status(200).send(`Comment modified`);
      })
      .catch((err) => next(err));
  },
};

module.exports = commentsController;
