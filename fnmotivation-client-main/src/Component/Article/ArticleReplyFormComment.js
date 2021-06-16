import React, {useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()


const ArticleReplyFormComment = ({ac_id, postID, getArticleComments, getNotifications}) => {
    const notifyCommentReply = () => {
        toast.warning('Posting Comment', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        })

    }
    const token = localStorage.getItem('token')
    const userID = localStorage.getItem('userID')
    const { register, handleSubmit, errors } = useForm();
    const [replyComment, setReplyComment] = useState([])
    const handleBlur = (e) => {
        if (e.target.name === 'replyArticleComment') {
            setReplyComment({ length: e.target.value.length })
        }
    }
    const onSubmit = (data, e) =>{
        
        function change(text) {
            return text.replace("'", '///')
        }
        const reply = change(data.replyArticleComment)
        fetch('http://68.183.178.196/api//replyArticleCommentPost', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: token
            },
            body: JSON.stringify({
                replyTXT: reply,
                articleCmntID: ac_id,
                postID: postID,
                userID: userID
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.affectedRows > 0){
                e.target.reset();
                getArticleComments()
                notifyCommentReply()
                getNotifications()
            }
        })
    }
    return (
        <div className="p-5 ml-5">
        <form onSubmit={handleSubmit(onSubmit)}>
            <textarea className="form-control" name="replyArticleComment" onChange={handleBlur} placeholder="Write here...." ref={register({ required: true, maxLength: 500 })} />
            <div className="d-flex justify-content-between p-2">
                {errors.replyComment?.type === 'maxLength' && <span>Text Limit 500</span>}
                {errors.replyComment?.type === 'required' && <span>This field is required</span>}
                <span>{replyComment.length}/500</span>
            </div>
            <div className="comment-post">
                <button
                    className="btn btn-warning text-white "
                    type="submit">Reply</button>
            </div>
        </form>
    </div>
    );
};

export default ArticleReplyFormComment;