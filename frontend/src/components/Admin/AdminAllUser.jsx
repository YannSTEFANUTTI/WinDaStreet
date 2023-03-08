/* eslint-disable import/no-unresolved */
import { useEffect, useState } from "react";
import api from "@services/api";
import AdminTemplate from "./AdminTemplate";
import "./AdminAllUser.css";

function AdminAllUser() {
  const [allUser, setAllUser] = useState([]);

  const getAllUser = () => {
    api
      .get("/user")
      .then((res) => setAllUser(res.data))
      .catch((err) => console.error(err));
  };

  const deleteUser = (id) => {
    api
      .delete(`/user/${id}`)
      .then((res) => {
        if (res.status === 200) {
          getAllUser();
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <AdminTemplate title={`${allUser.length} UTILISATEURS`}>
      <div className="AdminAllUserContainer">
        {allUser.map((usr) => (
          <div className="AdminUserContainer">
            <div className="AdminUserInfo">
              <p>{usr.userName}</p>
              <p>{usr.mail}</p>
            </div>
            <div
              className="AdminDeleteUser"
              onClick={() => deleteUser(usr.id)}
              onKeyDown={() => deleteUser(usr.id)}
              role="none"
            />
          </div>
        ))}
      </div>
    </AdminTemplate>
  );
}

export default AdminAllUser;
