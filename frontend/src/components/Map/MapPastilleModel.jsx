import { useEffect } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { Link } from "react-router-dom";

function MapPastilleModel({ id, src, txt, link }) {
  let animation = gsap.timeline();

  useEffect(() => {
    gsap.fromTo(
      `.${txt}`,
      {
        y: 0,
      },
      {
        y: "1.5vw",
        duration: 1,
        repeat: -1,
        yoyo: true,
        delay: 0,
        ease: "power1.inOut",
      }
    );
  }, []);

  const mouseEnter = () => {
    animation = gsap.timeline().to(`.${txt}`, { scale: 1.1, repeat: 0 });
  };

  function mouseLeave() {
    animation.kill();
    animation = gsap.to(`.${txt}`, { scale: 1 });
  }
  return (
    <Link to={link} state="quartier">
      <img
        id={id}
        src={src}
        alt={txt}
        className={txt}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
      />
    </Link>
  );
}

MapPastilleModel.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  txt: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default MapPastilleModel;
