/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { StoryContext } from '../contexts/Story/StoryContext';

const StoryLikes = ({ id, allLikes, getNotifications }) => {

    const token = localStorage.getItem('token')

    const activityID = JSON.parse(localStorage.getItem('userID'))

    const { likeColor, setLikeColor } = useContext(StoryContext)
    const { likeCount, setLikeCount } = useContext(StoryContext)


    const storyLikes = () => {

        const like = likeColor ? '' : 'active'
        setLikeColor(like)

        fetch('http://68.183.178.196/api//storyLike', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                authorization: token
            },
            body: JSON.stringify({ storyID: id, userID: activityID })
        })
            .then(res => res.json())
            .then(data => {
                if (data.affectedRows > 0) {
                    setLikeCount(data)
                    getNotifications()
                }
            })
    }


    // Like End


    return (
        <>
            <li className={likeColor}>
                <a style={{ cursor: 'pointer' }} onClick={storyLikes}>
                    <strong>{allLikes.length === 0 ? '' : allLikes.length}</strong>
                    <img src={require(`../../images/thumb-up-icon.svg`).default} className="simple-state" alt="" />
                    <img src={require(`../../images/thumb-up-hover.svg`).default} className="hover-state" alt="" />
                </a>
            </li>

        </>
    );
};

export default StoryLikes;