/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, createContext } from 'react';

export const UserContext = createContext()

export const ParicualrUserDataProvider = props => {

    const [preloaderVisibale, setPreloaderVisible] = useState(true)

    const [loggedIn, setLoggedIn] = useState([])

    const userID = JSON.parse(localStorage.getItem('userID'))

    const [visible, setVisible] = useState(10)

    const [fetchData, setfetchData] = useState(0)

    const fetchFunc = () => {
        setfetchData(fetchData + 10)
    }
    const handleVisible = () => {
        setVisible(visible + 1)
    }

    const [loading, setLoading] = useState(false)


    const getParticularUserData = useCallback(  () => {
        setLoading(true)
        fetch('http://68.183.178.196/getParticularUser?id=' + userID, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setLoggedIn(data)
                setPreloaderVisible(false)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        getParticularUserData()
    }, [getParticularUserData])

    //All Posts

    const idData = `${userID},${fetchData}`

    const [userAllStory, setUserAllStory] = useState([])
    const [userAllStoryCount, setUserAllStoryCount] = useState([])

    const getAllPostsOfParticularUser = useCallback(  () => {

        setLoading(true)
        fetch('http://68.183.178.196/getAllPostsOfParticularUser?id=' + idData, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setUserAllStory([...userAllStory, ...data.data])
                setUserAllStoryCount(data.count[0].story_count)
                setLoading(false)

            })
    }, [fetchData])

    useEffect(() => {
        getAllPostsOfParticularUser()
    }, [getAllPostsOfParticularUser])

    //Article

    const [userAllArticle, setUserAllArticle] = useState([])
    const [userAllArticleCount, setUserAllArticleCount] = useState([])

    const getAllArticleOfParticularUser = useCallback(  () => {

        fetch('http://68.183.178.196/getAllArticleOfParticularUser?id=' + idData)
            .then(res => res.json())
            .then(data => {
                setUserAllArticle([...userAllArticle, ...data.data])
                setUserAllArticleCount(data.count[0].article_count)
                setLoading(false)
            })
    }, [fetchData])

    useEffect(() => {
        getAllArticleOfParticularUser()
    }, [getAllArticleOfParticularUser])


    //BookMArk

    const [userBookMark, setUserBookMark] = useState([])
    const [userBookMarkArticle, setUserBookMarkArticle] = useState([])
    const [userBookMarkCount, setUserBookMarkCount] = useState([])
    const [userBookMarkArticleCount, setUserBookMarkArticleCount] = useState([])

    const getUserbookmarks = useCallback(  () => {
        setLoading(true)
        fetch('http://68.183.178.196/getUserbookmarks?id=' + idData, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setUserBookMark([...userBookMark, ...data.story])
                setUserBookMarkArticle([...userBookMarkArticle, ...data.article])
                setUserBookMarkCount(data.storyCount[0].book_count)
                setUserBookMarkArticleCount(data.articleCount[0].post_book_count)
                setPreloaderVisible(false)
                setLoading(false)
            })
    }, [fetchData])

    useEffect(() => {
        getUserbookmarks()
    }, [getUserbookmarks])

    // Follower

    const [follower, setFollower] = useState([])
    const [followerCount, setFollowerCount] = useState([])

    const getUserFollower = useCallback(  () => {
        setLoading(true)
        fetch('http://68.183.178.196/getUserFollower?id=' + idData, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setFollower([...follower, ...data.data])
                setFollowerCount(data.count[0].follower_count)
                setLoading(false)
            })
    }, [fetchData])

    useEffect(() => {
        getUserFollower()
    }, [getUserFollower])

    //Following

    const [following, setFollowing] = useState([])
    const [followingCount, setFollowingCount] = useState([])

    const getUserFollowing = useCallback(  () => {
        setLoading(true)
        fetch('http://68.183.178.196/getUserFollowing?id=' + idData, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setFollowing([...following, ...data.data])
                setFollowingCount(data.count[0].following_count)
                setLoading(false)
            })
    }, [fetchData])

    useEffect(() => {
        getUserFollowing()
    }, [getUserFollowing])


    const userAllData = {
        preloaderVisibale, setPreloaderVisible,
        loggedIn, setLoggedIn,
        userAllStory, setUserAllStory,
        userAllArticle, setUserAllArticle,
        getAllArticleOfParticularUser, userBookMark,
        setUserBookMark, getUserbookmarks, userBookMarkArticle,
        follower, setFollower, following, setFollowing,
        getUserFollower, getUserFollowing,
        getParticularUserData, getAllPostsOfParticularUser,
        fetchFunc, loading, fetchData, visible, handleVisible,
        userAllStoryCount, userAllArticleCount, userBookMarkCount, userBookMarkArticleCount,
        followerCount, followingCount
    }
    return (
        <UserContext.Provider value={userAllData}>
            {props.children}
        </UserContext.Provider>
    )

}