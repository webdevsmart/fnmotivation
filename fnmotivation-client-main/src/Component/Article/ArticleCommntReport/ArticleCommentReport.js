/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import ArticleCommentReportForm from './ArticleCommentReportForm';

const ArticleCommentReport = (props) => {
    
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal)
    return (
        <>
            <span ><li onClick={toggle}><a>Report</a></li></span>

            <Modal isOpen={modal} toggle={toggle}>
                <ArticleCommentReportForm comment={props.comment} toggle={toggle} />
            </Modal>

        </>
    );
};

export default ArticleCommentReport;