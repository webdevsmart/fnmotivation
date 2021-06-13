import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import ReportStoryForm from './ReportStoryForm';
import { Link, useParams } from "react-router-dom";
const ReportStory = (props) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    let { id } = useParams()

    const userID = JSON.parse(localStorage.getItem('userID'))
    const username = JSON.parse(localStorage.getItem('username'))
    const token = localStorage.getItem('token')

    const deleteStory = (id) => {
        fetch('/deleteParticularStory?id=' + id, {
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
                <>
                    <Link to={"/post/edit/" + id} className="report">Edit</Link>

                    <Link to="#" onClick={() => deleteStory(id)} className="report ml-3" >Delete</Link>
                </>}

            <Modal isOpen={modal} toggle={toggle}>
                <ReportStoryForm story={props.story} toggle={toggle} />
            </Modal>

        </div>
    );
};

export default ReportStory;