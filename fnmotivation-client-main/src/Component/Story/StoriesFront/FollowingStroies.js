/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress } from '@material-ui/core';
import React, { useState, useCallback, useEffect } from 'react';
import StoryChild from './StoryChild';

const FollowingStroies = ({ fetchFunc, fetchData, type }) => {

    const [preloaderVisibale, setPreloaderVisibale] = useState(true)
    const [loader, setloader] = useState(false)
    const userID = localStorage.getItem('userID')
    const token = localStorage.getItem('token')
    const [allStories, setAllStories] = useState([])
    const [allCategoryPost, setAllCategoryPost] = useState([])

    const IDdata = `${userID},${fetchData}`
    const AllStoryWithUser = useCallback(  () => {
        setloader(true)
        fetch('/getFollowingStroy?id=' + IDdata, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setAllStories([...allStories, ...data])
                setAllCategoryPost(data)
                setPreloaderVisibale(false)
                setloader(false)
            })

    }, [userID, fetchData]);

    useEffect(() => {
        AllStoryWithUser()
    }, [AllStoryWithUser])

    useEffect(() => {
        if (type !== '0') {
            setAllStories(allCategoryPost.filter(story => story.community_id == type))
        } else {
            setAllStories(allCategoryPost)
        }
    }, [type])
    return (
        <>
            <StoryChild preloaderVisibale={preloaderVisibale} allStories={allStories}/>
            {loader ? <h4 className="text-warning text-center" style={{ cursor: 'pointer' }}><CircularProgress color="#fbc02d" /></h4> : <h4 className="text-warning text-center" style={{ cursor: 'pointer' }} onClick={fetchFunc}>Load More</h4>}
        </>
    );
};

export default FollowingStroies;