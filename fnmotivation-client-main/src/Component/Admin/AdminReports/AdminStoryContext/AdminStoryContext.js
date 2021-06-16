/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, createContext } from 'react';

export const ReportStory = createContext()

export const ReportStoryProvider = props => {

    
    const [fetchData, setfetchData] = useState(0)

    const fetchFunc = () => {
        setfetchData(fetchData + 10)
    }

    const [loading, setLoading] = useState(false)
    const [loadingPost, setLoadingPost] = useState(false)

    const [activeReports, setActiveReports] = useState('')

    const countStories = useCallback(() => {
        setLoading(true)
        fetch(`http://68.183.178.196/api//countStoryReports`, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setActiveReports(data[0].story_report)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        countStories()
    }, [countStories])

    const [reports, setReports] = useState([])

    const token = localStorage.getItem('admiNToken')

    const getStories = useCallback(() => {
        setLoadingPost(true)
        fetch(`http://68.183.178.196/api//StoryReportsDetails/?show=` + fetchData, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setReports([...reports, ...data])
                setLoadingPost(false)
            })
    }, [fetchData])

    useEffect(() => {
        getStories()
    }, [getStories])



    const reportStory = {fetchFunc, loading, setLoading, loadingPost, setLoadingPost,activeReports, setActiveReports, reports, setReports, getStories, countStories }

    return (
        <ReportStory.Provider value={reportStory}>
            {props.children}
        </ReportStory.Provider>
    )

}


