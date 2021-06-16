import React, { useEffect, useState, useCallback } from 'react';
import { CircularProgress } from '@material-ui/core';
import moment from 'moment';
import { useParams } from 'react-router';


const AdminUserFollower = () => {
    let { u_id } = useParams()

    const token = localStorage.getItem('admiNToken')
    const [fetchData, setfetchData] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const fetchFunc = () => {
        setfetchData(fetchData + 10)
    }

    const [followers, setFollowers] = useState([])

    const idData = `${u_id},${fetchData}`

    const getFollowers = useCallback(() => {
        setIsLoading(true)
        fetch('http://68.183.178.196/api//getUserFollower?id=' + idData,{
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setFollowers([...followers, ...data.data])
                setIsLoading(false)
            })
    }, [fetchData, idData])

    useEffect(() => {
        getFollowers()
    }, [getFollowers, u_id])

    return (
        <section className="p-5">

            <table className="table table-data">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Profile Picture</th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                    </tr>
                </thead>
                <tbody>

                    {followers.map(user =>
                        <tr key={user.user_id}>
                            <td>{user.user_id}</td>
                            <td><img src={`http://68.183.178.196/api//${user.avatar}`} alt="user" width="50" height="50" className="img-fluid" /></td>
                            <td>{user.fullname}</td>
                            <td>{user.username}</td>
                        </tr>)}
                </tbody>
            </table>

            <div className="pt-3 pb-5">
                {isLoading ? <h4 className="text-warning text-center" style={{ cursor: 'pointer' }}><CircularProgress color="#fbc02d" /></h4> : <h4 className="text-warning text-center" style={{ cursor: 'pointer' }} onClick={fetchFunc}>Load More</h4>}
            </div>

        </section>
    );
};

export default AdminUserFollower;