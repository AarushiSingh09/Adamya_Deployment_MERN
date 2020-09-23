import React, { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {setAlert} from '../utils/alert'
import {login} from '../utils/login'
import {Link, Redirect} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const { email, password } = formData;
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.register.isAuthenticated);

  const onChangeHandler = e => {
  setFormData({ ...formData, [e.target.name] : e.target.value });
  }
  
  const onSubmit = async e => {
    e.preventDefault();
    if(!email) {
      dispatch(setAlert('Please Enter Email', 'danger'));
      return;
    } else if (!password) {
      dispatch(setAlert('Please Enter Password', 'danger'));
      return;
    } else {
      dispatch(login({email,password}));
    }
  };
  
  if(isAuthenticated){
    return <Redirect to="/home" />;
  }
  
  return (
    <div className="login_back">
      <div className="login_box">
    <Form className="container" onSubmit={onSubmit}>
            <h1 className="text-center heading">Login</h1>
            <Form.Group controlId="formEmail">
                <Form.Label>Enter Email</Form.Label>
                <Form.Control 
                type="email" 
                name="email" 
                placeholder="example@example.com" 
                onChange={onChangeHandler}/>
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Enter Password</Form.Label>
                <Form.Control 
                type="password" 
                name="password" 
                placeholder="" 
                onChange={onChangeHandler}/>
                <Form.Text className="text-muted">
                    Don't Have an Account?
                    <Link to="/register" style={{"marginLeft":"0.2em"}}>Sign Up</Link>
                </Form.Text>
                <Form.Text className="text-muted">
                    <Link to="/forgot" style={{"marginLeft":"0.2em"}}>Forgot Password?</Link>
                </Form.Text>
            </Form.Group>
            <center>
            <Button variant="primary" type="submit">
                Login
            </Button>
            </center>
        </Form>
        </div>
         </div>
    );
  };
  
  export default Login;
  