/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, createContext } from 'react';
import { useParams } from 'react-router-dom';

export const ArticleContext = createContext()

export const AricleInfoProvider = props => {

    const [preloaderVisibale, setPreloaderVisible] = useState(true)
    const token = localStorage.getItem('token')
    const [relatedStories, setRelatedtories] = useState([])

    //Article Get

    let { articleID } = useParams();
    const [article, setArticle] = useState([])

    const getParticularArticle = useCallback(  () => {

        fetch('/getParticularArticle?id=' + articleID)
            .then(res => res.json())
            .then(data => {
                setArticle(data)
                
                const catID = data.map(id => id.community_id)
                fetch('/getSelectedArticle?catID=' + catID)
                    .then(res => res.json())
                    .then(data => {
                        setRelatedtories(data)
                        setPreloaderVisible(false)
                    })
            })

    }, [])

    useEffect(() => {
        getParticularArticle()
    }, [getParticularArticle])

    //Like

    const [allLikes, setAllLikes] = useState([])
    const [myLike, setMyLike] = useState([])
    const [likeCount, setLikeCount] = useState([])
    const activityID = JSON.parse(localStorage.getItem('userID'))
    const [likeColor, setLikeColor] = useState('')

    // Like

    const allarticleLikes = useCallback(  () => {
        fetch('/allArticleLikes?id=' + articleID)
            .then(res => res.json())
            .then(data => {
                setAllLikes(data)
                const liked = data.filter(id => id.UserId === activityID)
                setMyLike(liked)
                if (liked.length !== 0) {
                    setLikeColor('active')
                } else if (liked.length === 0) {
                    setLikeColor('')
                }

            })
    }, [likeCount])


    //BookMArk

    //BookMark

    const [myBookMark, setMyBookMark] = useState([])
    const [bookMarkUpdate, setBookMarkUpdate] = useState([])
    const [bookMarkColor, setBookMarkColor] = useState('')


    //BookMark

    //Get BookMark

    const idis = `${activityID},${articleID}`

    const getArticlebookmarks = useCallback(  () => {
        fetch('/getArticlebookmarks?id=' + idis, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                authorization: token
            },
        })
            .then(res => res.json())
            .then(data => {
                setMyBookMark(data)
                
                if (data.length !== 0) {
                    setBookMarkColor('active')
                } else if (data.length === 0) {
                    setBookMarkColor('')
                }
            })
    }, [bookMarkUpdate])

    //Follow
    const User = article.map(id => id.user_id)
    const userID = User.toString()
    const [followed, setFollowed] = useState([])
    const [follow, setFollowing] = useState('')

    const ids = `${userID},${activityID}`

    const disabledFollow = userID == activityID
    const getFollow = useCallback(  () => {


        fetch('/getFollow?id=' + ids, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                authorization: token
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.length !== 0) {
                    setFollowing('following')
                } else if (data.length === 0) {
                    setFollowing('follow')
                }
            })

    }, [ids, followed])

    useEffect(() => {
        getFollow()
    }, [getFollow])

    const articleInfo = { article, setArticle, allarticleLikes, getArticlebookmarks, preloaderVisibale, setPreloaderVisible, likeColor, setLikeColor, likeCount, setLikeCount, allLikes, setAllLikes, myBookMark, setMyBookMark, bookMarkUpdate, setBookMarkUpdate, bookMarkColor, setBookMarkColor, disabledFollow, getFollow, follow, setFollowing, followed, setFollowed, relatedStories }

    return (
        <ArticleContext.Provider value={articleInfo}>
            {props.children}
        </ArticleContext.Provider>
    )

}


