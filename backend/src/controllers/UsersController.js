/* eslint-disable consistent-return */
const userModel = require("../models/UserModel");

const userController = {
  login: (req, res, next) => {
    const { mail } = req.body;
    userModel
      .findByEmail(mail)
      .then((user) => {
        if (user.length === 0) {
          return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        [req.user] = user;
        return next();
      })
      .catch((err) => {
        next(err);
      });
  },

  logout: (req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: "Vous êtes déconnecté !" });
    });
  },

  getAllUsers: (req, res, next) => {
    userModel
      .findAll()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        next(err);
      });
  },

  getOneUser: (req, res, next) => {
    const { id } = req.params;
    userModel
      .findOne(id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "Utilisateur non trouvé !" });
        }
        return res.status(200).json(user);
      })
      .catch((err) => {
        next(err);
      });
  },

  getUserNotFriend: (req, res, next) => {
    const { id } = req.params;
    userModel
      .findNotFriend(id)
      .then((users) => res.send(users))
      .catch((err) => next(err));
  },

  postUser: (req, res, next) => {
    const { mail } = req.body;
    const userInfo = req.body;
    req.body.isAdmin = 0;
    userModel.findByEmail(mail).then((user) => {
      if (user.length !== 0) {
        return res.status(409).json({ error: "Email déjà existant !" });
      }
      return userModel
        .createOne(userInfo)
        .then((result) => {
          if (result.affectedRows !== 1) {
            return res.status(404).send(`Utilisateur déjà existant !`);
          }
          return res.status(200).send({
            message: `Utilisateur créé`,
            info: userInfo,
            id: result.insertId,
          });
        })
        .catch((err) => next(err));
    });
  },

  deleteUser: (req, res, next) => {
    const { id } = req.params;
    userModel
      .findOne(id)
      .then((user) => {
        if (user.length === 0) {
          return res.status(404).json({ error: "Utilisateur non trouvé !" });
        }
        return userModel
          .deleteOne(id)
          .then((result) => {
            if (result.affectedRows === 0) {
              return res.status(404).send(result);
            }
            return res
              .status(200)
              .send({ message: `Utilisateur ${id} supprimé` });
          })
          .catch((err) => next(err));
      })
      .catch((err) => {
        next(err);
      });
  },

  updateOneUser: (req, res, next) => {
    const { id } = req.params;
    const userInfo = req.body;
    userModel
      .findOne(id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "Utilisateur non trouvé !" });
        }
        return userModel
          .updateOne(id, userInfo)
          .then((result) => {
            if (result.affectedRows !== 1) {
              return res.status(404).send(`Utilisateur ${id} non trouvé !`);
            }
            return res
              .status(200)
              .send({ message: `Utilisateur ${id} modifié`, userInfo });
          })
          .catch((err) => next(err));
      })
      .catch((err) => {
        next(err);
      });
  },
};

module.exports = userController;
