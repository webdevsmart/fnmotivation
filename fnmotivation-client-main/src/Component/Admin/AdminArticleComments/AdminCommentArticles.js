/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { CircularProgress } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import AdminArticleCommentDetails from './AdminArticleCommentDetails';
import '../MainAdmin/Admin.css'


const AdminCommentArticles = () => {
    let { adminArticleID } = useParams()

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
        fetch(`/articleCommentsAdmin/${adminArticleID}/${active}?show=` + fetchData, {
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
                <h1>Article Comments</h1>
            </div>

            <div className="mt-5">
                    <div className="breadcrumb-main">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/"><b>{comment.length !==0 && comment[0].post_id}</b></a></li>
                            <li className="breadcrumb-item active"><b>{comment.length !==0 && comment[0].post_title}</b></li>
                        </ol>
                    </div>
            </div>


            {comment.map(com =>
                <AdminArticleCommentDetails
                    key={com.posts_comments_id}
                    id={com.posts_comments_id}
                    user_id={com.commenter_user_id}
                    title={com.title}
                    message={com.message}
                    comID={com.posts_comments_id}
                    time={com.createdAt}
                    avatar={com.commenter_avatar}
                    username={com.commenter_username}
                    is_deleted={com.is_deleted}
                    replyComment={replyComment}
                    getComments={getComments} />)}

            <div className="pt-3 pb-5">
                {loading && <h4 className="text-warning text-center" style={{ cursor: 'pointer' }}><CircularProgress color="#fbc02d" /></h4>}
            </div>

        </section >
    );
};

export default AdminCommentArticles;