import React, {useContext,  useState, useCallback, useEffect} from 'react';
import { NotificationSettingsUI } from "../../App";
import { Link } from "react-router-dom";

const NotificationStoryComments = () => {
    const [notificationUI, setNotificationUI] = useContext(NotificationSettingsUI)

    const userID = JSON.parse(localStorage.getItem('userID'))

    const [allComments, setAllComments] = useState([])

    const allCommentsOfParticularUser = useCallback(  () => {
        fetch('http://68.183.178.196/allCommentsOfParticularUser?id=' + userID)
            .then(res => res.json())
            .then(data => {
                setAllComments(data)
                
            })
    }, [notificationUI])

    useEffect(() => {
        if(notificationUI.NFstoryComment){
            allCommentsOfParticularUser()
        }
    }, [notificationUI])

    return (
        <div>
        {allComments.map((comnt, index) =>
            <>
                <Link to={"/post/" + comnt.story_id}>
                    <div key={index} className="article-title-user">
                        <div className="user-holder">
                            < img src={require(`../../images/avatar.png`)} alt="avatar" className="img-fluid" />
                        </div>
                        <div className="text-inner">
                            <span>{comnt.username} commented on your post</span><br></br>
                            <span>{comnt.comment_text} </span>
                        </div>
                    </div>
                    <hr></hr>
                </Link>
            </>)}
    </div>
    );
};

export default NotificationStoryComments;