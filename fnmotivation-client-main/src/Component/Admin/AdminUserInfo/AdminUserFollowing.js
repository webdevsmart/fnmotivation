import React, { useEffect, useState, useCallback } from 'react';
import { CircularProgress } from '@material-ui/core';
import moment from 'moment';
import { useParams } from 'react-router';

const AdminUserFollowing = () => {
    let { u_id } = useParams()

    const token = localStorage.getItem('admiNToken')
    const [fetchData, setfetchData] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const fetchFunc = () => {
        setfetchData(fetchData + 10)
    }
    const [folllowing, setFollowing] = useState([])

    const idData = `${u_id},${fetchData}`

    const getFollowers = useCallback( () => {
        setIsLoading(true)
        fetch(`http://localhost:5000/getUserFollowing?id=` + idData, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setFollowing([...folllowing,...data.data])
                setIsLoading(false)
            })
    }, [fetchData, idData])

    useEffect(() => {
        getFollowers()
    }, [getFollowers])
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

                    {folllowing.map(user =>
                        <tr key={user.user_id}>
                            <td>{user.user_id}</td>
                            <td><img src={`http://localhost:5000/${user.avatar}`} alt="user" width="50" height="50" className="img-fluid" /></td>
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

export default AdminUserFollowing;