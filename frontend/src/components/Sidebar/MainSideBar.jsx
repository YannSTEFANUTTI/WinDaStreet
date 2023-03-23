/* eslint-disable import/no-unresolved */
import { useState, useEffect } from "react";
import api from "@services/api";
import Sidebar from "@components/Sidebar/Sidebar";
import sidebarData from "@components/Sidebar/sidebarData";
import { useGame } from "../../contexts/GameModeContext";

function MainSideBar() {
  const [score, setScore] = useState([]);
  const { user } = useGame();
  useEffect(() => {
    return (
      user &&
      api
        .get(`/score/${user.id}`)
        .then((res) => setScore(res.data[0]))
        .catch((err) => console.error(err))
    );
  }, [user]);
  return (
    <div className="sidebar">
      {sidebarData.map((el) => (
        <Sidebar
          id={el.id}
          picto={el.picto}
          shadow={el.Shadow}
          txt={el.txt}
          points={el.points && score.score}
          explore={el.explore}
          link={el.link}
        />
      ))}
    </div>
  );
}

export default MainSideBar;
