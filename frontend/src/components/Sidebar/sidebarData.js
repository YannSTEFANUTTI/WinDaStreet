/* eslint-disable import/no-unresolved */
import cup from "@assets/cup.png";
import place from "@assets/place.png";
import star from "@assets/star.png";
import shadow from "@assets/shadow.png";

const sidebarData = [
  {
    id: 1,
    txt: "QUARTIERS",
    picto: place,
    Shadow: shadow,
    explore: true,
    link: `/quartier`,
  },
  {
    id: 2,
    txt: "CLASSEMENT",
    picto: cup,
    Shadow: shadow,
    explore: false,
    link: `/classement`,
  },
  {
    id: 3,
    txt: "POINTS",
    points: true,
    picto: star,
    Shadow: shadow,
    explore: false,
  },
];

export default sidebarData;
