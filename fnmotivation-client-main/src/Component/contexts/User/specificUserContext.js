/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, createContext } from 'react';
import { useParams } from 'react-router';

export const SpecificUserContext = createContext()

export const SpecificUserDataProvider = props => {

    const [preloaderVisibale, setPreloaderVisible] = useState(true)
    
    let { user } = useParams()

    const [loggedIn, setLoggedIn] = useState([])

    const getParticularUserData = useCallback( () => {
        fetch('http://localhost:5000/getParticularUser?id=' + user, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setLoggedIn(data)
                setPreloaderVisible(false)
            })
    }, [user])

    useEffect(() => {
        getParticularUserData()
    }, [getParticularUserData])

    const [fetchData, setfetchData] = useState(0)

    const fetchFunc = () => {
        setfetchData(fetchData + 10)
    }

    const [visible, setVisible] = useState(10)
    const handleVisible = () => {
        setVisible(visible + 1)
    }


    const [loading, setLoading] = useState(false)

    //All Posts

    const idData = `${user},${fetchData}`

    const [userAllStory, setUserAllStory] = useState([])
    const [userAllStoryCount, setUserAllStoryCount] = useState([])

    const getAllPostsOfParticularUser = useCallback(  () => {
        setLoading(true)
        fetch('http://localhost:5000/getAllPostsOfParticularUser?id=' + idData)
            .then(res => res.json())
            .then(data => {
                setUserAllStory([...userAllStory, ...data.data])
                setUserAllStoryCount(data.count[0].story_count)
                setLoading(false)
            })
    }, [user, fetchData])

    useEffect(() => {
        getAllPostsOfParticularUser()
    }, [getAllPostsOfParticularUser])

    //Article

    const [userAllArticle, setUserAllArticle] = useState([])
    const [userAllArticleCount, setUserAllArticleCount] = useState([])

    const getAllArticleOfParticularUser = useCallback(  () => {

        fetch('http://localhost:5000/getAllArticleOfParticularUser?id=' + idData)
            .then(res => res.json())
            .then(data => {
                setUserAllArticle([...userAllArticle, ...data.data])
                setUserAllArticleCount(data.count[0].article_count)

            })
    }, [user, fetchData])

    useEffect(() => {
        getAllArticleOfParticularUser()
    }, [getAllArticleOfParticularUser])


    //BookMArk

    const [userBookMark, setUserBookMark] = useState([])
    const [userBookMarkArticle, setUserBookMarkArticle] = useState([])
    const [userBookMarkCount, setUserBookMarkCount] = useState([])
    const [userBookMarkArticleCount, setUserBookMarkArticleCount] = useState([])

    const getUserbookmarks = useCallback(  () => {
        fetch('http://localhost:5000/getUserbookmarks?id=' + idData, {
            method: 'GET',

        })
            .then(res => res.json())
            .then(data => {
                setUserBookMark([...userBookMark, ...data.story])
                setUserBookMarkArticle([...userBookMarkArticle, ...data.article])
                setUserBookMarkCount(data.storyCount[0].book_count)
                setUserBookMarkArticleCount(data.articleCount[0].post_book_count)
            })
    }, [user, fetchData])

    useEffect(() => {
        getUserbookmarks()
    }, [getUserbookmarks])

    // Follower

    const [follower, setFollower] = useState([])
    const [followingCount, setFollowingCount] = useState([])

    const getUserFollower = useCallback(  () => {
        fetch('http://localhost:5000/getUserFollowing?id=' + idData, {
            method: 'GET',

        })
            .then(res => res.json())
            .then(data => {
                setFollower([...follower, ...data.data])
                setFollowingCount(data.count[0].following_count)

            })
    }, [user, fetchData])

    useEffect(() => {
        getUserFollower()
    }, [getUserFollower])

    //Following

    const [following, setFollowing] = useState([])
    const [followerCount, setFollowerCount] = useState([])

    const getUserFollowing = useCallback(  () => {
        fetch('http://localhost:5000/getUserFollower?id=' + idData, {
            method: 'GET',

        })
            .then(res => res.json())
            .then(data => {
                setFollowing([...following, ...data.data])
                setFollowerCount(data.count[0].follower_count)
            })
    }, [user, fetchData])

    useEffect(() => {
        getUserFollowing()
    }, [getUserFollowing])


    const userAllData = {
        preloaderVisibale, loggedIn, setLoggedIn,
        userAllStory, setUserAllStory, userAllArticle, setUserAllArticle,
        getAllArticleOfParticularUser,
        userBookMark, setUserBookMark, userBookMarkArticle, userBookMarkArticleCount,
        getUserbookmarks, follower, setFollower, following, setFollowing,
        getUserFollower, getUserFollowing,
        fetchFunc, loading, handleVisible, visible,
        userAllStoryCount, userAllArticleCount,
        userBookMarkCount, followerCount, followingCount
    }
    return (
        <SpecificUserContext.Provider value={userAllData}>
            {props.children}
        </SpecificUserContext.Provider>
    )

}