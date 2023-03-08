/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useRef } from "react";
import api from "@services/api";
import checkIfVisited from "@services/checkIfVisited";
import BtnmoreInfos from "./BtnmoreInfos";
import traitblanc from "../../assets/trait.png";
import capture from "../../assets/camera-white.png";
import { useGame } from "../../contexts/gameModeContext";

function OneArt({ art, handleNotif }) {
  const inputRef = useRef();
  const { user, date, unvisited, gameMode } = useGame();

  const handleInput = () => {
    if (inputRef.current.files.length > 0) {
      const formData = new FormData();
      formData.append("userPicture", inputRef.current.files[0]);
      formData.append(
        "body",
        JSON.stringify({
          user_id: user.id,
          art_id: art.id,
          date,
        })
      );
      api
        .post("/visitedrequest", formData)
        .then((res) => {
          if (res.status === 201) {
            handleNotif();
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div key={art.id} className="artcontainer">
      <Link to="/artdetail" state={art} className="artFirstPictureContainer">
        <img
          src={art.photo.split(",")[0]}
          alt="Oeuvre"
          className="artFirstPicture"
          id={`${
            !checkIfVisited(unvisited, art.id) && !gameMode
              ? "pixelPicture"
              : ""
          }`}
        />

        <div className="describe">
          <p className="nomdelloeuvre">
            <span>Oeuvre :</span> {art.name}
          </p>
          <p className="nomdelartiste">
            <span> Artiste : </span> {art.artiste}
          </p>
          <p className="adressdeloeuvre">
            <span>Lieu : </span> {art.adress}
          </p>
        </div>
        <div className={`${!gameMode ? "flex2" : "flex2 flex21"}`}>
          <div className="button">
            <BtnmoreInfos />
          </div>
        </div>
      </Link>
      {!gameMode && (
        <>
          <img src={traitblanc} alt="traitblanc" className="traitblanc1" />
          <div className="imageaddcontainer">
            <label htmlFor={`userPicture${art.id}`} className="labelImageAdd">
              <input
                type="file"
                id={`userPicture${art.id}`}
                name="userPicture"
                ref={inputRef}
                onChange={handleInput}
                accept="image/*;capture=camera"
              />
              <img className="imgcapture" src={capture} alt="aveugle" />
            </label>
            <p>Capturer</p>
          </div>
        </>
      )}
    </div>
  );
}

OneArt.propTypes = {
  art: PropTypes.shape({
    adress: PropTypes.string,
    artiste: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
  handleNotif: PropTypes.func.isRequired,
};

export default OneArt;
