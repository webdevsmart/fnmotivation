/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { FaCalendarMinus, FaArchive } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../../../App';

const AdminStoryCmntReport = () => {

    const [fetchData, setfetchData] = useState(0)

    const fetchFunc = () => {
        setfetchData(fetchData + 10)
    }

    const [loading, setLoading] = useState(false)
    const [load, setLoad] = useState(false)

    const [activeComments, setActiveComments] = useState('')

    const countComments = useCallback(() => {
        setLoad(true)
        fetch(`http://68.183.178.196/countStoryCmntReports`, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setActiveComments(data[0].story_comment_report)
                setLoad(false)
            })
    }, [])

    useEffect(() => {
        countComments()
    }, [countComments])

    const [comments, setComments] = useState([])
    const token = localStorage.getItem('admiNToken')

    const getComments = useCallback(() => {
        setLoading(true)
        fetch(`http://68.183.178.196/storyReportCmntDetails/?show=` + fetchData, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setComments([...comments, ...data])
                setLoading(false)
            })
    }, [fetchData])

    useEffect(() => {
        getComments()
    }, [getComments])

    const [value, setValue] = useState(null)
    const [banLoaderComment, setBanLoaderComment] = useState(null)
    const banStories = (id) => {
        if (value == '0') {
            setBanLoaderComment(id)
            fetch(`http://68.183.178.196/banComment/${id}`, {
                method: 'POST',
                headers: {
                    authorization: token
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.affectedRows > 0) {
                        setBanLoaderComment(null)
                        countComments()
                        getComments()
                    }
                })
        } else if (value == '1') {
            setBanLoaderComment(id)
            fetch(`http://68.183.178.196/unBanComment/${id}`, {
                method: 'POST',
                headers: {
                    authorization: token
                }
            })
                .then(res => res.json())
                .then(data => {
                    setBanLoaderComment(null)
                    countComments()
                    getComments()
                })
        }
    }

    //Delete Report
    const [banLoader, setBanLoader] = useState(null)
    const deleteReport = (id) => {
        setBanLoader(id)
        fetch(`http://68.183.178.196/deleteReport/${id}`, {
            method: 'POST',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.affectedRows > 0) {
                    setBanLoader(null)
                    countComments()
                    getComments()
                }
            })

    }

    return (
        <section className="m-2">

            <div className="nav-admin text-center">
                <div className="d-flex justify-content-center">
                    <h3 className="admin-box-inactive bg-danger"><FaCalendarMinus color="white" className="m-2" />Story Comment Reports: {load ? <CircularProgress color="#fbc02d" /> : activeComments} </h3>
                </div>
            </div>

            <table className="table table-data">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Comment</th>
                        <th scope="col">Owner</th>
                        <th scope="col">Cause</th>
                        <th scope="col">Reporter</th>
                        <th scope="col">CommentStatus</th>
                        <th scope="col">Status</th>
                        <th scope="col">Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {comments.map(rep =>
                        <tr key={rep.comment_id}>
                            <td>{rep.story_id}</td>
                            <td>{rep.message}</td>
                             <td><Link to={"/" + rep.comment_owner_id + "/" + rep.comment_owner_username} onClick={scrollToTop}>{rep.commment_owner_fullname}</Link></td>
                            <td>{rep.report_msg}</td>
                             <td><Link to={"/" + rep.reporter_user_id + "/" + rep.reporter_username} onClick={scrollToTop}>{rep.reporter_fullname}</Link></td>
                            <td>
                                {banLoaderComment === rep.comment_id ? '...processing...' :
                                    <div className="dropdown">
                                        <select className="btn btn-outlined-danger" name="status" onClick={(e) => setValue(e.target.value)} onChange={() => banStories(rep.comment_id)}>
                                            <option selected={rep.comment_is_deleted == "0"} className="text-success" value="0">Active</option>
                                            <option selected={rep.comment_is_deleted == "1"} className="text-danger" value="1">Deleted</option>
                                        </select>
                                    </div>}
                            </td>
                            <td>{rep.comment_is_deleted == "0" ? 'Active' : 'Resolved'}</td>
                            <td>{banLoader === rep.report_id ? '...Processing...' : <FaArchive onClick={() => deleteReport(rep.report_id)} style={{ cursor: 'pointer' }} color="red" />}</td>
                        </tr>)}

                </tbody>
            </table>

            <div className="pt-3 pb-5">
                {loading ? <h4 className="text-warning text-center" style={{ cursor: 'pointer' }}><CircularProgress color="#fbc02d" /></h4> : <h4 className="text-warning text-center" style={{ cursor: 'pointer' }} onClick={fetchFunc}>Load More</h4>}
            </div>


        </section>
    );
};

export default AdminStoryCmntReport;