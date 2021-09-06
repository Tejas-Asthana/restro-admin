import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import store from "../store/store";

import { REGISTER_FAIL } from "../actions/types";

import Forms from "../components/form";
import { loadUser, registerUser } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";

function Signup(props) {
  let [errorMsg, setErrorMsg] = useState("");

  // will run only once
  // useEffect(() => {
  //   // store.dispatch(loadUser());
  //   props.loadUser();
  // }, []);

  // will run after every time component's state is changed
  useEffect(() => {
    if (props.error.id === REGISTER_FAIL) {
      setErrorMsg(props.error.msg.msg);
    } else setErrorMsg("");
  });

  let [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    e.preventDefault();
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    try {
      e.preventDefault(); // will prevent from page to reload

      // attempt to register a user
      props.registerUser(signupData, props.history, "login");
      // clear all the errors after register
      props.clearErrors();
      // console.log(props.error);
    } catch (err) {
      throw ("Here's what went wrong: ", err);
    }
  }

  return (
    <>
      {props.isAuthenticated ? (
        props.history.push("/profile")
      ) : (
        <>
          <div className="jumbotron text-center text-dark h1">
            Welcome, Signup !
            <br />
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
          </div>
          <div className="container">
            {errorMsg ? (
              <div className="alert alert-danger" role="alert">
                {errorMsg}
              </div>
            ) : null}
            <Forms
              action="/api/registerUser"
              method="POST"
              username={{
                show: true,
                value: signupData.username,
                isRequired: true,
              }}
              email={{ show: true, value: signupData.email, isRequired: true }}
              password={{
                show: true,
                value: signupData.password,
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

export default connect(mapStateToProps, {
  registerUser,
  loadUser,
  clearErrors,
})(Signup);
