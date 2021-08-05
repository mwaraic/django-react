import React from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();


  if(!currentUser){
    return(
    <Redirect to="/login"/>
    )}
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.user_name}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.access.substring(0, 20)} ...{" "}
        {currentUser.access.substr(currentUser.access.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
    </div>
  );
};

export default Profile;
