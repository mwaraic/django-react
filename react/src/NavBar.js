import React, { useState, useEffect } from "react";
import AuthService from "./services/auth.service";
import EventBus from "./common/EventBus";
import { Link } from "react-router-dom";

export const NavBar=()=>{

const [currentUser, setCurrentUser] = useState(undefined);

useEffect(() => {
  const user = AuthService.getCurrentUser();

  if (user) {
    setCurrentUser(user);
  }

  EventBus.on("logout", () => {
    logOut();
  });

  return () => {
    EventBus.remove("logout");
  };
}, []);

const logOut = () => {
  AuthService.logout();
  setCurrentUser(undefined);
};


return(

<div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/login"} className="navbar-brand">
          Django-Test
        </Link>
        <div className="navbar-nav mr-auto">

          {currentUser && (
            <li className="nav-item">
              <Link to={"/main"} className="nav-link">
                Article
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.user_name}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
</div>)
        }