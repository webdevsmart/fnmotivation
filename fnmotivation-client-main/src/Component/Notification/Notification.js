import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import NotificationStoryFollower from './NotificationStoryFollower';
import NotificationStoryLikes from './NotificationStoryLikes';
import NotificationStoryComments from './NotificationStoryComments';

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

const Notification = ({ open, handleClose }) => {

    const classes = useStyles();
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
                        <NotificationStoryFollower />
                        <NotificationStoryLikes />
                        <NotificationStoryComments />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default Notification;