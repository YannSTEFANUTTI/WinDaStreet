const notifModel = require("../models/notificationsModel");

const notificationsController = {
  getAllById: (req, res, next) => {
    const { id } = req.params;
    notifModel
      .findAllById(id)
      .then((notif) => res.send(notif))
      .catch((err) => next(err));
  },

  postOne: (req, res, next) => {
    const notifInfo = req.body;
    notifModel
      .createOne(notifInfo)
      .then((result) =>
        res.status(201).send({ id: result.insertId, notifInfo })
      )
      .catch((err) => next(err));
  },

  deleteOne: (req, res, next) => {
    const { id } = req.params;
    notifModel
      .deleteOne(id)
      .then((result) => {
        if (result.affectedRows !== 1) {
          return res.status(404).send(`Notification ${id} not found`);
        }
        return res.status(200).send(`Notification ${id} deleted`);
      })
      .catch((err) => next(err));
  },
};

module.exports = notificationsController;
