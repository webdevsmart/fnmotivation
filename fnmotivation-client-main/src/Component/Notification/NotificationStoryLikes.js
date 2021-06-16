import React, { useCallback, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { NotificationSettingsUI } from '../../App';

const NotificationStoryLikes = () => {
    const [notificationUI, setNotificationUI] = useContext(NotificationSettingsUI)

    const userID = JSON.parse(localStorage.getItem('userID'))
    
    const [allLikes, setAllLikes] = useState([])

    const allStoryLikesOfParticularUser = useCallback(  () => {
        fetch('http://68.183.178.196/api//allStoryLikesOfParticularUser?id=' + userID)
            .then(res => res.json())
            .then(data => {
                setAllLikes(data)
                // 
            })
    }, [notificationUI])

    useEffect(() => {
        if(notificationUI.NFstoryLike){
            allStoryLikesOfParticularUser()
        }
    }, [notificationUI])

    return (
        <div>
            {allLikes.map((like, index) =>
                <>
                    <Link to={"/post/" + like.story_id}>
                        <div key={index} className="article-title-user">
                            <div className="user-holder">
                                < img src={require(`../../images/avatar.png`)} alt="avatar" className="img-fluid" />
                            </div>
                            <div className="text-inner">
                                <span>{like.first_name} liked your post</span><br></br>
                                <span>{like.short_story}</span>
                            </div>
                        </div>
                        <hr></hr>
                    </Link>
                </>)}
        </div>
    );
};

export default NotificationStoryLikes;