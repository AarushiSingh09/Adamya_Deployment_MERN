//Authentication request is done here, please refer to auth.js in reducer for handler logic

import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  FORGOT_SUCCESS,
  FORGOT_FAILED
} from "./consts";

// TODO: Set some alerts using the alert action generator
import setAuthToken from "./setAuthToken";
import {setAlert} from './alert';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/userAuth/");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const login = ({ email, password }) => async dispatch => {
  const params = {
    email,
    password
  };
  try {
    const res = await axios.post("/api/userAuth/login", params, {
      headers: {
        "content-type": "application/json"
      }
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err.message);
    dispatch(setAlert('Login Failed. Try Again','danger'));
    dispatch({
      type: LOGIN_FAIL
    });
  };
}

export const forgot = email => async dispatch => {
  const params= {email};
  try {
    const res = await axios.post("/api/userAuth/forgot", params, {
      headers: {
        "content-type": "application/json"
      }
    });
    dispatch(setAlert("Check Email to verify!",'success'));
  } catch (err) {
    console.log(err.response.data.errors.msg);
    dispatch(setAlert(err.response.data.errors.msg,'danger'));
  };
}

export const logout = () => async dispatch => {
  dispatch({type: LOGOUT});
}