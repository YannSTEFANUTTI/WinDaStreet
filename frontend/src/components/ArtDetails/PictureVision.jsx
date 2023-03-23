/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import "./ArtDetails.css";
import { useEffect, useState } from "react";
import gsap from "gsap";
import checkIfVisited from "@services/checkIfVisited";
import CarouselArrow from "./CarouselArrow";
import "./PictureVision.css";
import { useGame } from "../../contexts/GameModeContext";

function PictureVision({ allPic, handlePictureVision, id }) {
  const [picTranslate, setPicTranslate] = useState(0);
  const [translateClick, setTranslateClick] = useState();
  const [picTranslateMulti, setPicTranslateMulti] = useState(0);
  const { unvisited, gameMode } = useGame();

  useEffect(() => {
    if (window.matchMedia("(min-width: 767px").matches) {
      setPicTranslateMulti(75);
    } else {
      setPicTranslateMulti(115);
    }
  });
  const translate = (direction) => {
    if (!translateClick) {
      setTranslateClick(true);
    }
    if (
      direction === "right" &&
      picTranslate > -picTranslateMulti * (allPic.length - 1)
    ) {
      setPicTranslate(picTranslate - picTranslateMulti);
    } else if (direction === "left" && picTranslate <= -picTranslateMulti) {
      setPicTranslate(picTranslate + picTranslateMulti);
    }
  };
  useEffect(() => {
    if (translateClick) {
      gsap.to(".PictureVisionPic", { x: `${picTranslate}vw`, duration: 1 });
    }
  }, [picTranslate]);

  return (
    <div className="PictureVision">
      <CarouselArrow myClass="PictureVision" myHandle={translate} />
      <div
        className="PictureVisionClose"
        onClick={handlePictureVision}
        onKeyDown={handlePictureVision}
        role="none"
      />
      <div className="allPicContainer">
        {allPic.map((pic) => (
          <img
            src={pic}
            alt="Oeuvre"
            className="PictureVisionPic"
            id={`${
              !checkIfVisited(unvisited, id) && !gameMode ? "pixelPicture" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default PictureVision;

PictureVision.propTypes = {
  allPic: PropTypes.arrayOf(PropTypes.string).isRequired,
  handlePictureVision: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
