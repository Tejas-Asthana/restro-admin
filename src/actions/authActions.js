import axios from "axios";

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

import { returnErrors } from "./errorActions";

// setup config/header
export const generateTokenConfig = (getState, email) => {
  // get token from app state
  let token = getState().auth.token;

  // headers for get request
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // if token is present, then add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

// check for token & load user
// this method will be called whenever you want to access a private page which requires a token
export const loadUser = () => (dispatch, getState) => {
  // dispatch user loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/privatePage", generateTokenConfig(getState))
    .then((res) => dispatch({ type: USER_LOADED, payload: res.data }))
    .catch((err) => {
      // throw err;
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// register user
export const registerUser =
  ({ username, email, password }, history = null, url = null) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // req body
    const body = JSON.stringify({ username, email, password });
    // console.log(body);

    axios
      .post("/api/registerUser", body, config)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
        history.push("/" + url);
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log(body);
        dispatch(
          returnErrors(err.response.data, err.response.status, REGISTER_FAIL)
        );
        dispatch({ type: REGISTER_FAIL });
      });
  };

// login user
export const loginUser =
  ({ email, password }, history = null, url = null) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // req body
    const body = JSON.stringify({ email, password });
    // console.log(body);

    axios
      .post("http://localhost:5000/api/authUser", body, config)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        history.push("/" + url);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(body);
        dispatch(
          returnErrors(err.response.data, err.response.status, LOGIN_FAIL)
        );
        dispatch({ type: LOGIN_FAIL });
      });
  };

// logout
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
