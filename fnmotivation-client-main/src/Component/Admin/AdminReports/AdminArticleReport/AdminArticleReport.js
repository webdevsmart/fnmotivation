/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useCallback, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import '../../MainAdmin/Admin.css'
import { FaCalendarMinus, FaArchive } from "react-icons/fa";
import moment from 'moment';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../../../App';

const AdminArticleReport = () => {

    const [fetchData, setfetchData] = useState(0)

    const fetchFunc = () => {
        setfetchData(fetchData + 10)
    }

    const [loading, setLoading] = useState(false)
    const [loadingPost, setLoadingPost] = useState(false)

    const [activeReports, setActiveReports] = useState('')

    const countArticles = useCallback(() => {
        setLoading(true)
        fetch(`/countArticleReports`, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setActiveReports(data[0].post_report)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        countArticles()
    }, [countArticles])

    const [reports, setReports] = useState([])

    const token = localStorage.getItem('admiNToken')

    const getArticles = useCallback(() => {
        setLoadingPost(true)
        fetch(`/articleReportsDetails/?show=` + fetchData, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setReports([...reports, ...data])
                setLoadingPost(false)
            })
    }, [fetchData])

    useEffect(() => {
        getArticles()
    }, [getArticles])


    const [banLoader, setBanLoader] = useState(null)
    const deleteReport = (id) => {
        setBanLoader(id)
        fetch(`/deleteReport/${id}`, {
            method: 'POST',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.affectedRows > 0) {
                    setBanLoader(null)
                    countArticles()
                    getArticles()
                }
            })

    }

    const [value, setValue] = useState(null)
    const [banLoaderArticle, setBanLoaderArticle] = useState(null)
    const banArticles = (id) => {
        if (value == '0') {
            setBanLoaderArticle(id)
            fetch(`/banArticles/${id}`, {
                method: 'POST',
                headers: {
                    authorization: token
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.affectedRows > 0) {
                        setBanLoader(null)
                        countArticles()
                        getArticles()
                    }
                })
        } else if (value == '1') {
            setBanLoaderArticle(id)
            fetch(`/unBanArticles/${id}`, {
                method: 'POST',
                headers: {
                    authorization: token
                }
            })
                .then(res => res.json())
                .then(data => {
                    setBanLoader(null)
                    countArticles()
                    getArticles()
                })
        }
    }

    return (
        <section className="m-2">

            <div className="nav-admin text-center">
                <div className="d-flex justify-content-center">
                    <h3 className="admin-box-inactive bg-danger"><FaCalendarMinus color="white" className="m-2" />Articles Reports:  {loading ? <CircularProgress color="#fbc02d" /> : activeReports} </h3>
                </div>
            </div>

            <table className="table table-data">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Owner</th>
                        <th scope="col">Cause</th>
                        <th scope="col">Reporter</th>
                        <th scope="col">Status</th>
                        <th scope="col">ArticleStatus</th>
                        <th scope="col">Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {reports.map(rep =>
                        <tr>
                            <td>{rep.post_id}</td>

                            <td><Link to={"/article/" + rep.post_id} onClick={scrollToTop}>{rep.post_title.substring(0, 20)}... </Link></td>

                            <td><Link to={"/" + rep.story_owner_id + "/" + rep.post_owner_username} onClick={scrollToTop}>{rep.post_owner_fullname}</Link></td>

                            <td>{rep.report_msg}</td>

                            <td> <Link to={"/" + rep.reporter_user_id + "/" + rep.reporter_username.replace(/\s/g, '-').substring(0, 60)} onClick={scrollToTop}>{rep.reporter_fullname}</Link></td>

                            <td>
                                {banLoader === rep.post_id ? '...processing...' :
                                    <div className="dropdown">
                                        <select className="btn btn-outlined-danger" name="status" onClick={(e) => setValue(e.target.value)} onChange={() => banArticles(rep.post_id)}>
                                            <option selected={rep.post_is_deleted == "0"} className="text-success" value="0">Active</option>
                                            <option selected={rep.post_is_deleted == "1"} className="text-danger" value="1">Deleted</option>
                                        </select>
                                    </div>}
                            </td>

                            <td>{rep.post_is_deleted == "0" ? 'Active' : 'Resolved'}</td>

                            <td>{banLoader === rep.report_id ? '...Processing...' : <FaArchive onClick={() => deleteReport(rep.report_id)} style={{ cursor: 'pointer' }} color="red" />}</td>
                        </tr>)}

                </tbody>
            </table>

            <div className="pt-3 pb-5">
                {loadingPost ? <h4 className="text-warning text-center" style={{ cursor: 'pointer' }}><CircularProgress color="#fbc02d" /></h4> : <h4 className="text-warning text-center" style={{ cursor: 'pointer' }} onClick={fetchFunc}>Load More</h4>}
            </div>


        </section>
    );
};

export default AdminArticleReport;