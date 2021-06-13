/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import ArticleReplyCmntReportForm from './ArticleReplyCmntReportForm';

const ArticleReplyCmntReport = (props) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
        <>
            <span ><li onClick={toggle}><a>Report</a></li></span>

            <Modal isOpen={modal} toggle={toggle}>
                <ArticleReplyCmntReportForm reply={props.reply} toggle={toggle} />
            </Modal>
        </>
    );
};

export default ArticleReplyCmntReport;