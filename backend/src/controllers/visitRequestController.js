/* eslint-disable camelcase */
const visitedRequest = require("../models/visitedRequestModel");

const getAllVisitRequests = (req, res, next) => {
  visitedRequest
    .getAllVisitRequests()
    .then((visitRequests) => {
      if (!visitRequests) {
        return res.status(404).json({ error: "Visit requests non trouvé !" });
      }
      return res.status(200).json(visitRequests);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      next(err);
    });
};

const getVisitRequest = (req, res, next) => {
  const { user_id, art_id } = req.body;
  visitedRequest
    .getVisitRequest(user_id, art_id)
    .then((visitRequest) => {
      if (!visitRequest) {
        return res.status(404).json({ error: "Visit request non trouvé !" });
      }
      return res.status(200).json(visitRequest);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      next(err);
    });
};

const createVisitRequest = (req, res, next) => {
  const request = JSON.parse(req.body.body);
  request.photo = `/public/userPictures/${req.file.filename}`;
  visitedRequest
    .createVisitRequest(request)
    .then((visitRequest) => {
      res.status(201).json(visitRequest);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      next(err);
    });
};

const deleteVisitRequest = (req, res, next) => {
  const user_id = req.query.user;
  const art_id = req.query.art;

  visitedRequest
    .deleteVisitRequest(user_id, art_id)
    .then((visitRequest) => {
      res.status(201).json(visitRequest);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      next(err);
    });
};

module.exports = {
  getAllVisitRequests,
  getVisitRequest,
  createVisitRequest,
  deleteVisitRequest,
};
