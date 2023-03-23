/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import check from "@assets/check.png";
import cross from "@assets/cross.png";
import whiteCross from "@assets/white-cross.png";
import add from "@assets/more-info-white.png";
import api from "@services/api";
import { useState, useEffect } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useGame } from "../../contexts/GameModeContext";

function ResultsDisplay({
  isAddFriend,
  myArray,
  handleResult,
  getAllRequest,
  getAllNotif,
  getUserNotFriend,
  handleNotif,
}) {
  const { user } = useGame();
  const [activeDetection, setActiveDetection] = useState();
  const [friendResearch, setFriendResearch] = useState("");

  const detectClickOutside = useDetectClickOutside({
    onTriggered: () => handleResult("close"),
  });

  const deleteRequest = (requestInfo) => {
    api
      .delete(`/friendrequest/${requestInfo.id}`)
      .then((res) => {
        if (res.status === 200) {
          getAllRequest();
        }
      })
      .catch((err) => console.error(err));
  };

  const acceptRequest = (requestInfo) => {
    api
      .post("/friend", {
        user_id: requestInfo.user_id,
        friend_id: requestInfo.request_id,
      })
      .then((res) => {
        if (res.status === 201) {
          deleteRequest(requestInfo);
          handleNotif(`${requestInfo.userName} est maintenant votre ami !`);
        }
      })
      .catch((err) => console.error(err));
  };

  const deleteNotif = (notifInfo) => {
    api
      .delete(`/notif/${notifInfo.id}`)
      .then((res) => {
        if (res.status === 200) {
          getAllNotif();
        }
      })
      .catch((err) => console.error(err));
  };

  const addRequest = (friend) => {
    api
      .post("/friendrequest", {
        user_id: friend.id,
        request_id: user.id,
      })
      .then((res) => {
        if (res.status === 200) {
          getUserNotFriend();
          handleNotif("Votre demande d'ami a été envoyé !");
        }
        return 0;
      })
      .catch((err) => console.error(err));
  };

  const displayCondition = (el) => {
    if (isAddFriend) {
      return el.userName;
    }
    if (el.userName) {
      return `${el.userName} vous a demandé en ami`;
    }
    return el.notification;
  };

  const handleFriendResearch = (e) => {
    setFriendResearch(e.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      setActiveDetection(true);
    }, 500);
  }, []);

  return (
    <div className="ResultsDisplay" ref={activeDetection && detectClickOutside}>
      {isAddFriend && (
        <input
          type="text"
          placeholder="Pseudo"
          value={friendResearch}
          onChange={handleFriendResearch}
        />
      )}
      {myArray &&
        myArray
          .filter(
            (el) =>
              !isAddFriend ||
              (el.userName !== user.userName &&
                el.userName.toLowerCase().includes(friendResearch))
          )
          .map((el) => (
            <div className="oneResultDisplay">
              <p>{displayCondition(el)}</p>
              {!isAddFriend && el.userName && (
                <div className="requestDecision">
                  <div
                    className="requestDecisionCheck"
                    onClick={() => acceptRequest(el)}
                    onKeyDown={() => acceptRequest(el)}
                    role="none"
                  >
                    <img src={check} alt="check" />
                  </div>
                  <div
                    className="requestDecisionCross"
                    onClick={() => deleteRequest(el)}
                    onKeyDown={() => deleteRequest(el)}
                    role="none"
                  >
                    <img src={cross} alt="cross" />
                  </div>
                </div>
              )}
              {el.notification && (
                <div
                  className="deleteNotif"
                  onClick={() => deleteNotif(el)}
                  onKeyDown={() => deleteNotif(el)}
                  role="none"
                >
                  <img src={whiteCross} alt="whiteCross" />
                </div>
              )}
              {isAddFriend && (
                <div
                  className="addFriend"
                  onClick={() => addRequest(el)}
                  onKeyDown={() => addRequest(el)}
                  role="none"
                >
                  <img src={add} alt="add" />
                </div>
              )}
            </div>
          ))}
    </div>
  );
}

ResultsDisplay.propTypes = {
  getAllNotif: PropTypes.func.isRequired,
  getAllRequest: PropTypes.func.isRequired,
  getUserNotFriend: PropTypes.func.isRequired,
  handleNotif: PropTypes.func.isRequired,
  handleResult: PropTypes.func.isRequired,
  isAddFriend: PropTypes.bool.isRequired,
  myArray: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ResultsDisplay;

ResultsDisplay.propTypes = {
  isAddFriend: PropTypes.bool.isRequired,
  myArray: PropTypes.string.isRequired,
  handleResult: PropTypes.func.isRequired,
  getAllRequest: PropTypes.func.isRequired,
  getAllNotif: PropTypes.func.isRequired,
  getUserNotFriend: PropTypes.func.isRequired,
};
