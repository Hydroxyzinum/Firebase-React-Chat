import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE } from "../util/links";
import { Context } from "..";
import { useAuthState } from "react-firebase-hooks/auth";

export const NavBar = () => {
  const { auth } = useContext(Context);

  const [user] = useAuthState(auth);

  return (
    <div className="header">
      <div className="btn-container">
        {user ? (
          <button onClick={() => auth.signOut()} className="btn exit-btn">Выход</button>
        ) : (
          <Link to={LOGIN_ROUTE}>
            <button className="btn login-btn">Логин</button>
          </Link>
        )}
      </div>
    </div>
  );
};
