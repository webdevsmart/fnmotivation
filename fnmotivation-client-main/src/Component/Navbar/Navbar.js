/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../images/logo.png';
import searchIcon from '../../images/search-icon.svg';
import { UserContext } from '../contexts/User/userContext';
import NotificationUI from './NotificationUI';

const Navbar = ({ handleChange, notifications, preloaderVisibale, fetchFunc, loader, search, getNotifications, notiCount }) => {

    // const [count, setCount] = useState(notiCount)
    const userAllData = useContext(UserContext)
    const userID = JSON.parse(localStorage.getItem('userID'))
    const noti = notifications.filter(noti => noti.from_user_id !== userID)
    // const notiNotSeen = noti.filter(id => id.is_seen == 0)
    const [light, setLight] = useState(false)

    useEffect(() => {
        const count = localStorage.getItem('NotiStatus')
        if (count < notiCount && notiCount) {
            setLight(true)
        }
    }, [])

    useEffect(() => {
        userAllData.getParticularUserData()
    }, [userAllData.getParticularUserData])

    const username = JSON.parse(localStorage.getItem('username'))
    const avatar = JSON.parse(localStorage.getItem('avatar'))

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event, info) => {
        setAnchorEl(event.currentTarget);
        localStorage.setItem('NotiStatus', notiCount)
        setLight(false)
    };


    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <div>
            <header className="header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="navigation">
                                <nav className="navbar navbar-expand-lg navbar-light">
                                    <a href="/" className="navbar-brand" ><img src={logo} alt="logo" className="img-fluid" /></a>
                                    <div className="mobile-btn">
                                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                            <span className="navbar-toggler-icon"></span>
                                            <span className="navbar-toggler-icon"></span>
                                            <span className="navbar-toggler-icon"></span>
                                        </button>
                                        <div className="header-right">
                                            <form>
                                                <a href="/search" ><img src={searchIcon} alt="search" /></a>
                                            </form>

                                            {!username &&
                                                <ul className="acount-btn">

                                                    <li>
                                                        <div className="use-profile">
                                                            <div className="text-box">
                                                                <a href="/login"><h3>Login</h3></a>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>}

                                            {username &&
                                                <ul>

                                                    <li className="notification-icon" onClick={handleClick}>
                                                        {!light ?
                                                            <img src={require("../../images/notification-icon.svg").default} alt="" />
                                                            :
                                                            <a><img src={require("../../images/notification-icon.svg").default} alt="" /></a>}
                                                    </li>

                                                    <li>
                                                        <a href={"/user/" + username}>
                                                            <div className="use-profile">
                                                                <div className="text-box">
                                                                    <h3>{username}</h3>
                                                                </div>
                                                                <div className="image-holder">
                                                                    <img className="img-fluid" src={`http://localhost:5000/${avatar}`} alt="userImage" />
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>

                                                </ul>}

                                        </div>
                                    </div>

                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav ml-auto">
                                            <NavLink exact to="/" activeClassName="nav-item active" className="nav-item">
                                                <span className="nav-link" >Home</span>
                                            </NavLink>
                                            <NavLink exact to="/post-story" activeClassName="nav-item active" className="nav-item">
                                                <span className="nav-link" >Post Story</span>
                                            </NavLink>
                                            <NavLink exact to="/post-article" activeClassName="nav-item active" className="nav-item">
                                                <span className="nav-link" >Post News Article</span>
                                            </NavLink>
                                            <NavLink exact to="/community" activeClassName="nav-item active" className="nav-item">
                                                <span className="nav-link" >Communities</span>
                                            </NavLink>
                                        </ul>
                                        <div className="header-right">
                                            <Link to="/search">
                                                <form>
                                                    <input type="text" onChange={handleChange} defaultValue={search} className="form-control" placeholder="Search" />
                                                    <a href="/search" ><img src={searchIcon} alt="search" type="submit" /></a>
                                                </form>
                                            </Link>

                                            {!username &&
                                                <ul className="acount-btn">
                                                    <li><a href="/login">Login</a></li>
                                                    <li className="login-btn"><a href="/register">Sign Up</a></li>
                                                </ul>}

                                            {username &&
                                                <ul>

                                                    <li className="notification-icon" onClick={handleClick} style={{ cursor: 'pointer' }}>
                                                        {!light ?
                                                            <img src={require("../../images/notification-icon.svg").default} />
                                                            :
                                                            <a><img src={require("../../images/notification-icon.svg").default} /></a>}
                                                    </li>
                                                    <li>
                                                        <NotificationUI preloaderVisibale={preloaderVisibale} notifications={noti} anchorEl={anchorEl} handleClose={handleClose} handleClick={handleClick} fetchFunc={fetchFunc} loader={loader} />

                                                        <a href={"/user/" + username}>
                                                            <div className="use-profile">
                                                                <div className="text-box">
                                                                    <h3>{username}</h3>
                                                                </div>
                                                                <div className="image-holder">
                                                                    <img className="img-fluid" src={`http://localhost:5000/${avatar}`} alt="" />
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>
                                                </ul>}
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div >
    );
};

export default Navbar;