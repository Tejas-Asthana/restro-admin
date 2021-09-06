import React, { useState, useEffect } from "react";
import { Link, history } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { LOGIN_FAIL } from "../actions/types";
import { loadUser, loginUser } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";

import Forms from "../components/form";

function Login(props) {
  let [loginData, setLoginData] = useState({
    email: "test1@email",
    password: "test1",
  });
  let [errorMsg, setErrorMsg] = useState(null);
  // let history = useHistory();

  useEffect(() => {
    props.loadUser();
  }, []);

  useEffect(() => {
    if (props.error.id === LOGIN_FAIL) {
      setErrorMsg(props.error.msg.msg);
    } else setErrorMsg("");
  });

  function handleChange(e) {
    e.preventDefault();
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // attempt to register a user
    props.loginUser(loginData, props.history, "profile");
    props.clearErrors();
  }

  return (
    <>
      {props.isAuthenticated ? (
        props.history.push("/profile")
      ) : (
        <>
          <div className="jumbotron text-center text-dark h1">
            Welcome back! <br /> Login
            <br />
            <Link to="/signup">
              <button className="btn">Signup</button>
            </Link>
          </div>
          <div className="container">
            {errorMsg ? (
              <div className="alert alert-danger" role="alert">
                {errorMsg}
              </div>
            ) : null}
            <Forms
              action="/api/authUser"
              method="POST"
              username={{ show: false, isRequired: false }}
              email={{ show: true, value: loginData.email, isRequired: true }}
              password={{
                show: true,
                value: loginData.password,
                isRequired: true,
              }}
              checkbox={{ show: true }}
              onChangeMethod={(e) => handleChange(e)}
              handleSubmitMethod={(e) => handleSubmit(e)}
            />
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default withRouter(
  connect(mapStateToProps, {
    loginUser,
    loadUser,
    clearErrors,
  })(Login)
);
