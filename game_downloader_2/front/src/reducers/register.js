//Authentication is handled here, please refer to auth.js in utils for request logic

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAIL,
  LOGOUT
} from "../utils/consts";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
  loading: true,
  verified: null,
  linkVerified: null
};

export default function (state = initialState, action) {
  const { type, userType, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        verified: payload.emailVerified
      }
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        user:payload,
        verified: payload.emailVerified
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        ...payload,
        isAuthenticated: false,
        loading: false,
        userType: null,
        user: null,
        token: null
      };
    case VERIFICATION_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        userType: null,
        user: null,
        token: null,
        linkVerified: true
      };
    case VERIFICATION_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        userType: null,
        user: null,
        token: null,
        linkVerified: false
      };
    default:
      return state;
  }
}
