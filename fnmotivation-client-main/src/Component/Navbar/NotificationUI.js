import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import PreloaderOne from '../Preloader/PreloaderOne';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));



const NotificationUI = ({ anchorEl, handleClose, notifications, preloaderVisibale, fetchFunc, loader }) => {


    const token = localStorage.getItem('token')
    const seenNoti = (info) => {
        fetch(`/seenNoti/${info.notification_id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                window.location = info.route
            })
    }


    return (
        <div className="noti-style">
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <div className="d-flex p-3">
                    <div className="flex-grow-1 ">
                        <h3>Notifications</h3>
                    </div>
                    <div>
                        <Link to="/notification-settings"><img style={{ cursor: 'pointer' }} src={require('../../images/settings.png').default} alt="settings" /></Link>
                    </div>
                </div>
                {preloaderVisibale ? <PreloaderOne />
                    :
                    <div className="p-2 notification">
                        {notifications.map((notification, index) =>
                            <div key={index} className="p-2 seen">
                                {/* <Link to={notification.route}> */}
                                <span onClick={() => seenNoti(notification)}>
                                    <div className="d-flex">
                                        {notification.is_seen === 0 ? <span className="bellColor p-2"></span> : ''}
                                        <p className="ml-2"><b>{notification.from_user_full_name}</b> {notification.notification_string} <b>{notification.rest_of_the_string}</b></p>
                                    </div>
                                </span>
                                {/* </Link> */}
                            </div>)}
                        <p className="p-2">{notifications.length === 0 && `You will see notifications here.`}</p>
                        {notifications.length !== 0 &&
                            loader ? <h4 className="text-warning text-center" style={{ cursor: 'pointer' }}><CircularProgress color="#fbc02d" /></h4>
                            :
                            <h4 className="text-warning text-center" style={{ cursor: 'pointer' }} onClick={fetchFunc}>Load More</h4>}
                    </div>}

            </StyledMenu>
        </div>
    );
};

export default NotificationUI;