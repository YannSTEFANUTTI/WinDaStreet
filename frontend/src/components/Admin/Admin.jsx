/* eslint-disable import/no-unresolved */
import "./Admin.css";
import { useNavigate } from "react-router";
import { useGame } from "../../contexts/gameModeContext";
import AdminAllUser from "./AdminAllUser";
import AdminRequest from "./AdminRequest";
import AdminAddArt from "./AdminAddArt";

function Admin() {
  const { user } = useGame();
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="Admin">
      {user && (
        <div className="AdminHeaderContainer">
          <div
            className="AdminHeaderLogo"
            onClick={goHome}
            onKeyDown={goHome}
            role="none"
          />
          <div className="AdminHeaderInfo">
            <p>ADMINISTRATEUR</p>
            <p>{user.userName}</p>
            <p>{user.mail}</p>
          </div>
        </div>
      )}
      <div className="AdminGestionContainer">
        <AdminAllUser />
        <AdminRequest />
        <AdminAddArt />
      </div>
    </div>
  );
}

export default Admin;
