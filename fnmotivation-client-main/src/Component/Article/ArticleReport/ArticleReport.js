import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Modal } from 'reactstrap';
import ArticleReportForm from './ArticleReportForm';

const ArticleReport = (props) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    let {articleID} = useParams()
    const userID = JSON.parse(localStorage.getItem('userID'))
    const username = JSON.parse(localStorage.getItem('username'))
    const token = localStorage.getItem('token')

    const deleteStory = (id) => {
        fetch('http://68.183.178.196/api//deleteParticularArticle?id=' + id, {
            method: 'POST',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.affectedRows > 0) {
                    window.location = `/user/${username}`
                }
            })
    }

    return (
        <div>
            <p className="report" onClick={toggle}>Report</p>

            {props.user_id === userID &&
                    <Link to="#" onClick={() => deleteStory(articleID)} className="report" >Delete</Link>}

            <Modal isOpen={modal} toggle={toggle}>
                <ArticleReportForm  article={props.article} toggle={toggle} />
            </Modal>

        </div>
    );
};

export default ArticleReport;