import React from 'react';
import { scrollToTop } from '../../App';
import ReportStoryCmntReply from './ReportStoryCmntReply/ReportStoryCmntReply'
import moment from 'moment';


const StoryReplyComment = (props) => {

    const fc = localStorage.getItem('fc')
    return (
        <div className="article-comments-reply">
            <div className="image-holder">
                <img src={`http://68.183.178.196/${props.avatar}`} alt="" className="img-fluid" />
            </div>
            <div className="text-box" id="txt" >
                <a href={"/" + props.userID + "/" + props.username} onClick={scrollToTop}><h3>{props.username}</h3></a>

                <div className="reply-box" >
                    <h4>{props.sc_reply_text}</h4>
                    <span>{moment(props.created_at.split('T')[0]).format('MM-DD-YYYY')}</span>
                </div>
                {fc && <ul>
                    <ReportStoryCmntReply storyReply={props} />
                </ul>}
            </div>
        </div>
    );
};

export default StoryReplyComment;