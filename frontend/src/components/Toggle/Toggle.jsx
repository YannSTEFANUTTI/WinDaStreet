/* eslint-disable import/no-unresolved */
import "./Toggle.css";
import toggle from "@assets/buttonToggle-white.png";
import PropTypes from "prop-types";

function Toggle({ myHandle, myVar, isNavbar, myClass }) {
  return (
    <div className={`Toggle  ${myClass}`}>
      <div
        className="ToggleSwitch"
        onClick={myHandle}
        onKeyDown={myHandle}
        role="none"
      >
        <img
          src={toggle}
          alt="toggle"
          className={myVar ? "LeftSwitch" : "RightSwitch"}
        />
      </div>
      {isNavbar && <p className="nameMode">{myVar ? "Explore" : "Game"}</p>}
    </div>
  );
}

export default Toggle;

Toggle.propTypes = {
  myHandle: PropTypes.func.isRequired,
  myVar: PropTypes.bool.isRequired,
  isNavbar: PropTypes.bool.isRequired,
  myClass: PropTypes.string.isRequired,
};
