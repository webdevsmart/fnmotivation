/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useState } from 'react';
import { scrollToTop } from '../../App';
import { CommentEdit } from './StoryComment';
import StoryReplyComment from './StoryReplyComment';
import StoryReplyFormComment from './StoryReplyFormComment';
import moment from 'moment';
import ReportStoryComment from './ReportComment/ReportStoryComment';


const StoryMainComment = (props) => {

    const replyComments = props.getReplyComment.filter(reply => props.comment_id.toString().includes(String(reply.comment_id)))
    const [comntEdit, setComntEdit] = useContext(CommentEdit)

    const fc = localStorage.getItem('fc')

    const userID = JSON.parse(localStorage.getItem('userID'))
    const sameUser = userID == props.userID

    const [replyActive, setReplyActive] = useState(null)

    return (
        <div>

            <div className="article-comments-reply">
                <div className="image-holder">
                    <img src={`http://localhost:5000/${props.avatar}`} alt="avatar" className="img-fluid" />
                </div>

                <div className="text-box" id="txt">

                <a href={"/" + props.userID + "/" + props.username} onClick={scrollToTop}><h3>{props.username}</h3></a>

                    <div className="reply-box">
                        <h4>{props.message && props.message.replace(/\/+/g, "'")}</h4>
                        <span>{moment(props.createdAt.split('T')[0]).format('MM-DD-YYYY')}</span>
                    </div>



                    {fc && <ul>
                        {sameUser && <span onClick={props.handleOpen}><li onClick={() => setComntEdit(props)}><a>Edit</a></li></span>}
                        <span onClick={props.executeScroll}><li onClick={() => setReplyActive(props.comment_id)}><a>Reply</a></li></span>
                        <ReportStoryComment story={props}/>
                    </ul>}

                    {/* Reply Comment Form*/}
                    
                    {fc && replyActive === props.comment_id && <StoryReplyFormComment cmntID={props.comment_id} storyID={props.storyID} getComments={props.getComments} getNotifications={props.getNotifications} ref={props.ref} />}

                    {/* Reply Comment */}

                    {replyComments.map((reply, index) => <StoryReplyComment key={index} storyID={props.storyID} userID={reply.user_id} avatar={reply.avatar} replyID={reply.sc_reply_id} username={reply.username} created_at={reply.created_at} sc_reply_text={reply.sc_reply_text} />)}



                </div>
            </div>
        </div>
    );
};

export default StoryMainComment;