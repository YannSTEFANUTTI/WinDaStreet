/* eslint-disable import/no-unresolved */
import centre from "../../assets/pastille-centre.png";
import bastide from "../../assets/pastille-labastide.png";
import maritime from "../../assets/pastille-maritime.png";
import sud from "../../assets/pastille-sud.png";

const MapData = [
  {
    id: 1,
    txt: "maritime",
    img: maritime,
    link: `/quartier/1`,
  },
  { id: 2, txt: "centre", img: centre, link: `/quartier/2` },
  { id: 3, txt: "sud", img: sud, link: `/quartier/3` },
  { id: 4, txt: "bastide", img: bastide, link: `/quartier/4` },
];

export default MapData;
