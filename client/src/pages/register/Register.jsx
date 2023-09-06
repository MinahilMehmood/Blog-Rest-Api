import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                username, email, password
            });

            res.data && window.location.replace("/login")
        } catch (error) {
            setError(true);
        }
    };

    return (
        <div className="register">
            <span className="register-title">Register</span>
            <form className="register-form" onSubmit={handleSubmit}>
                <label>Username</label>
                <input onChange={(e) => {
                    setUsername(e.target.value)
                }} className="register-input" type="text" placeholder="Your Name..." />
                <label>Email</label>
                <input onChange={(e) => {
                    setEmail(e.target.value)
                }} className="register-input" type="email" placeholder="Enter Your email..." />
                <label>Password</label>
                <input onChange={(e) => {
                    setPassword(e.target.value)
                }} className="register-input" type="password" placeholder="enter Your Password..." />
                <button type="submit" className="register-button">Register</button>
            </form>
            <button className="register-login-button">
                <Link className="link" to="/login">
                    Login
                </Link>
            </button>

            {error && <span style={{ color: "red", marginTop: "10px" }}>
                Something went wrong!
            </span>}
        </div>
    )
}

export default Register;
