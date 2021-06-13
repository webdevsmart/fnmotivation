/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { CircularProgress } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import AdminCommentDetails from './AdminCommentDetails';
import '../MainAdmin/Admin.css'

const AdminCommentStories = () => {
    let { storyID } = useParams()

    const [fetchData, setfetchData] = useState(0)

    const fetchFunc = () => {
        setfetchData(fetchData + 10)
    }

    const token = localStorage.getItem('admiNToken')

    const [loading, setLoading] = useState(false)
    const [comment, setComments] = useState([])
    const [replyComment, setReplyComment] = useState([])
    const [active, setActive] = useState('0')

    const handleActive = (value) => {
        setActive(value)
    }
    const getComments = useCallback(() => {
        setLoading(true)
        fetch(`http://localhost:5000/storyCommentsAdmin/${storyID}/${active}?show=` + fetchData, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setComments(data.comment)
                setReplyComment(data.replyComment)
                setLoading(false)
            })
    }, [fetchData, active])

    useEffect(() => {
        getComments()
    }, [getComments])



    return (
        <section className="m-2">
            <div className="nav-admin text-center">
                <h1>Story Comments</h1>
            </div>

            <div className="breadcrumb-main mt-5">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/"><h4><b>{comment.length !== 0 && comment[0].story_id}</b></h4></a></li>
                    <li className="breadcrumb-item active"><h4><b>{comment.length !== 0 && comment[0].title}...</b></h4></li>
                </ol>
            </div>

            <table className="table">
                {comment.map(com =>
                <AdminCommentDetails
                    key={com.story_id}
                    story_id={com.story_id}
                    user_id={com.user_id}
                    title={com.title}
                    message={com.message}
                    comID={com.comment_id}
                    time={com.createdAt}
                    avatar={com.avatar}
                    username={com.username}
                    is_deleted={com.is_deleted}
                    replyComment={replyComment}
                    getComments={getComments} />)}

            </table>
            
            <div className="pt-3 pb-5">
                {loading && <h4 className="text-warning text-center" style={{ cursor: 'pointer' }}><CircularProgress color="#fbc02d" /></h4>}
            </div>

        </section >
    );
};

export default AdminCommentStories;