import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

toast.configure()

const StoryReplyFormComment = ({ cmntID, storyID, getComments, getNotifications, ref }) => {

    const notifyReply = () => {
        toast.warning('Posting Comment', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        })

    }




    const userID = localStorage.getItem('userID')
    const { register, handleSubmit, errors } = useForm();
    const token = localStorage.getItem('token')
    const [comment, setComment] = useState([])

    const handleBlur = (e) => {
        if (e.target.name === 'replyComment') {
            setComment({ length: e.target.value.length })
        }
    }
    
    const onSubmit = (data, e )=> {
        function change(text) {
            return text.replace("'", '///')
        }
        const reply = change(data.replyComment)
        fetch('http://68.183.178.196/replyCommentPost', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: token
            },
            body: JSON.stringify({
                replyTXT: reply,
                cmntID: cmntID,
                storyID: storyID,
                userID: userID
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.affectedRows > 0){
                getComments()
                notifyReply()
                e.target.reset();
                getNotifications()
            }
        })
    };

    return (
        <div className="p-5 ml-5 "  ref={ref}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea className="form-control" name="replyComment" onChange={handleBlur} placeholder="Write here...." ref={register({ required: true, maxLength: 500 })} />
                <div className="d-flex justify-content-between p-2">
                    {errors.replyComment?.type === 'maxLength' && <span>Text Limit 500</span>}
                    {errors.replyComment?.type === 'required' && <span>This field is required</span>}
                    <span>{comment.length}/500</span>
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

export default StoryReplyFormComment;