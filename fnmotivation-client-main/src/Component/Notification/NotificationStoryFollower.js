import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { NotificationSettingsUI } from '../../App';

const NotificationStoryFollower = ( ) => {
    const [notificationUI, setNotificationUI] = useContext(NotificationSettingsUI)
    const userID = JSON.parse(localStorage.getItem('userID'))
    const [follower, setFollower] = useState([])
    
    const getUserFollower = useCallback(  () => {
        fetch('/getUserFollower?id=' + userID)
            .then(res => res.json())
            .then(data => {
                setFollower(data)
                
            })
    }, [notificationUI])

    useEffect(() => {
       if(notificationUI.NFFollwer){
        getUserFollower()
       }
    }, [notificationUI])
    return (
        <div>
            {follower.map((follow, index) =>
                <>
                    <Link to="/user-profile">
                        <div key={follow.user_id} className="article-title-user">
                            <div className="user-holder">
                                < img src={require(`../../images/avatar.png`)} alt="avatar" className="img-fluid" />
                            </div>
                            <div className="text-inner">
                                <span>{follow.first_name} followed You</span>
                            </div>
                        </div>
                        <hr></hr>
                    </Link>
                </>)}
        </div>
    );
};

export default NotificationStoryFollower;