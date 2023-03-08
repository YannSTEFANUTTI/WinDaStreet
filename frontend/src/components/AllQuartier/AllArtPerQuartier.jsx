/* eslint-disable import/no-unresolved */
import { useLocation, useParams } from "react-router-dom";
import PopUpNotif from "@components/PopUpNotif/PopUpNotif";
import spraySound from "@assets/spray.mp3";
import "./AllArtPerQuartier.css";
import { useState, useEffect } from "react";
import api from "../../services/api";
import TemplateWindows from "../TemplateWindows/TemplateWindows";
import OneArt from "./OneArt";

function AllArtPerQuartier() {
  const { id } = useParams();
  const [artQuartier, setArtQuartier] = useState();
  const [title, setTitle] = useState();
  const location = useLocation();
  const condition = location.state;
  const [notif, setNotif] = useState(false);
  const spraySoundPlayer = document.getElementById("spraySound");

  const handleNotif = () => {
    if (notif === false) {
      setNotif("Votre photo a été envoyée");
      spraySoundPlayer.play();
    }
  };

  useEffect(() => {
    if (notif) {
      setTimeout(() => {
        setNotif(false);
        spraySoundPlayer.currentTime = 0;
      }, 5000);
    }
  }, [notif]);

  useEffect(() => {
    api
      .get(`/art/getby/${id}?wichcolumn=${condition}`)
      .then((res) => setArtQuartier(res.data))
      .catch((err) => console.error(err));
  }, [location]);

  useEffect(() => {
    if (artQuartier) {
      if (condition === "quartier") {
        setTitle(artQuartier[0].quartier_name);
      } else {
        setTitle(artQuartier[0].artiste);
      }
    }
  }, [artQuartier]);
  return (
    <div>
      <audio id="spraySound" src={spraySound}>
        <track kind="captions" />
      </audio>
      {notif && <PopUpNotif notif={notif} />}
      {artQuartier && (
        <TemplateWindows title={title} back="true">
          <div className="allartquartier">
            <div className="artinquartier">
              {artQuartier.map((e) => (
                <OneArt art={e} handleNotif={handleNotif} />
              ))}
            </div>
          </div>
        </TemplateWindows>
      )}
    </div>
  );
}

export default AllArtPerQuartier;
