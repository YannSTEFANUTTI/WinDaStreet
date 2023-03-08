import React from "react";
import moreinfo from "../../assets/yellow-cross.png";
import "./BtnmoreInfos.css";

function BtnmoreInfos() {
  return (
    <div className="moreinfo">
      <img className="moreinfoimg" src={moreinfo} alt="moreinfos" />
      <p>Découvrir</p>
    </div>
  );
}

export default BtnmoreInfos;
