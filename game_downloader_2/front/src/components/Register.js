import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';
import {register} from '../utils/register'
import formValidator from '../utils/formValidator';
import {setAlert} from '../utils/alert';


const Register = () => {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors:{
            password:'',
            email:'',
            userName: ''
        }
    });

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.register.isAuthenticated);

    const { userName, email, password, confirmPassword } = formData;

    if(isAuthenticated){
        return <Redirect to="/home"/>;
    }

    const onChangeHandler = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        let errors = formValidator(formData,setFormData);
        if(errors.length > 0) {
            errors.forEach(error=>dispatch(setAlert(error,'danger')));
            return;
        }
        if (password == confirmPassword) {
            dispatch(register({name:userName,email,password}));
        }
    }

    return (
        <Form className="container" onSubmit={onSubmit}>
            <h1 className="text-center heading">Register Here</h1>
            <Form.Group controlId="formName">
                <Form.Label>Enter Name</Form.Label>
                <Form.Control 
                type="userName" 
                name="userName" 
                placeholder="Name" 
                onChange={onChangeHandler}/>
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Enter Email</Form.Label>
                <Form.Control 
                type="email" 
                name="email" 
                placeholder="example@example.com" 
                onChange={onChangeHandler}/>
                {formData.errors.email.length > 0 && 
                                    <Form.Text className='error'>{formData.errors.email}</Form.Text>}
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Enter Password</Form.Label>
                <Form.Control 
                type="password" 
                name="password" 
                placeholder="Password" 
                onChange={onChangeHandler}/>
                {formData.errors.password.length > 0 && 
                                        <Form.Text className='error'>{formData.errors.password}</Form.Text>}
            </Form.Group>
            <Form.Group controlId="formconfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                type="password" 
                name="confirmPassword" 
                placeholder="Confirm Password" 
                onChange={onChangeHandler}/>
                <Form.Text className="text-muted">
                    Already have an account?
                    <Link to="/login" style={{"marginLeft":"0.2em"}}>Sign In</Link>
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>

    )
}

export default Register;