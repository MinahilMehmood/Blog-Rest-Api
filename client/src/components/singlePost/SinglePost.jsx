import React, { useContext, useEffect, useState } from 'react';
import "./singlePost.css";
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";
import { Context } from "../../context/Context";

const SinglePost = () => {

    const { user } = useContext(Context)

    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    const PF = "http://localhost:5000/images/";

    useEffect(() => {
        const fetchSinglePost = async () => {
            const res = await axios.get("http://localhost:5000/api/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        fetchSinglePost();
    }, [path]);

    const handleDelete = async () => {
        try {
            await axios.delete("http://localhost:5000/api/posts/" + path, { data: { username: user.username } });
            window.location.replace("/");
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put("http://localhost:5000/api/posts/" + path, { username: user.username, title, desc });
            // window.location.reload();
            setUpdateMode(false)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='single-post'>
            <div className='single-post-wrapper'>
                {post.photo && (
                    <img className='single-post-img' src={PF + post.photo} alt='Single Post Image' />
                )}{
                    updateMode ?
                        <input
                            type="text"
                            value={title}
                            className="single-post-title-input"
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                            autoFocus /> :
                        <h1 className='single-post-title'>
                            {title}
                            {post.username === user?.username && (
                                <div className='single-post-edit'>
                                    <i className='single-post-icon far fa-edit' onClick={() => {
                                        setUpdateMode(true)
                                    }}></i>
                                    <i className='single-post-icon far fa-trash-alt' onClick={handleDelete}></i>
                                </div>
                            )}
                        </h1>
                }
                <div className='single-post-info'>
                    <span className='single-post-author'>Author:
                        <Link className="link" to={`/?user=${post.username}`}>
                            <b> {post.username}</b>
                        </Link>
                    </span>
                    <span className='single-post-date'>{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ?
                    <textarea
                        value={desc}
                        className="single-post-desc-input"
                        onChange={(e) => {
                            setDesc(e.target.value)
                        }}
                        autoFocus /> :
                    <p className='single-post-desc'>
                        {desc}
                    </p>
                }
                {updateMode &&
                    <button className="single-post-button" onClick={handleUpdate}>
                        Update
                    </button>
                }
            </div>
        </div>
    )
}

export default SinglePost
