import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const BoardUser = () => {
  const [content, setContent] = useState([]);
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 403) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);
  if(!currentUser){
    return(
    <Redirect to="/login"/>
    )}
  return (
    <div className="container">
     
        {content.map((p,key)=>
        <> 
          <header key={key} className="jumbotron">
          <h1 >{p.title}</h1>
          <p>{p.body}</p>
          </header>
        </>
        )}
      
    </div>
  );
};

export default BoardUser;
