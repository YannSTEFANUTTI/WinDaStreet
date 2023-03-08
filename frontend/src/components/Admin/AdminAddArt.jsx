/* eslint-disable import/no-unresolved */
import api from "@services/api";
import { useEffect, useRef, useState } from "react";
import "./AdminAddArt.css";
import upload from "@assets/upload-admin.png";
import PopUpNotif from "@components/PopUpNotif/PopUpNotif";
import spraySound from "@assets/spray.mp3";
import AdminTemplate from "./AdminTemplate";
import adminAddData from "./adminAddData";
import AdminButton from "./AdminButton";

function AdminAddArt() {
  const [allQuartier, setAllQuartier] = useState([]);
  const [allArtiste, setAllArtiste] = useState([]);
  const [input, setInput] = useState();
  const [disableInfo, setDisableInfo] = useState(false);
  const [data, setData] = useState(adminAddData);
  const [notif, setNotif] = useState(false);
  const inputRef = useRef();
  const spraySoundPlayer = document.getElementById("spraySound");

  const handleNotif = () => {
    if (notif === false) {
      setNotif(true);
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

  const handleChange = (e) => {
    if (
      e.target.name === "artiste_id" &&
      e.target.value !== "newArtist" &&
      e.target.type === "select-one"
    ) {
      setDisableInfo(true);
    } else if (
      e.target.name === "artiste_id" &&
      e.target.value === "newArtist"
    ) {
      setDisableInfo(false);
      const temp = data.map((dta) => {
        if (dta.id === 4) {
          return {
            ...dta,
            type: "text",
          };
        }
        return dta;
      });
      setData(temp);
    }
    if (e.target.value !== "choice") {
      setInput({ ...input, [e.target.name]: e.target.value });
    } else {
      setInput({ ...input, [e.target.name]: undefined });
    }
  };

  const postPhoto = (id) => {
    const formData = new FormData();
    formData.append("artPic", inputRef.current.files[0]);
    formData.append("body", JSON.stringify(input.name));
    api
      .post(`/photo/${id}`, formData)
      .then((res) => {
        if (res.status === 201) {
          setData();
          setInput();
          handleNotif();
        }
      })
      .catch((err) => console.error(err));
  };

  const postArt = () => {
    if (!disableInfo) {
      api
        .post("/artiste", {
          name: input.artiste_id,
          description: input.artiste_description,
        })
        .then((res) => {
          if (res.status === 201) {
            api
              .post("/art", {
                name: input.name,
                adress: input.adress,
                description: input.description,
                artiste_id: res.data.id,
                quartier_id: input.quartier_id,
              })
              .then((result) => {
                if (result.status === 201) {
                  postPhoto(result.data.id);
                }
              })
              .catch((err) => console.error(err));
          }
        })
        .catch((err) => console.error(err));
    } else {
      api
        .post("/art", {
          name: input.name,
          adress: input.adress,
          description: input.description,
          artiste_id: input.artiste_id,
          quartier_id: input.quartier_id,
        })
        .then((result) => {
          if (result.status === 201) {
            postPhoto(result.data.id);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    api
      .get("/quartier")
      .then((res) => {
        const temp = res.data;
        temp.unshift({ id: "choice", quartier_name: "Choisir un Quartier" });
        setAllQuartier(res.data);
      })
      .catch((err) => console.error(err));
    api
      .get("/artiste")
      .then((res) => {
        const temp = res.data;
        temp.unshift({ id: "newArtist", name: "Ajouter un Artiste" });
        temp.unshift({ id: "choice", name: "Choisir un Artiste" });
        setAllArtiste(temp);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!data) {
      setData(adminAddData);
    }
  }, [data]);

  return (
    <AdminTemplate title="AJOUTER UNE OEUVRE">
      <audio id="spraySound" src={spraySound}>
        <track kind="captions" />
      </audio>
      {notif && <PopUpNotif notif="L'Oeuvre a bien été ajoutée" />}
      <div className="AdminAddArt">
        <label htmlFor="artPic" className="AdminUploadPic">
          <input
            id="artPic"
            type="file"
            name="artPic"
            ref={inputRef}
            required
            accept="image/*;capture=camera"
          />
          <img src={upload} alt="upload" />
        </label>
        <div className="AdminAddArtInputContainer">
          {data &&
            data.map((el) => (
              <label htmlFor={el.name} key={el.id} className="AdminAddArtLabel">
                {el.label}
                {el.type === "select" ? (
                  <select
                    name={el.name}
                    id={el.id}
                    onChange={handleChange}
                    type="select"
                  >
                    {el.name === "artiste_id"
                      ? allArtiste.map((artiste) => (
                          <option value={artiste.id}>{artiste.name}</option>
                        ))
                      : allQuartier.map((quartier) => (
                          <option value={quartier.id}>
                            {quartier.quartier_name}
                          </option>
                        ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name={el.name}
                    id={el.id}
                    value={input && input[el.name]}
                    onChange={handleChange}
                    disabled={el.id === 5 && disableInfo}
                    required={el.id === 5 ? disableInfo : true}
                  />
                )}
              </label>
            ))}
          <AdminButton content="VALIDER" myHandle={postArt} />
        </div>
      </div>
    </AdminTemplate>
  );
}

export default AdminAddArt;
