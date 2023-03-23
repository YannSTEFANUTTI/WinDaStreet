/* eslint-disable import/no-unresolved */
import { useState, useEffect } from "react";
import api from "@services/api";
import TemplateWindows from "@components/TemplateWindows/TemplateWindows";
import ClassEachPeople from "./ClassEachPeople";
import Toggle from "../Toggle/Toggle";
import AvatarArray from "../CreateAccount/Avatar";
import { useGame } from "../../contexts/GameModeContext";
import "./Classements.css";

function Classements() {
  const [isGeneral, setIsGeneral] = useState(false);
  const [friends, setFriends] = useState();
  const [score, setScore] = useState();

  const handlGeneral = () => {
    setIsGeneral(!isGeneral);
  };

  const { user } = useGame();

  useEffect(() => {
    if (user) {
      api
        .get(`/friend/${user.id}`)
        .then((res) => {
          setFriends(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      api
        .get(`/score`)
        .then((res) => {
          setScore(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <TemplateWindows title="Classement">
      <div className="classements">
        <div className="classHeader">
          <h1
            style={isGeneral ? { opacity: "1" } : { display: "none" }}
            className="classTitle"
          >
            FRIENDS
          </h1>
          <h1
            style={!isGeneral ? { opacity: "1" } : { display: "none" }}
            className="classTitle"
          >
            GENERAL
          </h1>
          <div className="classToggle">
            <Toggle
              myHandle={handlGeneral}
              myVar={isGeneral}
              myClass="classementToggle"
            />
          </div>
        </div>
        <div className="classCategories">
          <h6>RANG</h6>
          <div className="classPseudoPoints">
            <h6>PSEUDO</h6>
            <h6>POINTS</h6>
          </div>
        </div>
        {isGeneral
          ? friends && (
              <div className="allPeople">
                {friends.map((el, index) => (
                  <ClassEachPeople
                    rang={index}
                    name={el.userName}
                    points={el.score}
                    avatar={AvatarArray[el.avatar]}
                    isGeneral={isGeneral}
                  />
                ))}
              </div>
            )
          : score && (
              <div className="allPeople">
                {score.map((el, index) => (
                  <ClassEachPeople
                    rang={index}
                    name={el.userName}
                    points={el.score}
                    avatar={AvatarArray[el.avatar]}
                    isGeneral={isGeneral}
                  />
                ))}
              </div>
            )}
      </div>
    </TemplateWindows>
  );
}

export default Classements;
