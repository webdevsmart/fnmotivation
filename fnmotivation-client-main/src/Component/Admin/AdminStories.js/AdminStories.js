/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import '../MainAdmin/Admin.css'
import { FaCalendarCheck, FaCalendarMinus } from "react-icons/fa";
import moment from 'moment';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../../App';

const AdminStories = () => {

    const [fetchData, setfetchData] = useState(0)

    const fetchFunc = () => {
        setfetchData(fetchData + 10)
    }

    const [loading, setLoading] = useState(false)
    const [load, setLoad] = useState(false)

    const [activeStories, setActiveStories] = useState('')
    const [inActiveStories, setInActiveStories] = useState('')

    const countStories = useCallback(() => {
        setLoading(true)
        fetch(`http://68.183.178.196/api//countStories`, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setActiveStories(data.activeStories[0].active_count)
                setInActiveStories(data.inActiveStories[0].inactive_count)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        countStories()
    }, [countStories])

    const [stories, setStories] = useState([])

    const [active, setActive] = useState('0')
    const [time, setTime] = useState('DESC')
    const [community, setCommunity] = useState(null)

    const handleActive = (value) => {
        setStories([])
        setActive(value)
    }

    const handleTime = (value) => {
        setStories([])
        setTime(value)
    }

    const hanldeCommunity = (value) => {
        setStories([])
        setCommunity(value)
    }

    const token = localStorage.getItem('admiNToken')

    const getStories = useCallback(() => {
        setLoading(true)
        fetch(`http://68.183.178.196/api//allAdminStories/${active}/${time}/${community}?show=` + fetchData, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setStories([...stories, ...data])
                setLoading(false)
            })
    }, [fetchData, active, time, community])

    useEffect(() => {
        getStories()
    }, [getStories])

    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        function change(text) {
            return text.replace("'", " ")
        }
        const searchText = change(e.target.value)
        setSearch(searchText)
    }

    const [query, setquery] = useState([])

    useEffect(() => {
        setLoading(true)
        fetch('http://68.183.178.196/api//searchPost?search=' + search, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setquery(data)
                setLoading(false)
            })
    }, [search])

    const getSearch = useCallback(() => {
        setLoad(true)
        fetch('http://68.183.178.196/api//searchPost?search=' + search, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setquery(data)
                setLoad(false)
            })
    }, [search])

    useEffect(() => {
        getSearch()
    }, [getSearch])

    const [value, setValue] = useState(null)
    const [banLoader, setBanLoader] = useState(null)
    const banStories = (id) => {
        if (value == '0') {
            setBanLoader(id)
            fetch(`http://68.183.178.196/api//banStories/${id}`, {
                method: 'POST',
                headers: {
                    authorization: token
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.affectedRows > 0) {
                        setBanLoader(null)
                        getSearch()
                        countStories()
                        getStories()
                    }
                })
        } else if (value == '1') {
            setBanLoader(id)
            fetch(`http://68.183.178.196/api//unBanStories/${id}`, {
                method: 'POST',
                headers: {
                    authorization: token
                }
            })
                .then(res => res.json())
                .then(data => {
                    setBanLoader(null)
                    countStories()
                    getStories()
                })
        }
    }

    return (
        <section className="m-2">

            <div className="nav-admin text-center">
                <h1>All Stories</h1>
                <div className="d-flex justify-content-center">
                    <h3 className="admin-box-active bg-success"><FaCalendarCheck color="white" className="m-2" /> Active: {load ? <CircularProgress color="#fbc02d" /> : activeStories}</h3>
                    <h3 className="admin-box-inactive bg-danger"><FaCalendarMinus color="white" className="m-2" /> Inactive:  {load ? <CircularProgress color="#fbc02d" /> : inActiveStories}</h3>
                </div>
            </div>

            <div className="d-flex justify-content-center">
                <div className="profile-posts-view mt-5 p-4">
                    <form>
                        <input type="text" onChange={handleSearch} className="form-control" placeholder="Search Posts" />
                        <a><img src={require('../../../images/search-icon.svg').default} alt="searchicon" /></a>
                    </form>
                </div>
            </div>

            <table className="table table-data">
                <thead>
                    <tr>
                        <th scope="col">ID</th>

                        <th scope="col">Title</th>
                        <th scope="col">
                            <select name="status" onChange={(e) => hanldeCommunity(e.target.value)}>
                                <option value="null">All Community</option>
                                <option value="3">Eating Disorder</option>
                                <option value="4">Weight Issues</option>
                                <option value="5">Heart Diseases</option>
                                <option value="6">Anxiety</option>
                                <option value="7">Depression</option>
                                <option value="1">Drug Addiction</option>
                                <option value="8">Insecurity</option>
                                <option value="9">Mental Health</option>
                                <option value="10">Stress</option>
                                <option value="2" >Alchohol Addiction</option>
                                <option value="11" >Smoking</option>
                            </select>
                        </th>
                        <th scope="col">Comments</th>
                        <th scope="col">Username</th>
                        <th scope="col">Thumbnail</th>
                        <th scope="col">Tags</th>
                        <th scope="col">
                            <select name="status" onChange={(e) => handleTime(e.target.value)}>
                                <option className="text-success" value="DESC">Recent</option>
                                <option className="text-danger" value="ASC">Earliest</option>
                            </select>
                        </th>
                        <th scope="col">
                            <select name="status" onChange={(e) => handleActive(e.target.value)}>
                                <option className="text-success" value="0" >Active</option>
                                <option className="text-danger" value="1" >In Active</option>
                            </select>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {search.length !== 0 ?
                        <>
                            {query.map(story =>
                                <tr key={story.story_id}>
                                    <td>{story.story_id}</td>
                                    {story.stories_is_deleted == "0" ?
                                        <Link to={"/post/" + story.story_id + "/" + story.title.replace(/\s/g, '-').substring(0, 60)} onClick={scrollToTop}>
                                            <td>{story.title}</td>
                                        </Link> :
                                        <td>{story.title}</td>}
                                    <td>{story.community_title}</td>
                                    <td><Link to={"/admin/stories/comment/" + story.story_id}><button className="btn btn-warning text-white">Show</button></Link></td>
                                    <td>{story.username}</td>
                                    <td>
                                        {story.post_thumbnail ?
                                            <img src={`http://68.183.178.196/api//${story.post_thumbnail}`} alt="postImage" width="50px" height="50px" className="img-fluid" /> :
                                            <img src={require(`../../../images/com/${story.community_id}.png`).default} alt="postImage" width="50px" height="50px" className="img-fluid" />}
                                    </td>
                                    <td>{story.tags}</td>
                                    <td>{moment(story.stories_created_at.split('T')[0]).format('L')}</td>
                                    <td>
                                        {banLoader === story.story_id ? '...processing...' :
                                            <div className="dropdown">
                                                <select className="btn btn-outlined-danger" name="status" onClick={(e) => setValue(e.target.value)} onChange={() => banStories(story.story_id)}>
                                                    <option selected={story.stories_is_deleted == "0"} className="text-success" value="0">Active</option>
                                                    <option selected={story.stories_is_deleted == "1"} className="text-danger" value="1">Deleted</option>
                                                </select>
                                            </div>}
                                    </td>
                                </tr>)}
                        </>
                        :
                        <>
                            {stories.map(story =>
                                <tr key={story.story_id}>
                                    <td>{story.story_id}</td>
                                    {story.stories_is_deleted == "0" ?
                                        <Link to={"/post/" + story.story_id + "/" + story.title.replace(/\s/g, '-').substring(0, 60)} onClick={scrollToTop}>
                                            <td>{story.title}</td>
                                        </Link> :
                                        <td>{story.title}</td>}
                                    <td>{story.community_title}</td>
                                    <td><Link to={"/admin/stories/comment/" + story.story_id}><button className="btn btn-warning text-white">Show</button></Link></td>
                                    <td>{story.username}</td>
                                    <td>
                                        {story.post_thumbnail ?
                                            <img src={`http://68.183.178.196/api//${story.post_thumbnail}`} alt="postImage" width="50px" height="50px" className="img-fluid" /> :
                                            <img src={require(`../../../images/com/${story.community_id}.png`).default} alt="postImage" width="50px" height="50px" className="img-fluid" />}
                                    </td>
                                    <td>{story.tags}</td>
                                    <td>{moment(story.stories_created_at.split('T')[0]).format('L')}</td>
                                    <td>
                                        {banLoader === story.story_id ? '...processing...' :
                                            <div className="dropdown">
                                                <select className="btn btn-outlined-danger" name="status" onClick={(e) => setValue(e.target.value)} onChange={() => banStories(story.story_id)}>
                                                    <option selected={story.stories_is_deleted == "0"} className="text-success" value="0">Active</option>
                                                    <option selected={story.stories_is_deleted == "1"} className="text-danger" value="1">Deleted</option>
                                                </select>
                                            </div>}
                                    </td>
                                </tr>)}
                        </>}
                </tbody>
            </table>

            <div className="pt-3 pb-5">
                {loading ? <h4 className="text-warning text-center" style={{ cursor: 'pointer' }}><CircularProgress color="#fbc02d" /></h4> : <h4 className="text-warning text-center" style={{ cursor: 'pointer' }} onClick={fetchFunc}>Load More</h4>}
            </div>


        </section>
    );
};

export default AdminStories;