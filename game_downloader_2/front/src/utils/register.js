import axios from "axios";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    VERIFICATION_SUCCESS,
    VERIFICATION_FAIL,
    LOGOUT
} from "./consts";
import {setAlert} from './alert';


export const register = ({ name, email, password }) => async dispatch => {
  const params = {
    name,
    email,
    password
  };
  try {
    const res = await axios.post("/api/userAuth/register", params, {
      headers: {
        "content-type": "application/json"
      }
    });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: REGISTER_FAIL
    });
  };
}


export const verify = id => async dispatch => {
  try {
    const res = await axios.get(`/api/userAuth/confirm/${id}`);
    dispatch({
      type: VERIFICATION_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: VERIFICATION_FAIL
    });
  };
}

export const updatePassword = (verificationToken, password) => async dispatch => {
  const params= {verificationToken, password};
  try {
    const res = await axios.post("/api/userAuth/resetPass", params, {
      headers: {
        "content-type": "application/json"
      }
    });
    dispatch(setAlert("Password Updated Successfully!",'success'));
  } catch (err) {
    console.log(err.response.data);
    dispatch(setAlert(err.response.data.errors.msg,'danger'));
  };
}

export const logout = () => dispatch => {
  dispatch({type: LOGOUT});
}