import React, { useContext } from "react";
import "./topbar.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import { Context } from "./../../context/Context";

const Topbar = () => {

    const { user, dispatch } = useContext(Context);
    const PF = ("http://localhost:5000/images/");

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    return (
        <div className="top">
            <div className="top-left">
                <i className="top-icon fab fa-facebook-square"></i>
                <i className="top-icon fab fa-twitter-square"></i>
                <i className="top-icon fab fa-pinterest-square"></i>
                <i className="top-icon fab fa-instagram-square"></i>
            </div>
            <div className="top-center">
                <ul className="top-list">
                    <li className="top-list-item">
                        <Link className="link" to="/">HOME</Link>
                    </li>
                    <li className="top-list-item">
                        <Link className="link" to="/about">ABOUT</Link>
                    </li>
                    <li className="top-list-item">
                        <Link className="link" to="/contact">CONTACT</Link>
                    </li>
                    <li className="top-list-item">
                        <Link className="link" to="/write">WRITE</Link>
                    </li>
                    <li onClick={handleLogout} className="top-list-item">
                        {user && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className="top-right">
                {
                    user ? (
                        <Link to="/settings">
                            <img className="top-image" src={PF + user.profilePic} alt="Profile Image" />
                        </Link>
                    ) : (
                        <ul className="top-list">
                            <li className="top-list-item">
                                <Link className="link" to="/login">LOGIN</Link>
                            </li>
                            <li className="top-list-item">
                                <Link className="link" to="/register">REGISTER</Link>
                            </li>
                        </ul>
                    )
                }
                <i className="search-icon fas fa-search"></i>
            </div>
        </div>
    )
};

export default Topbar;