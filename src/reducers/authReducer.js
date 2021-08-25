import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: null,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        // user: action.payload,
      };
    case LOGIN_SUCCESS:
      // in my app, I have created 2 different routes for login & signup,
      // so might have to change this later
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case REGISTER_SUCCESS:
      // console.log("reducer fired");
      // localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        // ...action.payload,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case LOGOUT_SUCCESS:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
