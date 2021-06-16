/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import { scrollToTop } from '../../../App';
import '../MainAdmin/Admin.css'
import { FaUserFriends, FaUserTimes } from "react-icons/fa";

const AdminUsers = () => {

    const [fetchData, setfetchData] = useState(0)

    const fetchFunc = () => {
        setfetchData(fetchData + 10)
    }

    const [loading, setLoading] = useState(false)
    const [load, setLoad] = useState(false)

    const [users, setUsers] = useState([])
    const token = localStorage.getItem('admiNToken')

    const [active, setActive] = useState('0')
    const [time, setTime] = useState('DESC')

    const handleActive = (value) => {
        setUsers([])
        setActive(value)
    }

    const handleTime = (value) => {
        setUsers([])
        setTime(value)
    }
    const [activeUser, setActiveUser] = useState('')
    const [inActiveUser, setInActiveUser] = useState('')

    const countUesrs = useCallback(() => {
        setLoad(true)
        fetch(`http://68.183.178.196/api//countUser`, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setActiveUser(data.activeUsers[0].active_count)
                setInActiveUser(data.inActiveUsers[0].inactive_count)
                setLoad(false)
            })
    }, [])

    useEffect(() => {
        countUesrs()
    }, [countUesrs])

    const getUesrs = useCallback(() => {
        setLoading(true)
        fetch(`http://68.183.178.196/api//allUsersInfo/${active}/${time}?show=` + fetchData, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setUsers([...users, ...data])
                setLoading(false)
            })
    }, [fetchData, active, time])

    useEffect(() => {
        getUesrs()
    }, [getUesrs])


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
        const fetchUser = () => {
            setLoading(true)
            fetch('http://68.183.178.196/api//searchUser?search=' + search, {
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
        }
        fetchUser()
    }, [search])

    const [downloadLoad, setDownloadLoad] = useState(false)

    const downloadFile = () => {
        setDownloadLoad(true)
        fetch('http://68.183.178.196/api//adminUserDataExport/', {
            headers: {
                authorization: token
            }
        })
            .then(res => res.blob())
            .then(blob => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = `FNMotivation Users Data (${moment(new Date()).format('MM-DD-YYYY')}).xlsx`; // Here I want to get rid of hardcoded value instead I want filename from server
                link.click();
                link.remove(); //  Probably needed to remove html element after downloading?
                setDownloadLoad(false)
            });
    }
    const [value, setValue] = useState(null)
    const [banLoader, setBanLoader] = useState(null)
    const banUser = (id) => {
        if (value == '0') {
            setBanLoader(id)
            fetch(`http://68.183.178.196/api//banUser/${id}`, {
                method: 'POST',
                headers: {
                    authorization: token
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.affectedRows > 0) {
                        setBanLoader(null)
                        countUesrs()
                        getUesrs()
                    }
                })
        } else if (value == '1') {
            setBanLoader(id)
            fetch(`http://68.183.178.196/api//unBanUser/${id}`, {
                method: 'POST',
                headers: {
                    authorization: token
                }
            })
                .then(res => res.json())
                .then(data => {
                    setBanLoader(null)
                    countUesrs()
                    getUesrs()
                })
        }
    }


    return (
        <section className="m-2">


            <div className="nav-admin text-center">
                <h1>All Users</h1>
                <div className="d-flex justify-content-center p-3">
                    <h3 className="admin-box-active bg-success"><FaUserFriends color="white" className="m-2" /> Active:    {load ? <CircularProgress color="#fbc02d" /> : activeUser}</h3>
                    <h3 className="admin-box-inactive bg-danger"><FaUserTimes color="white" className="m-2" /> Inactive:    {load ? <CircularProgress color="#fbc02d" /> : inActiveUser}</h3>
                </div>
            </div>


            <div className="d-flex justify-content-center">
                <div className="profile-posts-view mt-5">
                    <form>
                        <input type="text" onChange={handleSearch} className="form-control" placeholder="Search Posts" />
                        <a><img src={require('../../../images/search-icon.svg').default} alt="searchicon" /></a>
                    </form>
                </div>
            </div>

            <div className="text-center">
                <b>Export User Data:</b>

                {downloadLoad ?
                    <button disabled className="bg-warning text-white btn ml-2">Processing</button>
                    :
                    <button className="bg-warning text-white btn ml-2" onClick={downloadFile}>Download</button>}

            </div>

            <table className="table table-data mt-5">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Audience</th>
                        <th scope="col">Email</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">
                            <select name="status" onChange={(e) => handleTime(e.target.value)}>
                                <option className="text-success" value="DESC">Recent</option>
                                <option className="text-danger" value="ASC">Earliest</option>
                            </select>
                        </th>
                        <th scope="col">Method</th>
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
                            {query.map(user =>
                                <tr key={user.user_id}>
                                    <td>{user.user_id}</td>
                                    <a href={"/admin/" + user.user_id + "/" + user.username} onClick={scrollToTop}>
                                        <td>{user.fullname}</td>
                                    </a>
                                    <td>{user.username}</td>
                                    <td>{user.role}</td>
                                    <td>{user.email}</td>
                                    <td><img src={`http://68.183.178.196/api//${user.avatar}`} alt="userAvatar" className="img-fluid" width="50" height="50" /></td>
                                    <td>{moment(user.created_at.split('T')[0]).format('L')}</td>
                                    <td>{user.FacebookID && 'Facebook'} {user.GoogleId && 'Gmail'} {!user.GoogleId && !user.FacebookID && 'Email'}</td>
                                    <td>
                                        {banLoader === user.user_id ? '...processing...' :
                                            <div className="dropdown">
                                                <select className="btn btn-outlined-danger" name="status" onClick={(e) => setValue(e.target.value)} onChange={() => banUser(user.user_id)}>
                                                    <option selected={user.is_deleted == "0"} className="text-success" value="0">Active</option>
                                                    <option selected={user.is_deleted == "1"} className="text-danger" value="1" >Deactive</option>
                                                </select>
                                            </div>}
                                    </td>
                                </tr>)}
                        </>
                        :
                        <>
                            {users.map(user =>
                                <tr key={user.user_id}>
                                    <td>{user.user_id}</td>
                                    {user.is_deleted == "0" ? <a href={"/" + user.user_id + "/" + user.username} onClick={scrollToTop}>
                                        <td>{user.fullname}</td>
                                    </a> :
                                        <td>{user.fullname}</td>}
                                    <td>{user.username}</td>
                                    <td>{user.role}</td>
                                    <td>{user.email}</td>
                                    <td><img src={`http://68.183.178.196/api//${user.avatar}`} alt="userAvatar" className="img-fluid" width="50" height="50" /></td>
                                    <td>{moment(user.created_at.split('T')[0]).format('L')}</td>
                                    <td>{user.FacebookID && 'Facebook'} {user.GoogleId && 'Gmail'} {!user.GoogleId && !user.FacebookID && 'Email'}</td>
                                    <td>
                                        {banLoader === user.user_id ? '...processing...' :
                                            <div className="dropdown">
                                                <select className="btn btn-outlined-danger" name="status" onClick={(e) => setValue(e.target.value)} onChange={() => banUser(user.user_id)}>
                                                    <option selected={user.is_deleted == "0"} className="text-success" value="0">Active</option>
                                                    <option selected={user.is_deleted == "1"} className="text-danger" value="1" >Deactive</option>
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

export default AdminUsers;