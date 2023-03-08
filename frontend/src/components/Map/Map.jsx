import React from "react";
// eslint-disable-next-line import/no-unresolved
import MapPastilleModel from "@components/Map/MapPastilleModel";
import map from "../../assets/Map.png";
import "./Map.css";
import MapData from "./MapData";

function Map() {
  return (
    <div className="mapContainer">
      <img src={map} alt="map" className="map" />
      {MapData.map((el) => (
        <MapPastilleModel id={el.id} src={el.img} txt={el.txt} link={el.link} />
      ))}
    </div>
  );
}

export default Map;
