/* eslint-disable consistent-return */
/* eslint-disable no-empty */
import React, { useState } from "react";
import "./Authentification.css";
import { NavLink, useNavigate } from "react-router-dom";
import cross from "../../assets/delete.png";
import { useGame } from "../../contexts/gameModeContext";
import api from "../../services/api";

function Authentification() {
  const [error, setError] = useState("");
  const { setUser, setGameMode } = useGame();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      mail: e.target[0].value,
      password: e.target[1].value,
    };
    api
      .post("/user/login", data)
      .then((res) => {
        if (res.status === 200) {
          window.localStorage.setItem("mail", e.target[0].value);
          window.localStorage.setItem("userName", res.data.user.userName);
          window.localStorage.setItem("id", res.data.user.id);
          window.localStorage.setItem("isAdmin", res.data.user.isAdmin);
          window.localStorage.setItem("token", res.data.token);
          window.localStorage.setItem("avatar", res.data.user.avatar);
          setUser({
            id: res.data.user.id,
            userName: res.data.user.userName,
            mail: e.target[0].value,
            avatar: res.data.user.avatar,
            isAdmin: res.data.user.isAdmin,
            token: res.data.token,
          });
          setGameMode(false);
          navigate("/");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setError("Email ou mot de passe incorrect");
        }
      });
  };

  const myHandleExit = () => {
    navigate("/");
  };

  return (
    <div className="Auth">
      <div className="Auth_Container">
        <div className="Auth_Container_header">
          <h2>CONNEXION</h2>
          <div
            className="btnExit_Auth"
            onClick={myHandleExit}
            role="button"
            onKeyDown={myHandleExit}
            tabIndex={0}
          >
            <img src={cross} alt="btn exit" className="closingCross" />
          </div>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email..."
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password..."
            />
          </div>
          <div className="btn_auth_submit">
            <p className="error">{error}</p>
            <button type="submit">valider</button>
          </div>
        </form>
      </div>
      <div className="signup">
        <h3>Vous n'avez pas de compte ?</h3>
        <NavLink to="/createaccount" className="link_Signup">
          Creer un compte
        </NavLink>
      </div>
    </div>
  );
}

export default Authentification;
