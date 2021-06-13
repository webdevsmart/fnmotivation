/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import moment from 'moment';
import '../MainAdmin/Admin.css'
import { FaExternalLinkSquareAlt, FaExternalLinkAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { SearchSharp } from '@material-ui/icons';

const AdminArticles = () => {
    const [fetchData, setfetchData] = useState(0)

    const fetchFunc = () => {
        setfetchData(fetchData + 10)
    }

    const [loading, setLoading] = useState(false)
    const [load, setLoad] = useState(false)

    const [activeArticles, setActiveArticles] = useState('')
    const [inActiveArticles, setInActiveArticles] = useState('')

    const countAricles = useCallback(() => {
        setLoad(true)
        fetch(`http://localhost:5000/countArticles`, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setActiveArticles(data.activeArticles[0].active_count)
                setInActiveArticles(data.inActiveArticles[0].inactive_count)
                setLoad(false)
            })
    }, [])

    useEffect(() => {
        countAricles()
    }, [countAricles])

    const [articles, setarticles] = useState([])
    const [active, setActive] = useState('0')
    const [time, setTime] = useState('DESC')
    const [community, setCommunity] = useState(null)

    const handleActive = (value) => {
        setarticles([])
        setActive(value)
    }

    const handleTime = (value) => {
        setarticles([])
        setTime(value)
    }
    const hanldeCommunity = (value) => {
        setarticles([])
        setCommunity(value)
    }

    const token = localStorage.getItem('admiNToken')


    const getArticles = useCallback(() => {
        setLoading(true)
        fetch(`http://localhost:5000/allAdminArticle/${active}/${time}/${community}?show=` + fetchData, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setarticles([...articles, ...data])
                setLoading(false)
            })
    }, [fetchData, active, time, community])

    useEffect(() => {
        getArticles()
    }, [getArticles])

    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        function change(text) {
            return text.replace("'", " ")
        }
        const searchText = change(e.target.value)
        setSearch(searchText)
    }

    const [query, setquery] = useState([])

    const getSearch = useCallback(() => {
        setLoading(true)
        fetch('http://localhost:5000/searchArticle?search=' + search, {
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
    }, [SearchSharp])

    useEffect(() => {
        getSearch()
    }, [getSearch])

    const [value, setValue] = useState(null)
    const [banLoader, setBanLoader] = useState(null)
    const banArticles = (id) => {
        if (value == '0') {
            setBanLoader(id)
            fetch(`http://localhost:5000/banArticles/${id}`, {
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
                        countAricles()
                        getArticles()
                    }
                })
        } else if (value == '1') {
            setBanLoader(id)
            fetch(`http://localhost:5000/unBanArticles/${id}`, {
                method: 'POST',
                headers: {
                    authorization: token
                }
            })
                .then(res => res.json())
                .then(data => {
                    setBanLoader(null)
                    countAricles()
                    getArticles()
                })
        }
    }

    return (
        <section className="m-2">

                <div className="nav-admin text-center">
                    <h1>All Articles</h1>
                    <div className="d-flex justify-content-center">
                        <h3 className="admin-box-active bg-success"><FaExternalLinkSquareAlt color="white" className="m-2" /> Active: {load ? <CircularProgress color="#fbc02d" /> : activeArticles}</h3>
                        <h3 className="admin-box-inactive bg-danger"><FaExternalLinkAlt color="white" className="m-2" /> Inactive:  {load ? <CircularProgress color="#fbc02d" /> : inActiveArticles}</h3>
                    </div>
                </div>

            <div className="d-flex justify-content-center">
                <div className="profile-posts-view mt-5 p-4">
                    <form>
                        <input type="text" onChange={handleSearch} className="form-control" placeholder="Search Articles" />
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
                        <th scope="col">Link</th>
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
                            {query.map(article =>
                                <tr key={article.post_id}>
                                    <td>{article.post_id}</td>
                                    {article.post_is_deletd == "0" ?
                                        <Link to={"/article/" + article.post_id}>
                                            <td>{article.title}</td>
                                        </Link> :
                                        <td>{article.title}</td>}
                                    <td>{article.community_title}</td>
                                    <td><Link to={"/admin/articles/comment/" + article.post_id}><button className="btn btn-warning text-white">Show</button></Link></td>
                                    <td>{article.redirect_link}</td>
                                    <td>{moment(article.post_created_at.split('T')[0]).format('L')}</td>
                                    <td>
                                        {banLoader === article.post_id ? '...processing...' :
                                            <div className="dropdown">
                                                <select className="btn btn-outlined-danger" name="status" onClick={(e) => setValue(e.target.value)} onChange={() => banArticles(article.post_id)}>
                                                    <option selected={article.post_is_deleted == "0"} className="text-success" value="0">Active</option>
                                                    <option selected={article.post_is_deleted == "1"} className="text-danger" value="1">Deleted</option>
                                                </select>
                                            </div>}
                                    </td>
                                </tr>)}
                        </>
                        :
                        <>
                            {articles.map(article =>
                                <tr key={article.post_id}>
                                    <td>{article.post_id}</td>
                                    {article.post_is_deleted == "0" ?
                                        <Link to={"/article/" + article.post_id}>
                                            <td>{article.title}</td>
                                        </Link> :
                                        <td>{article.title}</td>}
                                    <td>{article.community_title}</td>
                                    <td><Link to={"/admin/articles/comment/" + article.post_id}><button className="btn btn-warning text-white">Show</button></Link></td>
                                    <td>{article.redirect_link}</td>
                                    <td>{moment(article.post_created_at.split('T')[0]).format('L')}</td>
                                    <td>
                                        {banLoader === article.post_id ? '...processing...' :
                                            <div className="dropdown">
                                                <select className="btn btn-outlined-danger" name="status" onClick={(e) => setValue(e.target.value)} onChange={() => banArticles(article.post_id)}>
                                                    <option selected={article.post_is_deleted == "0"} className="text-success" value="0">Active</option>
                                                    <option selected={article.post_is_deleted == "1"} className="text-danger" value="1">Deleted</option>
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

export default AdminArticles;