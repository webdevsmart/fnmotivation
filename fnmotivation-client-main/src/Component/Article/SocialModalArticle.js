import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { EmailIcon, FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
import { useParams } from 'react-router-dom';
import EmailShare from 'react-email-share-link'

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

const SocialModalArticle = ({open, handleClose, title}) => {

    const classes = useStyles();
    const {articleID} = useParams()
    let url = `https://fnmotivation.com/article/${articleID}`;
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
                        <div>
                            <h3>Share This Post</h3>
                            <FacebookShareButton className="mt-3" url={url} appid={360186812075686}>
                                <FacebookIcon size={50} round={true} />
                            </FacebookShareButton>
                            <TwitterShareButton className="ml-2" url={url} appid={360186812075686}>
                                <TwitterIcon size={50} round={true} />
                            </TwitterShareButton>
                            <EmailShare subject={`FNMotivation-${title}`}
                            
                            body={
                            `Hey,

I would like to share with you an article post from FNMotivation. 

Title: ${title}
${url}`}>

                                {link => (
                                    <a href={link} data-rel="external"><EmailIcon className="ml-2" size={50} round={true} /></a>
                                )}
                            </EmailShare>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default SocialModalArticle;