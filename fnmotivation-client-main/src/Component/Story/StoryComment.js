/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect, createContext, useRef, } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StoryEditForm from './StoryEditForm';
import StoryMainComment from './StoryMainComment';

export const CommentEdit = createContext()

toast.configure()


const StoryComment = ({ activityID, storyID, getNotifications }) => {

    const ref = useRef(null);
    
    const executeScroll = useCallback(  () => {
        if (ref.current) {
            ref.current.scrollIntoView({ block: 'end', behavior: 'smooth' })
        }
    }, [ref.current])

    useEffect(() => {
        executeScroll()
    }, [])



    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [commentLoad, setCommentLoad] = useState(true)

    const notify = () => {
        toast.warning('Posting Comment', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        })

    }


    const [comntEdit, setComntEdit] = useState([])


    const { register, handleSubmit, errors } = useForm();

    const token = localStorage.getItem('token')

    //GET COMMENT

    const [getComment, setGetComment] = useState([])
    const [getReplyComment, setGetReplyComment] = useState([])

    const ids = `${storyID},${activityID}`

    const getComments = useCallback(  () => {
        fetch('http://68.183.178.196/api//getComment?id=' + ids, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setGetComment(data.comment)
                setGetReplyComment(data.replyComment)
                setCommentLoad(false)

            })
    }, [])

    useEffect(() => {
        getComments()
    }, [getComments])


    const [comment, setComment] = useState([])

    const handleBlur = (e) => {
        if (e.target.name === 'comment') {
            setComment({ length: e.target.value.length })
        }
    }

    const onSubmit = (data, e) => {
        fetch('http://68.183.178.196/api//postComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                authorization: token
            },
            body: JSON.stringify({
                commentText: data.comment,
                storyID: storyID,
                userID: activityID
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.affectedRows > 0) {
                    notify()
                    e.target.reset();
                    getComments()
                    getNotifications()
                }
            })
    };


    const fc = localStorage.getItem('fc')

    return (
        <>

            <div className="article-comments">

                {/* Main Comment*/}
                {fc && comntEdit.length === 0 &&
                    <div className="article-comments-write mt-5">
                        <h3>Comments</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <textarea className="form-control" name="comment" onChange={handleBlur} placeholder="Write here...." ref={register({ required: true, maxLength: 500 })} />
                            {errors.comment?.type === 'required' && <span>This field is required</span>}
                            {errors.comment?.type === 'maxLength' && <span>Text length can't be more that 500</span>}
                            <div className="comment-post">
                                <button
                                    className="btn btn-warning text-white mt-3 pl-5 pr-5 pt-3 pb-3"
                                    type="submit">Post</button>

                                <span>{comment.length}/500</span>
                            </div>
                        </form>
                    </div>}

                {fc && comntEdit.length !== 0 &&
                    <CommentEdit.Provider value={[comntEdit, setComntEdit]}>
                        <StoryEditForm comntEdit={comntEdit} handleClose={handleClose} open={open} getComments={getComments} />
                    </CommentEdit.Provider>}


                {commentLoad ? <p className="text-center bg-white text-warning mt-2">Loading Comments...</p>
                    :
                    <>
                        {
                            getComment.map(comment =>
                                <CommentEdit.Provider value={[comntEdit, setComntEdit]}>
                                    <StoryMainComment
                                        key={comment.comment_id}
                                        comment_id={comment.comment_id}
                                        username={comment.username}
                                        avatar={comment.avatar}
                                        message={comment.message}
                                        createdAt={comment.createdAt}
                                        storyID={comment.story_id}
                                        userID={comment.user_id}
                                        getComments={getComments}
                                        getReplyComment={getReplyComment}
                                        handleOpen={handleOpen}
                                        getNotifications={getNotifications}
                                        ref={ref}
                                        executeScroll={executeScroll}
                                    />
                                </CommentEdit.Provider>)}
                    </>}

            </div>
        </>
    );
};

export default StoryComment;