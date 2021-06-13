/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { StoryContext } from '../contexts/Story/StoryContext';

const StoryBookMark = ({ id }) => {

    const token = localStorage.getItem('token')
    const activityID = JSON.parse(localStorage.getItem('userID'))

    const { bookMarkUpdate, setBookMarkUpdate } = useContext(StoryContext)
    const { bookMarkColor, setBookMarkColor } = useContext(StoryContext)

    const storyInfo = useContext(StoryContext)

    useEffect(() => {
        storyInfo.getStorybookmarks()
    }, [storyInfo.getStorybookmarks, bookMarkUpdate])


    //BookMark

    const idis = `${activityID},${id}`

    const bookMark = () => {

        const bookMark = bookMarkColor ? '' : 'active'
        setBookMarkColor(bookMark)

        fetch('/bookMark?id=' + idis, {
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
            <li className={bookMarkColor} onClick={bookMark}>
                <a style={{ cursor: 'pointer' }}>
                    <img src={require(`../../images/bookmark-icon.svg`).default} className="simple-state" alt="" />
                    <img src={require(`../../images/bookmark-hover.svg`).default} className="hover-state" alt="" />
                </a>
            </li>

        </>
    );
};

export default StoryBookMark;