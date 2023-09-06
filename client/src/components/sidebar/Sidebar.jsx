import React, { useEffect, useState } from 'react';
import "./sidebar.css";
import axios from "axios";
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("http://localhost:5000/api/categories/");
            setCats(res.data);
        };
        getCats();
    }, [])

    return (
        <div className='sidebar'>
            <div className="sidebar-item">
                <span className='sidebar-title'>ABOUT ME</span>
                <img src='https://images.pexels.com/photos/17592921/pexels-photo-17592921/free-photo-of-teenager-with-flower-in-hair.jpeg?auto=compress&cs=tinysrgb&w=600' alt='about Me image' />
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed corrupti aspernatur esse ipsam perspiciatis suscipit.
                </p>
            </div>
            <div className="sidebar-item">
                <span className='sidebar-title'>CATEGORIES</span>
                <ul className='sidebar-list'>
                    {cats.map((c) => (
                        <Link key={c._id} className="link" to={`/?cat=${c.name}`}>
                            <li className='sidebar-list-item'>{c.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sidebar-item">
                <span className='sidebar-title'>FOLLOW US</span>
                <div className='sidebar-social'>
                    <i className="sidebar-icon fab fa-facebook-square"></i>
                    <i className="sidebar-icon fab fa-twitter-square"></i>
                    <i className="sidebar-icon fab fa-pinterest-square"></i>
                    <i className="sidebar-icon fab fa-instagram-square"></i>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
