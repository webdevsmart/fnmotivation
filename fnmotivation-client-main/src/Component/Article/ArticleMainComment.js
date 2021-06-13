/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useState } from 'react';
import { scrollToTop } from '../../App';
import { ArticleCommentEdit } from './ArticleComment';
import ArticleReplyComment from './ArticleReplyComment';
import ArticleReplyFormComment from './ArticleReplyFormComment';
import moment from 'moment';
import ArticleCommentReport from './ArticleCommntReport/ArticleCommentReport';


const ArticleMainComment = (props) => {

    const replyComments = props.getArticleReplyComment.filter(reply => props.ac_id.toString().includes(String(reply.posts_comments_id)))
    console.log(replyComments)
    const [comntArticleEdit, setArticleComntEdit] = useContext(ArticleCommentEdit)

    const fc = localStorage.getItem('fc')
    const userID = JSON.parse(localStorage.getItem('userID'))
    const sameUser = userID == props.userID
    const [replyActive, setReplyActive] = useState(null)

    return (
        <div className="article-comments-reply">
            <div className="image-holder">
                <img src={`http://68.183.178.196/${props.avatar}`} alt="avatar" className="img-fluid" />
            </div>
            <div className="text-box">
                <a href={"/" + props.userID + "/" + props.username} onClick={scrollToTop}> <h3>{props.username}</h3></a>
                <div className="reply-box">
                    <h4>{props.message && props.message.replace(/\/+/g, "'")}</h4>
                    <span>{moment(props.createdAt.split('T')[0]).format('MM-D-YYYY')}</span>
                </div>


                {fc && <ul>
                    {sameUser && <span onClick={props.handleOpen}><li><a onClick={() => setArticleComntEdit(props)}>Edit</a></li></span>}
                    <span onClick={props.handleOpen}><li onClick={() => setReplyActive(props.ac_id)}><a>Reply</a></li></span>
                    <ArticleCommentReport comment={props} />
                </ul>}

                {fc && replyActive === props.ac_id && <ArticleReplyFormComment getNotifications={props.getNotifications} ac_id={props.ac_id} postID={props.postID} getArticleComments={props.getArticleComments} />}

                {replyComments.map((reply, index) => <ArticleReplyComment key={index} userID={reply.user_id} created_at={reply.created_at} postID={props.postID} replyID={reply.pc_reply_id} username={reply.username} avatar={reply.avatar} pc_reply_text={reply.pc_reply_text} />)}


            </div>
        </div>
    );
};

export default ArticleMainComment;