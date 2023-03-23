/* eslint-disable import/no-unresolved */
import api from "@services/api";
import { useState, useEffect } from "react";
import { useGame } from "../../contexts/GameModeContext";
import AdminButton from "./AdminButton";
import "./AdminRequest.css";
import AdminTemplate from "./AdminTemplate";

function AdminRequest() {
  const [allRequest, setAllRequest] = useState([]);
  const { date } = useGame();

  const getAllRequest = () => {
    api
      .get("/visitedrequest")
      .then((res) => setAllRequest(res.data))
      .catch((err) => console.error(err));
  };

  const postVisited = (userId, artId, photo) => {
    api
      .post("/visited", {
        user_id: userId,
        art_id: artId,
        photo,
        date,
      })
      .then((res) => res)
      .catch((err) => console.error(err));
  };

  const updateScore = (userId) => {
    api
      .get(`/score/${userId}`)
      .then((res) => {
        if (res.status === 200) {
          api
            .put(`/score/${userId}`, {
              Score: Number(res.data[0].score) + 10,
            })
            .then((result) => result)
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  };

  const postNotif = (userId, name, isValid) => {
    api
      .post("/notif", {
        user_id: userId,
        notification: isValid
          ? `Votre photo pour ${name} a été acceptée`
          : `Votre photo pour ${name} a été refusée`,
      })
      .then((res) => res)
      .catch((err) => console.error(err));
  };

  const deleteRequest = (userId, artId, name, isValid) => {
    api
      .delete(`/visitedrequest?user=${userId}&art=${artId}`)
      .then((res) => {
        if (res.status === 201) {
          getAllRequest();
        }
      })
      .catch((err) => console.error(err));
    if (!isValid) {
      postNotif(userId, name, false);
    }
  };

  const acceptRequest = (userId, artId, photo, name) => {
    postVisited(userId, artId, photo);
    deleteRequest(userId, artId, name, true);
    updateScore(userId);
    postNotif(userId, name, true);
  };

  useEffect(() => {
    getAllRequest();
  }, []);

  return (
    <AdminTemplate title={`${allRequest.length} AJOUTS PHOTOS`}>
      <div className="AdminRequest">
        {allRequest.map((request) => {
          const truePic = request.photo.split(",");
          return (
            <div className="AdminRequestContainer">
              <div className="AdminRequestPic">
                <div className="AdminRequestPicOne">
                  <img src={truePic[truePic.length - 1]} alt="Vrai" />
                  <p>{request.name}</p>
                  <p>{request.artiste}</p>
                </div>
                <div className="AdminRequestPicOne">
                  <img src={request.user_photo} alt="Utilisateur" />
                  <p>Photo de {request.userName}</p>
                </div>
              </div>
              <div className="AdminRequestChoice">
                <AdminButton
                  content="VALIDER"
                  myHandle={() =>
                    acceptRequest(
                      request.user_id,
                      request.id,
                      request.user_photo,
                      request.name
                    )
                  }
                />
                <AdminButton
                  content="REFUSER"
                  myHandle={() =>
                    deleteRequest(
                      request.user_id,
                      request.id,
                      request.name,
                      false
                    )
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </AdminTemplate>
  );
}

export default AdminRequest;
