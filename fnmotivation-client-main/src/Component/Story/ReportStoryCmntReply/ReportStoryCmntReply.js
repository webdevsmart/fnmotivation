/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import ReportStoryCmntReplyForm from './ReportStoryCmntReplyForm';

const ReportStoryCmntReply = (props) => {
    
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
    return (
        <>
            <span ><li onClick={toggle}><a>Report</a></li></span>

            <Modal isOpen={modal} toggle={toggle}>
                <ReportStoryCmntReplyForm reply={props.storyReply}  toggle={toggle} />
            </Modal>
        </>
    );
};

export default ReportStoryCmntReply;