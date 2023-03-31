import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import TagComp from './TagComp';
import { Button, Form, InputGroup } from 'react-bootstrap';
import Datetime from 'react-datetime';

function Login() {

    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
        checkBox: true
    })

    const handleChange = (event) => {
        setFormValue({ ...formValue, [event.target.name]: event.target.value })
    }

    const handleCheck = () => {
        setFormValue({ ...formValue, checkBox: !checkBox })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValue, '-----formValue-------');

        axios.post('http://127.0.0.1:3100/api/user/login', {
            "email": formValue.email,
            "password": formValue.password
        }).then(function (response) {
            console.log((response.data.result.token), '=====json=======');
            localStorage.setItem("auth-token", response.data.result.token)
            navigate('/chat')
        }).catch(function (error) {
            console.log(error);
        });

    }

    const handleDateChange = () => {
        console.log("-----------------");
    }

    const { email, password, checkBox } = formValue

    return (
        <div className="App">
            <div className="container h-100">
                <div className="row h-100">
                    <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                        <div className="d-table-cell align-middle">
                            <div className="text-center mt-4">
                                <h1 className="h2">Welcome back, Dey</h1>
                                <p className="lead">
                                    Sign in to your account to continue
                                </p>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <div className="m-sm-4">
                                        <div className="text-center">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Andrew Jones"
                                                className="img-fluid rounded-circle" width="132" height="132" />
                                        </div>
                                        <form>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input className="form-control form-control-lg" type="text" name="email" value={email}
                                                    onChange={handleChange} placeholder="Enter your email" />
                                            </div>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input className="form-control form-control-lg" type="password" name="password" value={password}
                                                    onChange={handleChange} placeholder="Enter your password" />
                                                <small>
                                                    <a href="pages-reset-password.html">Forgot password?</a>
                                                </small>
                                            </div>

                                            <div>
                                                <div className="custom-control custom-checkbox align-items-center">

                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        // value={checkBox}
                                                        name="remember-me"
                                                        value={checkBox}
                                                        onChange={handleCheck}
                                                    />
                                                    <label className="custom-control-label text-small">Remember me next time</label>
                                                </div>
                                            </div>
                                            <div className="text-center mt-3">
                                                <button className="btn btn-lg btn-primary" onClick={handleSubmit}>Sign in</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
