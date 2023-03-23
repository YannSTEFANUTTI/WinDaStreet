/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import api from "@services/api";
import { useEffect, useState } from "react";
import { useGame } from "../../contexts/GameModeContext";
import ResultsDisplay from "./resultsDisplay";
import UserInfoData from "./UserInfoData";

function UserInfoNavbar({ handleNotif }) {
  const { user } = useGame();
  const [allUser, setAllUser] = useState();
  const [allNotif, setAllNotif] = useState();
  const [allNotifNumber, setAllNotifNumber] = useState();
  const [allFriend, setAllFriend] = useState();
  const [isResult, setIsResult] = useState();

  const handleResult = (isAddFriend) => {
    if (isAddFriend === true) {
      setIsResult({ isAddFriend: true });
    } else if (isAddFriend === "close") {
      setIsResult();
    } else {
      setIsResult({ isAddFriend: false });
    }
  };

  const getAllRequest = () => {
    api
      .get(`/friendrequest/${user.id}`)
      .then((res) => setAllFriend(res.data))
      .catch((err) => console.error(err));
  };

  const getUserNotFriend = () => {
    api
      .get(`/user/notfriend/${user.id}`)
      .then((res) => setAllUser(res.data))
      .catch((err) => console.error(err));
  };

  const getAllNotif = () => {
    api
      .get(`/notif/${user.id}`)
      .then((res) => {
        setAllNotif(allFriend.concat(res.data));
        setAllNotifNumber(allFriend.concat(res.data).length);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getAllRequest();
    getUserNotFriend();
  }, []);

  useEffect(() => {
    if (allFriend) {
      getAllNotif();
    }
  }, [allFriend]);

  return (
    <div className="UserInfoNavbar">
      {UserInfoData.map((info) => {
        return (
          <div>
            <div
              className={info.class}
              onClick={() => handleResult(info.isFriend)}
              onKeyDown={() => handleResult(info.isFriend)}
              role="none"
            >
              <img src={info.src} alt="Picto" />
              {!info.isFriend && allNotifNumber > 0 && (
                <div className="notifNumber">{allNotifNumber}</div>
              )}
            </div>
            {isResult && isResult.isAddFriend === info.isFriend && (
              <ResultsDisplay
                isAddFriend={info.isFriend}
                myArray={info.isFriend ? allUser : allNotif}
                handleResult={handleResult}
                getUserNotFriend={info.isFriend && getUserNotFriend}
                getAllRequest={!info.isFriend && getAllRequest}
                getAllNotif={!info.isFriend && getAllNotif}
                handleNotif={handleNotif}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

UserInfoNavbar.propTypes = {
  handleNotif: PropTypes.func.isRequired,
};

export default UserInfoNavbar;
