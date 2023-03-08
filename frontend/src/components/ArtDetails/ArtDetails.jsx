/* eslint-disable import/no-unresolved */
import "./ArtDetails.css";
import TemplateWindows from "@components/TemplateWindows/TemplateWindows";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import add from "@assets/add.png";
import checkIfVisited from "@services/checkIfVisited";
import PictureVision from "./PictureVision";
import CarouselArrow from "./CarouselArrow";
import ArtDetailsText from "./ArtDetailsText";
import ArtDetailsComments from "./ArtDetailsComments";
import { useGame } from "../../contexts/gameModeContext";

function ArtDetails() {
  const [picTranslate, setPicTranslate] = useState(0);
  const [translateClick, setTranslateClick] = useState();
  const [isHover, setIsHover] = useState("");
  const [pictureVisionDisplay, setPictureVisionDisplay] = useState(false);
  const [isComments, setIsComments] = useState(false);
  const [commentsView, setCommentsView] = useState("Voir les commentaires");
  const { unvisited, gameMode } = useGame();
  const location = useLocation();
  const artDetails = location.state;
  const artPictures = artDetails.photo.split(",");

  const handleComments = () => {
    if (!isComments) {
      setCommentsView("Voir les détails");
    } else {
      setCommentsView("Voir les commentaires");
    }
    setIsComments(!isComments);
  };

  const handlePictureVision = () => {
    setPictureVisionDisplay(!pictureVisionDisplay);
    setIsHover("");
  };

  const handleIsHover = () => {
    if (isHover === "" && pictureVisionDisplay === false) {
      setIsHover("OpenPictureVisionHover");
    } else {
      setIsHover("");
    }
  };

  const translate = (direction) => {
    if (!translateClick) {
      setTranslateClick(true);
    }
    if (
      direction === "right" &&
      picTranslate > -100 * (artPictures.length - 1)
    ) {
      setPicTranslate(picTranslate - 100);
    } else if (direction === "left" && picTranslate <= -100) {
      setPicTranslate(picTranslate + 100);
    }
  };

  useEffect(() => {
    if (translateClick) {
      gsap.to(".ArtDetailsPic", { x: `${picTranslate}%`, duration: 1 });
    }
  }, [picTranslate]);

  return (
    <TemplateWindows title={artDetails.name} back>
      {pictureVisionDisplay && (
        <PictureVision
          allPic={artPictures}
          handlePictureVision={handlePictureVision}
          id={artDetails.id}
        />
      )}
      <div className="ArtDetailsContainer">
        <div className="ArtDetailsLeft">
          <div className="ArtDetailsPicturesContainer">
            <CarouselArrow myClass="ArtDetails" myHandle={translate} />
            <div className={`OpenPictureVision ${isHover}`}>
              <div
                className="OnePictureHover"
                onMouseOver={handleIsHover}
                onFocus={handleIsHover}
                onMouseOut={handleIsHover}
                onBlur={handleIsHover}
                onClick={handlePictureVision}
                onKeyDown={handlePictureVision}
                role="none"
              />
            </div>
            <div className="ArtDetailsPictures">
              {artPictures.map((pic) => (
                <img
                  src={pic}
                  alt="Oeuvre"
                  className="ArtDetailsPic"
                  id={`${
                    !checkIfVisited(unvisited, artDetails.id) && !gameMode
                      ? "pixelPicture"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>
          <div
            className="ArtDetailsCommentsContainer"
            onClick={handleComments}
            onKeyDown={handleComments}
            role="none"
          >
            <img src={add} alt="Choose" />
            <p>{commentsView}</p>
          </div>
        </div>
        {isComments ? (
          <ArtDetailsComments id={artDetails.id} />
        ) : (
          <ArtDetailsText artDetails={artDetails} />
        )}
      </div>
    </TemplateWindows>
  );
}

export default ArtDetails;
