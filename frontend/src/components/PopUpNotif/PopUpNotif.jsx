/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import "./PopUpNotif.css";
import sprayOff from "@assets/FondGraff2.png";
import sprayBomb from "@assets/spray.png";
import bomb from "@assets/spray-paint.png";
import gsap from "gsap";
import { useEffect } from "react";

function PopUpNotif({ notif }) {
  const tl = gsap.timeline();

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px").matches) {
      tl.to(".NotifBomb", { y: "-2vh", yoyo: true, repeat: 6, duration: 0.1 });
      tl.to(".NotifBomb", { y: 0, rotate: -25, duration: 0.25 }, ">");
      tl.to(".NotifBombSpray", { opacity: 1, duration: 0 }, ">");
      tl.to(".NotifSprayContainer", { width: "60vw", duration: 2 });
      tl.to(".NotifBombSpray", { width: 0, duration: 5.5 }, "<1.25");
      tl.to(".NotifText", { opacity: 1, duration: 0.2 }, "<");
      tl.to(".NotifBombSpray", { opacity: 0, duration: 0.5 }, "<.5");
      tl.to(".NotifBomb", { rotate: "0deg", duration: 0.25 }, ">-.1");
      tl.to(".NotifBomb", { opacity: 0, duration: 0.5 }, ">.25");
      tl.to(".PopUpNotif", { opacity: 0, duration: 0.5 }, ">2");
    } else {
      tl.to(".NotifBomb", { y: "-2vh", yoyo: true, repeat: 6, duration: 0.1 });
      tl.to(".NotifBomb", { y: 0, rotate: -25, duration: 0.25 }, ">");
      tl.to(".NotifBombSpray", { opacity: 1, duration: 0 }, ">");
      tl.to(".NotifSprayContainer", { width: "20.5vw", duration: 2 });
      tl.to(".NotifBombSpray", { width: 0, duration: 5.5 }, "<1.25");
      tl.to(".NotifText", { opacity: 1, duration: 0.2 }, "<");
      tl.to(".NotifBombSpray", { opacity: 0, duration: 0.5 }, "<.5");
      tl.to(".NotifBomb", { rotate: "0deg", duration: 0.25 }, ">-.1");
      tl.to(".NotifBomb", { opacity: 0, duration: 0.5 }, ">.25");
      tl.to(".PopUpNotif", { opacity: 0, duration: 0.5 }, ">2");
    }
  }, []);

  return (
    <div className="PopUpNotif">
      <div className="NotifSprayContainer">
        <img src={sprayOff} alt="SprayGraffiti" className="NotifSprayOff" />
        <p className="NotifText">{notif}</p>
      </div>
      <div className="NotifBombContainer">
        <img src={sprayBomb} alt="SprayGraffiti" className="NotifBombSpray" />
        <img src={bomb} alt="SprayGraffiti" className="NotifBomb" />
      </div>
    </div>
  );
}

PopUpNotif.propTypes = {
  notif: PropTypes.string.isRequired,
};

export default PopUpNotif;
