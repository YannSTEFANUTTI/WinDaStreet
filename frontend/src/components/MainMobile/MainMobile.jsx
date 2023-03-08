/* eslint-disable import/no-unresolved */
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import gsap from "gsap";
import ecran from "../../assets/ecranGB.png";
import green from "../../assets/BoutonVert.png";
import red from "../../assets/BoutonRouge.png";
import textIntro from "../../assets/TexteIntro.gif";
import console from "../../assets/GameBoy-sansecran.png";
import "./MainMobile.css";
import { useGame } from "../../contexts/gameModeContext";

function MainMobile() {
  const [greenStyle, setGreenStyle] = useState(true);
  const [redStyle, setRedStyle] = useState(true);
  const { setGameMode, user } = useGame();
  const TL = gsap.timeline();
  const navigate = useNavigate();

  useEffect(() => {
    setGameMode(false);
  }, []);
  const greenClick = () => {
    setGreenStyle(!greenStyle);
    setGameMode(true);
    setTimeout(() => {
      setGreenStyle(true);
    }, 200);
    setTimeout(() => {
      navigate("/");
    }, 2000);
    gsap.to(".gameboyFull", { y: 800, duration: 1, delay: 0.4 });
    TL.to(".mainMobile", { opacity: "0", delay: 0.8, duration: 1 }).to(
      ".mainMobile",
      { display: "none" }
    );
  };
  const redClick = () => {
    setRedStyle(!redStyle);
    if (user) {
      setGameMode(false);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setGameMode(true);
      setTimeout(() => {
        navigate("/authentication");
      }, 2000);
    }
    setTimeout(() => {
      setRedStyle(true);
    }, 200);
    gsap.to(".gameboyFull", { y: 800, duration: 1, delay: 0.4 });
    TL.to(".mainMobile", { opacity: "0", delay: 0.8, duration: 1 }).to(
      ".mainMobile",
      { display: "none" }
    );
  };
  return (
    <div className="mainMobile">
      <img src={textIntro} alt="textIntro" className="textIntroMobile" />
      <div className="gameboyFull">
        <img className="ecranGB" src={ecran} alt="ecran" />
        <img className="gameboy" src={console} alt="gameboy" />
        <div className="controllerFullGB">
          <img
            onClick={redClick}
            onKeyDown={() => {}}
            role="presentation"
            style={{
              opacity: redStyle ? "" : "0",
            }}
            className="redButtonGB"
            src={red}
            alt="Red Button"
          />
          <img
            onClick={greenClick}
            onKeyDown={() => {}}
            role="presentation"
            style={{
              opacity: greenStyle ? "" : "0",
            }}
            className="greenButtonGB"
            src={green}
            alt="Green Button"
          />
        </div>
      </div>
    </div>
  );
}

export default MainMobile;
