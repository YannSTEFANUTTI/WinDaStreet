/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import { useEffect } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import Navbar from "@components/Navbar/Navbar";
import MainSideBar from "@components/Sidebar/MainSideBar";
import AllQuartiers from "@components/AllQuartier/AllQuartiers";
import "./App.css";
import MainMobile from "@components/MainMobile/MainMobile";
import MainMenu from "@components/MainMenu/MainMenu";
import Map from "@components/Map/Map";
import Avatar from "@components/Avatar/Avatar";
import AllArtPerQuartier from "@components/AllQuartier/AllArtPerQuartier";
import CreateAccount from "@components/CreateAccount/CreateAccount";
import Authentication from "@components/authentification/Authentification";
import { Route, Routes } from "react-router-dom";
import Admin from "@components/Admin/Admin";
import ArtDetails from "@components/ArtDetails/ArtDetails";
import Classements from "@components/Classements/Classements";
import Toggle from "@components/Toggle/Toggle";
import { useGame } from "./contexts/gameModeContext";

function App() {
  const { gameMode, switchMode, user } = useGame();

  gsap.registerPlugin(Draggable);
  useEffect(() => {
    Draggable.create(".mapContainer", {
      type: "scroll",
      inertia: true,
      edgeResistance: 1,
    });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/intro"
          element={
            <>
              <MainMobile />
              <MainMenu />
            </>
          }
        />
      </Routes>
      <Navbar />
      <Map />
      {window.matchMedia("(max-width: 767px").matches && (
        <Toggle
          myHandle={switchMode}
          myVar={gameMode}
          isNavbar
          myClass="mobileToggle"
        />
      )}
      <MainSideBar />
      {user && <Avatar />}
      <div>
        <Routes>
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/quartier" element={<AllQuartiers />} />
          <Route path="/quartier/:id" element={<AllArtPerQuartier />} />
          <Route path="/classement" element={<Classements />} />
          <Route path="/artdetail" element={<ArtDetails />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
