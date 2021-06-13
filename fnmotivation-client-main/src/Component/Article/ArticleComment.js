/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, createContext } from 'react';
import { useForm } from 'react-hook-form';
import ArticleMainComment from './ArticleMainComment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArtcileEditComment from './ArtcileEditComment'

export const ArticleCommentEdit = createContext()
toast.configure()

const ArticleComment = ({ articleID, getNotifications }) => {

    const notifyComment = () => {
        toast.warning('Posting Comment', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        })

    }

    const notifyEdited = () => {
        toast.warning('Editing Comment', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        })

    }

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [comntArticleEdit, setArticleComntEdit] = useState([])
    const token = localStorage.getItem('token')
    const activityID = JSON.parse(localStorage.getItem('userID'))

    const [getArticleComment, setGetArticleComment] = useState([])
    const [getArticleReplyComment, setGetArticleReplyComment] = useState([])
    const [commentLoad, setCommentLoad] = useState(true)

    const getArticleComments = useCallback(  () => {
        fetch('http://68.183.178.196/allArticleCommentsOfAPost?id=' + articleID, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setGetArticleComment(data.comment)
                setGetArticleReplyComment(data.replyComment)
                setCommentLoad(false)
            })
    }, [])

    useEffect(() => {
        getArticleComments()
    }, [getArticleComments])


    const { register, handleSubmit, errors } = useForm();

    const [textLength, setTextLength] = useState([])
    const [chnageCmnt, setChnageCmnt] = useState({})

    const handleBlur = (e) => {
        setChnageCmnt(e.target.value)
        if (e.target.name === 'articleComment') {
            setTextLength({ length: e.target.value.length })
        }
    }

    const onSubmit = (data, e) => {

        fetch('http://68.183.178.196/postArticleComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                authorization: token
            },
            body: JSON.stringify({
                articleCommentText: data.articleComment,
                storyID: articleID,
                userID: activityID
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.affectedRows > 0) {
                    getArticleComments()
                    notifyComment()
                    e.target.reset();
                    getNotifications()
                }
            })

    }

    const fc = localStorage.getItem('fc')

    return (

        <div className="article-comments">

            {fc && comntArticleEdit.length === 0 &&
                <div className="article-comments-write">
                    <h3>Comments</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <textarea className="form-control" name="articleComment" onChange={handleBlur} placeholder="Write here...." ref={register({ required: true, maxLength: 500 })}></textarea>
                        {/* Error */}
                        {errors.articleComment?.type === 'required' && <span>This field is required</span>}
                        {errors.articleComment?.type === 'maxLength' && <span>Text length can't be more that 500</span>}

                        <div className="comment-post">
                            <button
                                className="btn btn-warning text-white mt-3 pl-5 pr-5 pt-3 pb-3"
                                type="submit">Post</button>
                            <span>{textLength.length}/500</span>
                        </div>
                    </form>
                </div>}

            {fc && comntArticleEdit.length !== 0 &&
                <ArticleCommentEdit.Provider value={[comntArticleEdit, setArticleComntEdit]}>
                    <ArtcileEditComment handleClose={handleClose} open={open} getArticleComments={getArticleComments} />
                </ArticleCommentEdit.Provider>}

            {commentLoad ? <p className="text-center bg-white text-warning mt-2">Loading Comments...</p>
                :
                <>
                    {getArticleComment.map(articleCmnt =>
                        <ArticleCommentEdit.Provider value={[comntArticleEdit, setArticleComntEdit]}>
                            <ArticleMainComment ac_id={articleCmnt.posts_comments_id}
                                key={articleCmnt.posts_comments_id}
                                username={articleCmnt.username}
                                avatar={articleCmnt.avatar}
                                message={articleCmnt.message}
                                createdAt={articleCmnt.createdAt}
                                postID={articleCmnt.post_id}
                                userID={articleCmnt.user_id}
                                getArticleComments={getArticleComments}
                                getArticleReplyComment={getArticleReplyComment}
                                handleOpen={handleOpen}
                                getNotifications={getNotifications}
                            />
                        </ArticleCommentEdit.Provider>)}
                </>}

        </div>
    );
};

export default ArticleComment;