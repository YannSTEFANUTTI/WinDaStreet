/* eslint-disable import/no-unresolved */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import gsap from "gsap";
import tv from "../../assets/television.png";
import ecran from "../../assets/Ecran.png";
import green from "../../assets/buttonGreen.png";
import red from "../../assets/buttonRed.png";
import controller from "../../assets/controller.png";
import table from "../../assets/table.png";
import tasse from "../../assets/tasse.png";
import BombBonzai from "../../assets/Bomb-Bonzai.png";
import console from "../../assets/console.png";
import textIntro from "../../assets/TexteIntro.gif";

import "./MainMenu.css";
import { useGame } from "../../contexts/GameModeContext";

function MainMenu() {
  const [greenStyle, setGreenStyle] = useState(true);
  const [redStyle, setRedStyle] = useState(true);
  const { setGameMode, user } = useGame();
  const navigate = useNavigate();
  const TL = gsap.timeline();

  useEffect(() => {
    setGameMode(false);
  }, []);

  useEffect(() => {
    TL.fromTo(
      ".television",
      { rotate: -20, duration: 0.3, y: -1300 },
      { delay: 1, rotate: -20, y: 0 }
    )
      .to(".television", {
        rotate: 0,
        delay: -0.15,
        ease: "back",
        duration: 0.35,
      })
      .from(".controllerFull", {
        duration: 0.5,
        x: 800,
        ease: "out",
      })
      .to(".controllerFull", {
        duration: 1.5,
        y: -30,
        yoyo: true,
        repeat: -1,
      });
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
    gsap.to(".controllerFull", { x: 800, duration: 1, delay: 0.3 });
    TL.to(".mainMenu", { opacity: "0", delay: 0.8, duration: 1 }).to(
      ".mainMenu",
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
    gsap.to(".controllerFull", { x: 800, duration: 1, delay: 0.3 });
    TL.to(".mainMenu", { opacity: "0", delay: 0.8, duration: 1 }).to(
      ".mainMenu",
      { display: "none" }
    );
  };
  return (
    <div className="mainMenu">
      <img src={textIntro} alt="textIntro" className="textIntro" />
      <div className="television">
        <img className="ecran" src={ecran} alt="ecran" />
        <img className="contourTv" src={tv} alt="tv" />
      </div>
      <div className="controllerFull">
        <img className="controllerUnpush" src={controller} alt="Controller" />
        <img
          onClick={redClick}
          onKeyDown={() => {}}
          role="presentation"
          style={{
            opacity: redStyle ? "0" : "",
          }}
          className="redButton"
          src={red}
          alt="Red Button"
        />
        <img
          onClick={greenClick}
          onKeyDown={() => {}}
          role="presentation"
          style={{
            opacity: greenStyle ? "0" : "",
          }}
          className="greenButton"
          src={green}
          alt="Green Button"
        />
      </div>
      <img className="bombBonzai" src={BombBonzai} alt="BombBonzai" />
      <img className="table" src={table} alt="table" />
      <img className="tasse" src={tasse} alt="tasse" />
      <img className="console" src={console} alt="console" />
    </div>
  );
}

export default MainMenu;
