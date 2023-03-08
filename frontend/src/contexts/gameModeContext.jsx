/* eslint-disable import/no-unresolved */
import api from "@services/api";
import propTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const gameModeContext = createContext();

function GameModeProvider({ children }) {
  const { Provider } = gameModeContext;

  const [gameMode, setGameMode] = useState(true);
  const [user, setUser] = useState();
  const [unvisited, setUnvisited] = useState([]);
  const [date, setDate] = useState();
  const navigate = useNavigate();
  const switchMode = () => {
    if (!user) {
      setGameMode(true);
      navigate("/authentication");
    } else {
      setGameMode(!gameMode);
    }
  };

  const getNotVisited = () => {
    api
      .get(`/art/notvisited/${user.id}`)
      .then((res) => setUnvisited(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (window.localStorage.getItem("userName")) {
      const player = {
        id: window.localStorage.getItem("id"),
        userName: window.localStorage.getItem("userName"),
        mail: window.localStorage.getItem("mail"),
        avatar: window.localStorage.getItem("avatar"),
        token: window.localStorage.getItem("token"),
        isAdmin: window.localStorage.getItem("isAdmin"),
      };
      setUser(player);
    }
    const todayDate = new Date();
    let todayMonth = todayDate.getMonth() + 1;
    if (Number(todayMonth) <= 10) {
      todayMonth = `0${todayMonth}`;
    }
    setDate(`${todayDate.getDate()}/${todayMonth}/${todayDate.getFullYear()}`);
  }, []);

  useEffect(() => {
    if (user) {
      getNotVisited();
    }
  }, [user]);

  return (
    <Provider
      value={{
        gameMode,
        switchMode,
        user,
        setGameMode,
        setUser,
        date,
        unvisited,
      }}
    >
      {children}
    </Provider>
  );
}

export const useGame = () => useContext(gameModeContext);
export default GameModeProvider;

GameModeProvider.propTypes = {
  children: propTypes.element.isRequired,
};
