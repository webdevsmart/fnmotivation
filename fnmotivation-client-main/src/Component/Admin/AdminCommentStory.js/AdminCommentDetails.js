/* eslint-disable eqeqeq */
import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../../App';
import AdminStoryCommentReply from './AdminStoryCommentReply';

const AdminCommentDetails = (props) => {

    const replyComments = props.replyComment.filter(reply => props.comID.toString().includes(String(reply.comment_id)))
    const token = localStorage.getItem('admiNToken')
    console.log(replyComments)

    const [value, setValue] = useState(null)
    const [banLoader, setBanLoader] = useState(null)

    const banComment = (id) => {
        console.log()
        if (value == '0') {
            setBanLoader(id)
            fetch(`http://68.183.178.196/api//banComment/${id}`, {
                method: 'POST',
                headers: {
                    authorization: token
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.affectedRows > 0) {
                        setBanLoader(null)
                        props.getComments()
                    }
                })
        } else if (value == '1') {

            setBanLoader(id)
            fetch(`http://68.183.178.196/api//unBanComment/${id}`, {
                method: 'POST',
                headers: {
                    authorization: token
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.affectedRows > 0) {
                        setBanLoader(null)
                        props.getComments()
                    }
                })

        }
    }

    return (
        <>

            <div className="article-comments-reply">

                <div className="image-holder">
                    <img src={`http://68.183.178.196/api//${props.avatar}`} alt="avatar" className="img-fluid" />
                </div>

                <div className="text-box" id="txt">

                    <Link to={"/" + props.user_id + "/" + props.username} onClick={scrollToTop}><h3>{props.username}</h3></Link>

                    {banLoader === props.comID ? <p className="p-2">...processing...</p>
                        :
                        <div className="dropdown p-2">
                            <select name="status" onClick={(e) => setValue(e.target.value)} onChange={() => banComment(props.comID)}>
                                <option selected={props.is_deleted == "0"} className="text-success" value="0">Active</option>
                                <option selected={props.is_deleted == "1"} className="text-danger" value="1">Deleted</option>
                            </select>
                        </div>}

                    <div className="reply-box">
                        <h4>{props.message}</h4>
                        <span>{moment(props.time.split('T')[0]).format('MM-DD-YYYY')}</span>
                    </div>

                    <AdminStoryCommentReply replyComments={replyComments} getComments={props.getComments} />

                </div>
            </div>

        </>
    );
};

export default AdminCommentDetails;