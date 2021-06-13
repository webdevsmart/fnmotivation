import React, { useEffect, useState, useCallback } from 'react';
import { CircularProgress } from '@material-ui/core';
import moment from 'moment';
import { useParams } from 'react-router';

const AdminUserStories = () => {

    let { u_id } = useParams()

    const token = localStorage.getItem('admiNToken')
    const [fetchData, setfetchData] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const fetchFunc = () => {
        setfetchData(fetchData + 10)
    }

    const [stories, setStories] = useState([])

    const getStories = useCallback(() => {
        setIsLoading(true)
        fetch(`http://localhost:5000/userStories/${u_id}?show=` + fetchData, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setStories([...stories, ...data])
                setIsLoading(false)
            })
    }, [fetchData, token])

    useEffect(() => {
        getStories()
    }, [getStories, u_id])

    const [search, setSearch] = useState('')
    const [queryStories, setQueryStories] = useState([])

    const getStoriesQuery = useCallback(() => {
        setIsLoading(true)
        fetch(`http://localhost:5000/userStoriesQuery/${u_id}?search=` + search, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setQueryStories(data)
                setIsLoading(false)
            })
    }, [search])

    useEffect(() => {
        getStoriesQuery()
    }, [getStoriesQuery])


    const handleSearch = (e) => {
        function change(text) {
            return text.replace("'", " ")
        }
        const searchText = change(e.target.value)
        setSearch(searchText)
    }

    return (
        <section>

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
                        <th scope="col">Summary</th>
                        <th scope="col">Thumbnail</th>
                        <th scope="col">Tags</th>
                        <th scope="col">Created</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {search.length !== 0 ?
                        <>
                            {queryStories.map(story =>
                                <tr key={story.story_id}>
                                    <td>{story.story_id}</td>
                                    <td>{story.title}</td>
                                    <td>{story.shory_story ? story.shory_story : 'No Summary'}</td>
                                    <td><img src={`http://localhost:5000/${story.post_thumbnail}`} alt="story" className="img-fluid" width="50" height="50" /></td>
                                    <td>{story.tags}</td>
                                    <td>{moment(story.created_at.split('T')[0]).format('L')}</td>
                                    <td>
                                        {story.is_deleted == '0' ?
                                            <span className="badge bg-success text-white">Active</span>
                                            :
                                            <span className="badge bg-warning text-white">Deleted</span>}
                                    </td>
                                </tr>)}
                        </>
                        :
                        <>
                            {stories.map(story =>
                                <tr key={story.story_id}>
                                    <td>{story.story_id}</td>
                                    <td>{story.title}</td>
                                    <td>{story.shory_story ? story.shory_story : 'No Summary'}</td>
                                    <td><img src={`http://localhost:5000/${story.post_thumbnail}`} alt="story" className="img-fluid" width="50" height="50" /></td>
                                    <td>{story.tags}</td>
                                    <td>{moment(story.created_at.split('T')[0]).format('L')}</td>
                                    <td>
                                        {story.is_deleted == '0' ?
                                            <span className="badge bg-success text-white">Active</span>
                                            :
                                            <span className="badge bg-warning text-white">Deleted</span>}
                                    </td>
                                </tr>)}
                        </>}
                </tbody>
            </table>

            <div className="pt-3 pb-5">
                {isLoading ? <h4 className="text-warning text-center" style={{ cursor: 'pointer' }}><CircularProgress color="#fbc02d" /></h4> : <h4 className="text-warning text-center" style={{ cursor: 'pointer' }} onClick={fetchFunc}>Load More</h4>}
            </div>

        </section>
    );
};

export default AdminUserStories;