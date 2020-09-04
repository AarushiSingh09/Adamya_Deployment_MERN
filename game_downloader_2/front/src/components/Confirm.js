import React, { useEffect, useState } from 'react';
import './styles/main.css'
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verify, updatePassword } from '../utils/register';
import { Loading } from './elements/Loading';
import { Form, Button } from 'react-bootstrap';
import { setAlert } from '../utils/alert';
const Confirm = () => {

    const history = useHistory();
    const { token } = useParams();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });
    const isAuthenticated = useSelector(state => state.register.isAuthenticated);
    const linkVerified = useSelector(state => state.register.linkVerified);
    useEffect(() => {
        dispatch(verify(token));
        return () => {
        }
    }, []);
    const onChangeHandler = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = async e => {
        e.preventDefault();
        if(formData.password!=formData.confirmPassword) {
            dispatch(setAlert(`Passwords don't match`,'danger'));
        } else {
            dispatch(updatePassword(token,formData.password));
            history.push('/login');
        }
    };
    if (isAuthenticated == true || linkVerified == null) {
        return (<Loading />);
    }
    return (
        <div>
            <p> {linkVerified ? ResetPassword(onChangeHandler, onSubmit) : ConfirmFail()} </p>
        </div>
    )
}

const ResetPassword = (onChangeHandler, onSubmit) =>
    <div>
        <Form className="container" onSubmit={onSubmit}>
            <h1 className="text-center heading">Forgot Password</h1>
            <Form.Group controlId="formPassword">
                <Form.Label>Enter Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    name="confirmPassword"
                    onChange={onChangeHandler} />
            </Form.Group>
            <Button variant="primary forgot-btn" type="submit">
                Reset Password
            </Button>
        </Form>
    </div>

const ConfirmFail = () =>
    <div>
        Invalid Token
</div>

export default Confirm;