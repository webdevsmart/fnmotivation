/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress } from '@material-ui/core';
import React, { useState, useCallback, useEffect } from 'react';
import ChildArticle from './ChildArticle';

const CommunityArticle = ({ fetchFunc, fetchData, type }) => {

    const userID = localStorage.getItem('userID')
    const token = localStorage.getItem('token')
    const [preloaderVisibale, setPreloaderVisible] = useState(true)
    const [allCategoryArticle, setAllCategoryArticle] = useState([])

    const [loader, setloader] = useState(false)
    const [allArticle, setAllArticle] = useState([])

    const IDdata = `${userID},${fetchData}`

    const getAllArticle = useCallback(  () => {
        setloader(true)
        fetch('/getAllCommunityArticle?id=' + IDdata, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setAllArticle([...allArticle, ...data])
                setAllCategoryArticle(data)
                setPreloaderVisible(false)
                setloader(false)
            })
    }, [fetchData])

    useEffect(() => {
        getAllArticle()
    }, [getAllArticle])
    useEffect(() => {
        if (type !== '0') {
            setAllArticle(allCategoryArticle.filter(story => story.community_id == type))
        } else {
            setAllArticle(allCategoryArticle)
        }
    }, [type])

    return (
        <div className="related-articles">
        <ChildArticle allArticle={allArticle} preloaderVisibale={preloaderVisibale}/>
        {loader ? <h4 className="text-warning text-center" style={{ cursor: 'pointer' }}><CircularProgress color="#fbc02d" /></h4> : <h4 className="text-warning text-center" style={{ cursor: 'pointer' }} onClick={fetchFunc}>Load More</h4>}
    </div>
    );
};

export default CommunityArticle;