import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { Link } from "react-router-dom";

const GetArticles = () => {
  const [content, setContent] = useState([]);
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    UserService.getArticles().then(
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

  const handleDelete = (article_id) => {
     
    
     UserService.deleteArticle(article_id).then(
        res=>{
        setContent(content.filter(content=>content.id!==article_id))
        })
      }
    
  if(!currentUser){
    return(
    <Redirect to="/login"/>
    )}
  return (
    <>
    <Link to="/addarticle">Add Article</Link>
    <div className="container">
     {content ? (
        content.map((p,key)=>
        <> 
          <header key={key} className="jumbotron">
          <h1 >{p.title}</h1>
          <p>{p.body}</p>
        
          
              <div className="form-group">
                <button onClick={() => handleDelete(p.id)}className="btn btn-primary btn-block">Delete</button>
              </div>
  
          </header>
        </>
        )):
        
        (
        
          <h1>No content here</h1>
        
        )}
      
    </div>
    </>
  );
};

export default GetArticles;
