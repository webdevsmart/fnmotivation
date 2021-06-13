import React, { useEffect, useState, useCallback } from 'react';
import { CircularProgress } from '@material-ui/core';
import moment from 'moment';
import { useParams } from 'react-router';

const AdminUserBookMarks = () => {
    let { u_id } = useParams()

    const token = localStorage.getItem('admiNToken')
    const [fetchData, setfetchData] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const fetchFunc = () => {
        setfetchData(fetchData + 10)
    }
    const [userBookMark, setUserBookMark] = useState([])

    const idData = `${u_id},${fetchData}`

    const getBookMark = useCallback(() => {
        setIsLoading(true)
        fetch('http://localhost:5000/getUserbookmarks?id=' + idData, {
            method: 'GET'
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('Colud not fetch data')
                }
                return res.json()
            })
            .then(data => {
                setUserBookMark([...userBookMark, ...data.data])
                setIsLoading(false)
            })
    }, [fetchData])

    useEffect(() => {
        getBookMark()
    }, [getBookMark, u_id])

    return (

        <section className="p-5">

            <table className="table table-data">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Created</th>
                    </tr>
                </thead>
                <tbody>

                    {userBookMark.map(story =>
                        <tr key={story.story_id}>
                            <td>{story.story_id}</td>
                            <td>{story.title}</td>
                            <td>{moment(story.created_at.split('T')[0]).format('L')}</td>
                        </tr>)}
                </tbody>
            </table>

            <div className="pt-3 pb-5">
                {isLoading ? <h4 className="text-warning text-center" style={{ cursor: 'pointer' }}><CircularProgress color="#fbc02d" /></h4> : <h4 className="text-warning text-center" style={{ cursor: 'pointer' }} onClick={fetchFunc}>Load More</h4>}
            </div>

        </section>
    );
};

export default AdminUserBookMarks;