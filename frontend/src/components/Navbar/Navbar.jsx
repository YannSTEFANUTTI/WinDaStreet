/* eslint-disable import/no-unresolved */
import "./Navbar.css";
import Toggle from "@components/Toggle/Toggle";
import SearchBar from "@components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import PopUpNotif from "@components/PopUpNotif/PopUpNotif";
import spraySound from "@assets/spray.mp3";
import { Link } from "react-router-dom";
import UserInfoNavbar from "./UserInfoNavbar";
import { useGame } from "../../contexts/gameModeContext";

function Navbar() {
  const { user, gameMode, switchMode } = useGame();
  const [notif, setNotif] = useState(false);
  const spraySoundPlayer = document.getElementById("spraySound");

  const handleNotif = (notifText) => {
    if (notif === false) {
      setNotif(notifText);
      spraySoundPlayer.play();
    }
  };

  useEffect(() => {
    if (notif) {
      setTimeout(() => {
        setNotif(false);
        spraySoundPlayer.currentTime = 0;
      }, 5000);
    }
  }, [notif]);

  return (
    <div className="Navbar">
      <audio id="spraySound" src={spraySound}>
        <track kind="captions" />
      </audio>
      {notif && <PopUpNotif notif={notif} />}
      {window.matchMedia("(min-width: 768px").matches && (
        <Toggle myHandle={switchMode} myVar={gameMode} isNavbar />
      )}
      {window.matchMedia("(max-width: 767px").matches && user && (
        <div className="UserPicAndNameContainer">
          <p className="UserNameNavbar">{user.userName}</p>
        </div>
      )}
      <div
        className={
          window.matchMedia("(max-width: 767px").matches && user
            ? "rightSection rightSectionMobile"
            : "rightSection"
        }
      >
        {user ? (
          <UserInfoNavbar handleNotif={handleNotif} />
        ) : (
          <Link to="/authentication">
            <p className="NavBarConnexion">Connexion</p>
          </Link>
        )}
        <SearchBar />
      </div>
    </div>
  );
}

export default Navbar;
