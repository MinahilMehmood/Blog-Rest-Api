import React from 'react';
import "./header.css";

const Header = () => {
    return (
        <div className='header'>
            <div className='header-titles'>
                <span className='header-title-sm'>React & Node</span>
                <span className='header-title-lg'>Blog</span>
            </div>
            <img  className="header-img" src= "https://images.pexels.com/photos/1374115/pexels-photo-1374115.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        </div>
    )
}

export default Header
