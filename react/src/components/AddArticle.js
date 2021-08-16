import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom";
import UserService from "../services/user.service";
import { Redirect } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};


const AddArticle = (props) => {
  const currentUser = AuthService.getCurrentUser();
  const form = useRef();
  const checkBtn = useRef();
  const history=useHistory();
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangeTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const onChangeBody = (e) => {
    const Body = e.target.value;
    setBody(Body);
  };

  const handleArticle = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      UserService.addArticle(currentUser.id,title, email, body).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          history.push('/main')
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };
  if(!currentUser){
    return(
    <Redirect to="/login"/>
    )}
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleArticle} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <Input
                  type="text"
                  className="form-control"
                  name="title"
                  value={title}
                  onChange={onChangeTitle}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="body">Body</label>
                <Input
                  type="text"
                  className="form-control"
                  name="body"
                  value={body}
                  onChange={onChangeBody}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Add</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default AddArticle;
