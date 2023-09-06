import React, { useContext, useState } from 'react';
import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from '../../context/Context';
import axios from "axios";

const Settings = () => {

    const { user, dispatch } = useContext(Context);
    const PF = ("http://localhost:5000/images/");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" })
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await axios.post("http://localhost:5000/api/upload", data);
            } catch (error) {
                console.log(error);
            }
        }

        try {
            const res = await axios.put("http://localhost:5000/api/users/" + user._id, updatedUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (error) {
            console.log(error);
            dispatch({ type: "UPDATE_FAILURE" });
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete("http://localhost:5000/api/users/" + user._id, { data: { userId: user._id } });
            dispatch({ type: "LOGOUT" });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="settings">
            <div className="settings-wrapper">
                <div className="settings-title">
                    <span className="settings-update-title">Update Your Account</span>
                    <span className="settings-delete-title" onClick={handleDelete}>Delete Account</span>
                </div>
                <form onSubmit={handleSubmit} className="settings-form">
                    <label>Profile Picture</label>
                    <div className="settings-PP">
                        <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt='about Me image' />
                        <label htmlFor='fileInput'>
                            <i className="settings-PP-icon far fa-user-circle"></i>
                        </label>
                        <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => {
                            setFile(e.target.files[0])
                        }} />
                    </div>
                    <label>Username</label>
                    <input className="" type="text" placeholder={user.username} onChange={(e) => {
                        setUsername(e.target.value)
                    }} />
                    <label>Email</label>
                    <input className="" type="email" placeholder={user.email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                    <label>Password</label>
                    <input className="" type="password" placeholder="***" onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    <button type="submit" className="settings-update">Update</button>
                    {success &&
                        <span style={{ color: "green", textAlign: "center", marginTop: "20px" }}>Updated Successfully!</span>
                    }
                </form>
            </div>
            <Sidebar />
        </div>
    )
}

export default Settings;
