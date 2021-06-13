/* eslint-disable eqeqeq */
import React, { useContext, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import '../../MainAdmin/Admin.css'
import { FaCalendarMinus, FaArchive } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../../../App';
import { ReportStory } from '../AdminStoryContext/AdminStoryContext';

const AdminStoryReport = () => {

    const report = useContext(ReportStory)

    const { loading, loadingPost, activeReports, countStories, getStories, reports } = report

    const token = localStorage.getItem('admiNToken')

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
                    countStories()
                    getStories()
                }
            })

    }

    const [value, setValue] = useState(null)
    const [banLoaderStory, setBanLoaderStory] = useState(null)
    const banStories = (id) => {
        if (value == '0') {
            setBanLoaderStory(id)
            fetch(`http://68.183.178.196/banStories/${id}`, {
                method: 'POST',
                headers: {
                    authorization: token
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.affectedRows > 0) {
                        setBanLoaderStory(null)
                        countStories()
                        getStories()
                    }
                })
        } else if (value == '1') {
            setBanLoaderStory(id)
            fetch(`http://68.183.178.196/unBanStories/${id}`, {
                method: 'POST',
                headers: {
                    authorization: token
                }
            })
                .then(res => res.json())
                .then(data => {
                    setBanLoaderStory(null)
                    countStories()
                    getStories()
                })
        }
    }

    return (
        <section className="m-2">

            <div className="nav-admin text-center">
                <div className="d-flex justify-content-center">
                    <h3 className="admin-box-inactive bg-danger"><FaCalendarMinus color="white" className="m-2" />Story Reports: {loading ? <CircularProgress color="#fbc02d" /> : activeReports} </h3>
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
                        <th scope="col">StoryStatus</th>
                        <th scope="col">Status</th>
                        <th scope="col">Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {reports.map(rep =>
                        <tr>
                            <td>{rep.story_id}</td>

                            <td><Link to={"/post/" + rep.story_id + "/" + rep.story_title.replace(/\s/g, '-').substring(0, 60)} onClick={scrollToTop}>{rep.story_title.substring(0, 20)} </Link></td>

                            <td><Link to={"/" + rep.story_owner_id + "/" + rep.story_owner_username} onClick={scrollToTop}>{rep.story_owner_fullname}</Link></td>

                            <td>{rep.report_msg}</td>

                            <td> <Link to={"/" + rep.reporter_user_id + "/" + rep.reporter_username.replace(/\s/g, '-').substring(0, 60)} onClick={scrollToTop}>{rep.reporter_fullname}</Link></td>

                            <td>
                                {banLoaderStory === rep.story_id ? '...processing...' :
                                    <div className="dropdown">
                                        <select className="btn btn-outlined-danger" name="status" onClick={(e) => setValue(e.target.value)} onChange={() => banStories(rep.story_id)}>
                                            <option selected={rep.stories_is_deleted == "0"} className="text-success" value="0">Active</option>
                                            <option selected={rep.stories_is_deleted == "1"} className="text-danger" value="1">Deleted</option>
                                        </select>
                                    </div>}
                            </td>

                            <td>{rep.stories_is_deleted == "0" ? 'Active' : 'Resolved'}</td>

                            <td>{banLoader === rep.report_id ? '...Processing...' : <FaArchive onClick={() => deleteReport(rep.report_id)} style={{ cursor: 'pointer' }} color="red" />}</td>
                        </tr>)}

                </tbody>
            </table>

            <div className="pt-3 pb-5">
                {loadingPost ? <h4 className="text-warning text-center" style={{ cursor: 'pointer' }}><CircularProgress color="#fbc02d" /></h4> : <h4 className="text-warning text-center" style={{ cursor: 'pointer' }} onClick={report.fetchFunc}>Load More</h4>}
            </div>


        </section>
    );
};

export default AdminStoryReport;