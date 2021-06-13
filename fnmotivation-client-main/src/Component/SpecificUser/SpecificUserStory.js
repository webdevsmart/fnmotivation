/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../App';
import { SpecificUserContext } from '../contexts/User/specificUserContext';
import moment from 'moment';
import { CircularProgress } from '@material-ui/core';

const SpecificUserStory = ({ userAllStory, fetchFunc, loading }) => {

    const userAllData = useContext(SpecificUserContext)

    const [searchTxt, setSearchTxt] = useState([])

    const handleChange = (e) => {
        function change(text) {
            return text.replace("'", " ")
        }
        const reply = change(e.target.value)
        setSearchTxt(reply)
    }

    const { userID } = useContext(SpecificUserContext)

    //SEacrhc Post of a User

    const [userSearchAllStory, setSearchUserAllStory] = useState([])

    const searchID = `${userID},${searchTxt}`

    const getUserSearchAllStory = useCallback(  () => {

        fetch('http://68.183.178.196/getUserSearchAllStory?search=' + searchID)
            .then(res => res.json())
            .then(data => {
                setSearchUserAllStory(data)
            })
    }, [searchID])

    useEffect(() => {
        getUserSearchAllStory()
    }, [getUserSearchAllStory])




    return (

        <div>
            <div className="profile-posts-view">
                <form>
                    <input type="text" onChange={handleChange} className="form-control" placeholder="Search Posts" />
                    <a><img src={require('../../images/search-icon.svg').default} alt="searchicon" /></a>
                </form>
                <a className="view-all" href="/">View all posts</a>
            </div>
            <div className="profile-posts-inner">
                <div className="table-responsive">
                    <table >
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category <img src={require('../../images/double-arrow.svg').default} alt="" /></th>
                                <th>Date <img src={require('../../images/double-arrow.svg').default} alt="" /></th>
                            </tr>
                        </thead>
                        {searchTxt.length === 0 ?
                            <tbody>
                                {userAllStory.map((story, index) =>
                                    <tr key={story.story_id}>
                                        <Link to={"/post/" + story.story_id + "/" + story.title.replace(/\s/g, '-').substring(0, 60)}  onClick={scrollToTop}>
                                            <td><p>{story.title.substring(0, 60)}...</p></td>
                                        </Link>
                                        <td>{story.community_title}</td>
                                        <td>{moment(story.created_at.split('T')[0]).format('MMMM D YYYY')}</td>
                                    </tr>)}
                            </tbody>
                            :
                            <tbody>
                                {userSearchAllStory.slice(0, userAllData.visible).map((story, index) =>
                                    <tr key={story.story_id}>
                                        <Link to={"/post/" + story.story_id + "/" + story.title.replace(/\s/g, '-').substring(0, 60)} onClick={scrollToTop}>
                                            <td><p>{story.title.substring(0, 60)}...</p></td>
                                        </Link>
                                        <td>{story.community_title}</td>
                                        <td>{moment(story.created_at.split('T')[0]).format('MMMM D YYYY')}</td>
                                    </tr>)}
                            </tbody>}
                    </table>
                </div>
            </div>
            {searchTxt.length === 0 ?
                <>
                    {loading ?
                        <h4 className="text-warning text-center mt-5" style={{ cursor: 'pointer' }}><CircularProgress color="#fbc02d" /></h4>
                        :
                        <h4 className="text-warning text-center mt-5" style={{ cursor: 'pointer' }} onClick={fetchFunc}>Load More</h4>}
                </>
                :
                <>
                    {loading ?
                        <h4 className="text-warning text-center mt-5" style={{ cursor: 'pointer' }}><CircularProgress color="#fbc02d" /></h4>
                        :
                        <h4 className="text-warning text-center mt-5" style={{ cursor: 'pointer' }} onClick={userAllData.handleVisible}>Load More</h4>}
                </>}
        </div >
    )
};

export default SpecificUserStory;