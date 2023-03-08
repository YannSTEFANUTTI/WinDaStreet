/* eslint-disable import/no-unresolved */
import gsap from "gsap";
import PropTypes from "prop-types";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useGame } from "../../contexts/gameModeContext";

function Sidebar({ id, picto, shadow, txt, points, explore, link }) {
  const { gameMode } = useGame();

  useEffect(() => {
    const mm = gsap.matchMedia();
    // eslint-disable-next-line no-unused-expressions
    gameMode
      ? mm.add("(max-width: 649px)", () => {
          gsap.fromTo(
            "#POINTS",
            { width: "10vw", duration: 0.5, y: "-4vw" },
            { width: "13.5vw", duration: 0.5, y: 0 }
          );
        })
      : mm.add("(max-width: 649px)", () => {
          gsap.fromTo(
            "#POINTS",
            { width: "13.5vw", y: "4vw", opacity: 0.5 },
            { width: "10vw", y: 0, opacity: 1 }
          );
        });
  }, [gameMode]);

  gsap.timeline().fromTo(
    ".eachElementSidebar h1",
    {
      scale: 0,
    },
    {
      duration: 0.5,
      scale: 1,
      ease: "back",
    }
  );

  let animation = gsap.timeline();

  const mouseEnter = (pictoId) => {
    if (gameMode && pictoId === 1) {
      animation.kill();
      animation = gsap
        .timeline()
        .to(`.golden1`, { y: "-1vw", repeat: -1, yoyo: true, delay: 0 });
    }
    if (!gameMode) {
      animation.kill();
      animation = gsap
        .timeline()
        .to(`.golden${id}`, { y: "-1vw", repeat: -1, yoyo: true, delay: 0 });
    }
  };

  function mouseLeave() {
    animation.kill();
    animation = gsap.to(`.golden${id}`, { y: 0 });
  }

  return (
    <div
      onMouseEnter={() => mouseEnter(id)}
      onMouseLeave={() => mouseLeave(id)}
      onClick={() => mouseLeave(id)}
      role="presentation"
      style={gameMode && !explore ? { opacity: "0.5" } : { opacity: "1" }}
      className={`eachElementSidebar full${txt}`}
      id="place"
    >
      {id === 1 || !gameMode ? (
        <Link to={link} className="goldenLink">
          <img
            className={`goldenPictures golden${id}`}
            id={txt}
            src={picto}
            alt={txt}
          />
        </Link>
      ) : (
        <img
          className={`goldenPictures golden${id}`}
          id={txt}
          src={picto}
          alt={txt}
        />
      )}

      <img className="shadows" src={shadow} alt="shadow" />
      <h1 style={gameMode ? { display: "none" } : { opacity: "1" }}>
        {points}
      </h1>
      <p id={`txt${id}`}>{txt}</p>
      {id !== 3 && <hr />}
    </div>
  );
}

Sidebar.propTypes = {
  id: PropTypes.number.isRequired,
  picto: PropTypes.string.isRequired,
  shadow: PropTypes.string.isRequired,
  txt: PropTypes.string.isRequired,
  explore: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
};

export default Sidebar;
