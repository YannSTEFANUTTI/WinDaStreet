/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import "./Classements.css";

function ClassEachPeople({ rang, name, points, avatar }) {
  return (
    <div className="eachPeople">
      <p className="rangNumber">{rang + 1}</p>
      <div className="classProfil">
        <div className="profilPseudoPicture">
          <img src={avatar} alt="avatar" />
          <p>{name}</p>
        </div>
        <p>{points}</p>
      </div>
    </div>
  );
}

ClassEachPeople.propTypes = {
  rang: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  points: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default ClassEachPeople;
