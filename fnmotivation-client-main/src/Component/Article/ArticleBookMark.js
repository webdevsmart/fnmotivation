/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { ArticleContext } from '../contexts/Article/ArticleContext';

const ArticleBookMark = ({ articleID }) => {

    const token = localStorage.getItem('token') 
    const activityID = JSON.parse(localStorage.getItem('userID'))

    const articleInfo = useContext(ArticleContext)

    const {  setBookMarkUpdate } = articleInfo
    const { bookMarkColor, setBookMarkColor } = articleInfo

    const idis = `${activityID},${articleID}`

    const articleBookMark = () => {

        const bookMark = bookMarkColor ? '' : 'active'
        setBookMarkColor(bookMark)

        fetch('http://68.183.178.196/api//articleBookMark?id=' + idis, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                authorization: token
            },
        })
            .then(res => res.json())
            .then(data => {
                
                if (data.affectedRows > 0) {
                    setBookMarkUpdate(data)
                }
            })

    }
    return (
        <>
            <li className={bookMarkColor}>
                <a onClick={articleBookMark}>
                    <img src={require(`../../images/bookmark-icon.svg`).default} className="simple-state" alt="" />
                    <img src={require(`../../images/bookmark-hover.svg`).default} className="hover-state" alt="" />
                </a>
            </li>

        </>
    );
};

export default ArticleBookMark;