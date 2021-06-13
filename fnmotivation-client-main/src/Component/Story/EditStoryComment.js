import React, { useState,useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Changes } from '../Body/AllStory';

const EditStoryComment = ({ cmnt, getComments }) => {

    const [comntEdit, setComntEdit] = useContext(Changes)

    const token = localStorage.getItem('token')

    const [comment, setComment] = useState([])

    const { register, handleSubmit, errors } = useForm();

    const handleBlur = (e) => {
        if (e.target.name === 'comment') {
            setComment({ length: e.target.value.length })
        }
    }

    const onSubmit = data => {
        

        fetch('http://68.183.178.196/editStoryComment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: token,
            },

            body: JSON.stringify({
                storyID: cmnt.story_id,
                userID: cmnt.user_id,
                commentText: data.comment
            })
        })
            .then(res => res.json())
            .then(data => {
                
                if(data.affectedRows > 0){
                    getComments()
                    setComntEdit([])
                }
            })
    }

    return (
        
        <div className="p-5">
            {comntEdit.length !== 0 &&
                <form onSubmit={handleSubmit(onSubmit)}>
                <textarea className="form-control" name="comment" defaultValue={cmnt.message} onChange={handleBlur} placeholder="Write here...." ref={register({ required: true, maxLength: 500 })} />
                {errors.comment?.type === 'required' && <span>This field is required</span>}
                {errors.comment?.type === 'maxLength' && <span>Text length can't be more that 500</span>}
                <span>{comment.length}/500</span>
                <div className="comment-post">
                    <button
                        className="btn btn-warning text-white mt-3 "
                        type="submit">Post</button>
                    <button onClick={()=> setComntEdit([])}
                        className="btn btn-warning text-white mt-3 ml-2"
                        >Cancel</button>

                </div>
            </form>}
        </div>
    );
};

export default EditStoryComment;