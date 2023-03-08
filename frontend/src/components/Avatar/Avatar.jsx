/* eslint-disable radix */
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// eslint-disable-next-line import/no-unresolved
import api from "@services/api";
import gsap from "gsap";
import { useGame } from "../../contexts/gameModeContext";
import AvatarArray from "../CreateAccount/Avatar";
import "./Avatar.css";

function Avatar() {
  const { user } = useGame();
  const [friends, setFriends] = useState([]);
  const [visited, setVisited] = useState([]);
  const [avatarImg, setAvatarImg] = useState([]);
  const [isClose, setIsClose] = useState(true);
  let animation = gsap.timeline();
  const mm = gsap.matchMedia();

  const mouseEnter = () => {
    animation.kill();
    animation = gsap.to(".avatarWindow", { right: -1 });
  };
  function mouseLeave() {
    animation.kill();
    mm.add("(max-width: 649px)", () => {
      animation = gsap.to(`.avatarWindow`, { right: "-20.5vw" });
    });
    mm.add("(min-width: 650px)", () => {
      animation = gsap.to(`.avatarWindow`, { right: "-10.2vw" });
    });
  }
  function clickAvatar() {
    if (isClose) {
      mouseEnter();
    } else {
      mouseLeave();
    }
    setIsClose(!isClose);
  }
  useEffect(() => {
    if (user) {
      setAvatarImg(AvatarArray[user.avatar]);
      api
        .get(`/friend/${user.id}`)
        .then((res) => {
          setFriends(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      api
        .get(`/visited/${user.id}`)
        .then((res) => {
          setVisited(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  const deconnection = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="avatarContainer">
      <div
        className="avatarWindow"
        onMouseEnter={() => mouseEnter()}
        onMouseLeave={() => mouseLeave()}
        onClick={() => clickAvatar()}
        onKeyDown={() => clickAvatar()}
        role="presentation"
      >
        <img src={avatarImg} alt="Avatar" />
        {user && (
          <div className="friendsAndPictures">
            <p className="userName">
              {user.userName}
              {parseInt(user.isAdmin) === 1 && (
                <NavLink to="/admin">
                  <p className="adminAvatar">Admin</p>
                </NavLink>
              )}
            </p>
            <p className="friendsGet">{friends.length} amis</p>
            <p className="visitedFound">{visited.length} oeuvres decouvertes</p>

            <p
              className="Deconnection"
              onClick={deconnection}
              onKeyDown={deconnection}
              role="presentation"
              style={{ cursor: "pointer" }}
            >
              Déconnexion
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Avatar;
