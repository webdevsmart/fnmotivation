/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress } from '@material-ui/core';
import React, { useState, useCallback, useEffect } from 'react';
import StoryChild from './StoryChild';

const RecentStories = ({ fetchFunc, fetchData, type }) => {

    const [preloaderVisibale, setPreloaderVisibale] = useState(true)
    const [loader, setloader] = useState(false)
    const [allStories, setAllStories] = useState([])
    const [allCategoryPost, setAllCategoryPost] = useState([])


    const AllStoryWithUser = useCallback(  () => {
        setloader(true)
        fetch('/getAllstoryWithUser?visible=' + fetchData)
            .then(res => res.json())
            .then(data => {
                setAllStories([...allStories, ...data])
                setAllCategoryPost(data)
                setPreloaderVisibale(false)
                setloader(false)
            })

    }, [fetchData]);

    useEffect(() => {
        AllStoryWithUser()
    }, [AllStoryWithUser])

    // let allStories = allData.filter((v,i,a)=>a.findIndex(t=>(t.post_id === v.post_id))===i)

    useEffect(() => {
        if (type !== '0') {
            setAllStories(allCategoryPost.filter(story => story.community_id == type))
        } else {
            setAllStories(allCategoryPost)
        }
    }, [type])

    return (
        <>
            <StoryChild preloaderVisibale={preloaderVisibale} allStories={allStories} />
            {loader ? <h4 className="text-warning text-center" style={{ cursor: 'pointer' }}><CircularProgress color="#fbc02d" /></h4> : <h4 className="text-warning text-center" style={{ cursor: 'pointer' }} onClick={fetchFunc}>Load More</h4>}
        </>
    );
};

export default RecentStories;