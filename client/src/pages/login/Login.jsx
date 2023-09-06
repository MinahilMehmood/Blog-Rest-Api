import React, { useContext, useRef } from 'react';
import "./login.css";
import { Link } from 'react-router-dom';
import { Context } from './../../context/Context';
import axios from "axios";

const Login = () => {

    const userRef = useRef();
    const passwordRef = useRef();
    // eslint-disable-next-line no-unused-vars
    const { dispatch, isFetching } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value
            });

            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

        } catch (error) {
            console.log(error);
            dispatch({ type: "LOGIN_FAILURE" })
        }
    };

    return (
        <div className="login">
            <span className="login-title">Login</span>
            <form className="login-form" onSubmit={handleSubmit}>
                <label>Username</label>
                <input className="login-input" type="text" placeholder="Enter Your username..." ref={userRef} />
                <label>Password</label>
                <input className="login-input" type="password" placeholder="enter Your Password..." ref={passwordRef} />
                <button type="submit" className="login-button" disabled={isFetching}>Login</button>
            </form>
            <button className="login-register-button">
                <Link className="link" to="/register">
                    Register
                </Link>
            </button>
        </div>
    )
}

export default Login;
