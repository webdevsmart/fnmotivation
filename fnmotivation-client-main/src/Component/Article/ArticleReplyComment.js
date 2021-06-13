import React from 'react';
import { scrollToTop } from '../../App';
import moment from 'moment';
import ArticleReplyCmntReport from './ArticleReplyCmntReport/ArticleReplyCmntReport';

const ArticleReplyComment = (props) => {

    const fc = localStorage.getItem('fc')

    return (
        <div className="article-comments-reply">
            <div className="image-holder">
                <img src={`http://localhost:5000/${props.avatar}`} alt="avatar" className="img-fluid" />
            </div>
            <div className="text-box" id="txt">
                <a href={"/" + props.userID + "/" + props.username} onClick={scrollToTop}><h3>{props.username}</h3></a>

                <div className="reply-box" >
                    <h4>{props.pc_reply_text}</h4>
                    <span>{moment(props.created_at.split('T')[0]).format('MM-D-YYYY')}</span>
                </div>

                {fc && <ul>
                    <ArticleReplyCmntReport reply={props} />
                </ul>}


            </div>
        </div>
    );
};

export default ArticleReplyComment;