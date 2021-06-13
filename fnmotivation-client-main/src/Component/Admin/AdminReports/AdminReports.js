/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import '../MainAdmin/Admin.css'
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const AdminReports = () => {

    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem('admiNToken')

    const [storyCount, setStoryCount] = useState('')
    const [storyCountCmnt, setStoryCountCmnt] = useState('')
    const [storyCountCmntReply, setStoryCountReply] = useState('')

    const count = useCallback(() => {
        setLoading(true)
        fetch('http://localhost:5000/storyCountReports', {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setStoryCount(data.countStory[0].story_report)
                setStoryCountCmnt(data.countComment[0].story_comment_report)
                setStoryCountReply(data.countReply[0].story_comment_reply_report)
                setLoading(false)
            })
    }, [])
    useEffect(() => {
        count()
    }, [count])

    const [articleCount, setArticleCount] = useState('')
    const [articleCountCmnt, setArticleCountCmnt] = useState('')
    const [articleCountCmntReply, setArticleCountReply] = useState('')

    const countArticle = useCallback(() => {
        setLoading(true)
        fetch('http://localhost:5000/articleCountReports', {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setArticleCount(data.countStory[0].post_report)
                setArticleCountCmnt(data.countComment[0].post_comment_report)
                setArticleCountReply(data.countReply[0].post_comment_reply_report)
                setLoading(false)
            })
    }, [])
    useEffect(() => {
        countArticle()
    }, [countArticle])

    return (

        <section className="m-2">

            <div className="nav-admin text-center">
                <h1 className="p-3">Story Report</h1>
                    <div className="d-flex justify-content-center">
                        <Link to="/admin/reports/story"><h3 className="admin-box-active bg-success" style={{ cursor: 'pointer' }}><FaExternalLinkSquareAlt color="white" className="m-2" /> Story: {loading ? <CircularProgress color="#fbc02d" /> : storyCount}</h3></Link>
                        <Link to="/admin/reports/story/comment"><h3 className="admin-box-active bg-warning" style={{ cursor: 'pointer' }}><FaExternalLinkSquareAlt color="white" className="m-2" />  Comment: {loading ? <CircularProgress color="#fbc02d" /> : storyCountCmnt}</h3></Link>
                        <Link to="/admin/reports/story/comment-reply"><h3 className="admin-box-active bg-primary" style={{ cursor: 'pointer' }}><FaExternalLinkSquareAlt color="white" className="m-2" />  Comment Reply: {loading ? <CircularProgress color="#fbc02d" /> : storyCountCmntReply}</h3></Link>
                    </div>
                <h1 className="p-3">Article Report</h1>
                            <div className="d-flex justify-content-center">
                                <Link to="/admin/reports/article"><h3 className="admin-box-active bg-success" style={{ cursor: 'pointer' }}><FaExternalLinkSquareAlt color="white" className="m-2" /> Article: {loading ? <CircularProgress color="#fbc02d" /> : articleCount}</h3></Link>
                                <Link to="/admin/reports/article/comment"><h3 className="admin-box-active bg-warning" style={{ cursor: 'pointer' }}><FaExternalLinkSquareAlt color="white" className="m-2" />  Comment: {loading ? <CircularProgress color="#fbc02d" /> : articleCountCmnt}</h3></Link>
                                <Link to="/admin/reports/article/comment-reply"><h3 className="admin-box-active bg-primary" style={{ cursor: 'pointer' }}><FaExternalLinkSquareAlt color="white" className="m-2" />  Comment Reply: {loading ? <CircularProgress color="#fbc02d" /> : articleCountCmntReply}</h3></Link>
                            </div>
                    </div>

        </section>
    );
};

export default AdminReports;