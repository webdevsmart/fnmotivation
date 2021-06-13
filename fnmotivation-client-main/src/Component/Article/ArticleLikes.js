/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useContext} from 'react';
import { ArticleContext } from '../contexts/Article/ArticleContext';

const ArticleLikes = ({ articleID, getNotifications }) => {

    const token = localStorage.getItem('token')
    const activityID = JSON.parse(localStorage.getItem('userID'))

    const articleInfo = useContext(ArticleContext);
    const { setLikeCount} = articleInfo
    const {likeColor, setLikeColor,} = articleInfo

    const storyLikes = () => {

        const like = likeColor ? '' : 'active'
        setLikeColor(like)

        fetch('http://localhost:5000/articleLike', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                authorization: token
            },
            body: JSON.stringify({ articleID: articleID, userID: activityID })
        })
            .then(res => res.json())
            .then(data => {
                if (data.affectedRows > 0) {
                    setLikeCount(data)
                    getNotifications()
                }
            })
    }
    
    return (
        <>
            <li className={likeColor}>
                <a onClick={storyLikes}>
                <strong>{articleInfo.allLikes.length === 0 ? '' : articleInfo.allLikes.length}</strong>
                    <img src={require(`../../images/thumb-up-icon.svg`).default} className="simple-state" alt="" />
                    <img src={require(`../../images/thumb-up-hover.svg`).default} className="hover-state" alt="" />
                </a>
            </li>

        </>
    );
};

export default ArticleLikes;