import React, { useState } from "react";
import "./CreateAccount.css";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import cross from "../../assets/delete.png";
import backarrow from "../../assets/back-arrow.png";
import AvatarArray from "./Avatar";
import trait from "../../assets/trait.png";

function CreateAccount() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }
  const myHandleExit = () => {
    setIsOpen(false);
  };

  const myHandleNext = () => {
    setActiveIndex(activeIndex + 1);
    if (activeIndex >= AvatarArray.length - 1) {
      setActiveIndex(0);
    }
  };

  const myHandlePreview = () => {
    setActiveIndex(activeIndex - 1);
    if (activeIndex <= 0) {
      setActiveIndex(AvatarArray.length - 1);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      userName: e.target.userName.value,
      mail: e.target.mail.value,
      password: e.target.password.value,
      avatar: activeIndex,
    };
    api
      .post("/user/", data)
      .then((res) => {
        if (res.status === 200) {
          api
            .post(`score/${res.data.id}`)
            .then((result) => result)
            .catch((err) => console.error(err));
          navigate("/authentication");
          setIsOpen(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setError("Email deja utilisé");
        } else if (err.response.status === 400) {
          setError(err.response.data.error);
        }
      });
  };
  return (
    <div className="CreateAccount">
      <div className="CreateAccount_container">
        <div className="CreateAccount_header">
          <h2 className="CreateAccount_header_Title">Creer un compte</h2>
          <div className="head_btn_CreateAccount" role="button" tabIndex={0}>
            <img
              src={backarrow}
              alt="btn for back "
              className="btnback_Createaccount"
            />
            <img src={trait} alt="separation" className="Createaccount_trait" />
            <img
              src={cross}
              alt="btn exit"
              className="btnExit_Createaccount"
              onClick={myHandleExit}
              onKeyDown={myHandleExit}
              role="none"
            />
          </div>
        </div>
        <div className="CreateAccount_content">
          <div className="chooseAvatar">
            <p className="CreateAccount_P">choisis ton avatar</p>
            <div className="avatar">
              <img
                src={backarrow}
                alt="btn preview"
                className="btn_preview"
                onClick={myHandlePreview}
                onKeyDown={myHandlePreview}
                role="none"
              />
              <div className="carousel">
                <div
                  className="inner"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {AvatarArray.map((avatar) => (
                    <img src={avatar} alt="avatar" className="carousel-Item" />
                  ))}
                </div>
              </div>
              <img
                src={backarrow}
                alt="btn after"
                className="btn_next"
                onClick={myHandleNext}
                onKeyDown={myHandleNext}
                role="none"
              />
            </div>
          </div>
          <form className="CreateAccount_Form" onSubmit={handleSubmit}>
            <div className="CreateAccount_User">
              <label htmlFor="userName">Pseudo:</label>
              <input type="text" placeholder="Pseudo..." name="userName" />
            </div>
            <div className="CreateAccount_Email">
              <label htmlFor="mail">Email:</label>
              <input type="email" placeholder="Email..." name="mail" />
            </div>
            <div className="CreateAccount_Password">
              <label htmlFor="password">mot de passe:</label>
              <input
                type="password"
                placeholder="Password..."
                name="password"
              />
            </div>
            <div className="CreateAccount_footer">
              <p className="error">{error}</p>
              <button type="submit" className="btn_CreateAccount">
                valider
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
