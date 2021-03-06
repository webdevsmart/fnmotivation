/* eslint-disable eqeqeq */
import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../../App';

const AdminStoryCommentReply = (props) => {
    console.log(props)
    const token = localStorage.getItem('admiNToken')

    const [value, setValue] = useState(null)
    const [banLoader, setBanLoader] = useState(null)

    const banReplyComment = (id) => {
        if (value == '0') {
            setBanLoader(id)
            fetch(`http://68.183.178.196/api//banReplyComment/${id}`, {
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
            fetch(`http://68.183.178.196/api//unBanReplyComment/${id}`, {
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
            {props.replyComments.map(rep =>
                <div className="article-comments-reply">
                    <div className="image-holder">
                        <img src={`http://68.183.178.196/api//${rep.avatar}`} alt="" className="img-fluid" />
                    </div>
                    <div className="text-box" id="txt" >
                        <Link to={"/" + rep.user_id + "/" + rep.username} onClick={scrollToTop}><h3>{rep.username}</h3></Link>

                        {banLoader === props.comID ? '...processing...'
                        :
                        <div className="dropdown p-2">
                            <select name="status" onClick={(e) => setValue(e.target.value)} onChange={() => banReplyComment(props.comID)}>
                                <option selected={props.is_deleted == "0"} className="text-success" value="0">Active</option>
                                <option selected={props.is_deleted == "1"} className="text-danger" value="1">Deleted</option>
                            </select>
                        </div>}

                        <div className="reply-box" >
                            <h4>{rep.sc_reply_text}</h4>
                            <span>{moment(rep.created_at.split('T')[0]).format('MM-DD-YYYY')}</span>
                        </div>
                    </div>
                </div>)}
        </>
    );
};

export default AdminStoryCommentReply;