import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CommentEdit } from './StoryComment';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #FCB040',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

toast.configure()

const StoryEditForm = ({handleClose, open, getComments}) => {

    const classes = useStyles();
    
    const notifyEdited = () => {
        toast.warning('Editing Comment', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        })

    }

    // Edit
    const { register, handleSubmit, errors } = useForm()
    const [comntEdit, setComntEdit] = useContext(CommentEdit)
    const token = localStorage.getItem('token')

    const [comment, setComment] = useState([])

    const handleBlur = (e) => {
        if (e.target.name === 'comment') {
            setComment({ length: e.target.value.length })
        }
    }

    const onEditSubmit = (data, e) => {
        function change(text) {
            return text.replace("'", '///')
        }
        const reply = change(data.comment)
        fetch('http://68.183.178.196/api//editStoryComment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: token,
            },

            body: JSON.stringify({
                cmntID: comntEdit.comment_id,
                commentText: reply
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.affectedRows > 0) {
                    e.target.reset();
                    setComntEdit([])
                    getComments()
                    notifyEdited()
                }
            })
    }


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                    <div className="article-comments-write mt-5">
                        <h3>Edit Comment</h3>
                        <form onSubmit={handleSubmit(onEditSubmit)}>
                            <textarea className="form-control" name="comment" defaultValue={comntEdit.message} onChange={handleBlur} placeholder="Write here...." ref={register({ required: true, maxLength: 500 })} />
                            {errors.comment?.type === 'required' && <span>This field is required</span>}
                            {errors.comment?.type === 'maxLength' && <span>Text length can't be more that 500</span>}
                            <span>{comment.length}/500</span>
                            <div>
                                <button
                                    className="btn btn-warning text-white mt-3 pl-5 pr-5 pt-3 pb-3"
                                    type="submit">Edit</button>
                                <button onClick={() => setComntEdit([])}
                                    className="btn btn-warning text-white mt-3  ml-5 pl-5 pr-5 pt-3 pb-3"
                                >Cancel</button>
                            </div>

                        </form>
                    </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default StoryEditForm;