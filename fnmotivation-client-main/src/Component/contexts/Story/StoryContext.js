/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, createContext } from 'react';
import { useParams } from 'react-router-dom';

export const StoryContext = createContext()

export const StoryInfoProvider = props => {

    const token = localStorage.getItem('token')
    const [story, setStory] = useState([])
    const [preloaderVisibale, setPreloaderVisible] = useState(true)
    const [relatedStories, setRelatedtories] = useState([])

    let { id } = useParams();

    const ParticularStoryWithUser = useCallback(  () => {

        fetch('http://localhost:5000/getParticularStoryWithsUser?id=' + id)
            .then(res => res.json())
            .then(data => {
                setStory(data)
                
                const catID = data.map(id => id.community_id)
                fetch('http://localhost:5000/getSelectedStory?catID=' + catID)
                    .then(res => res.json())
                    .then(data => {
                        
                        setRelatedtories(data)
                    })
                setPreloaderVisible(false)
            })

    }, []);

    useEffect(() => {
        ParticularStoryWithUser()
    }, [ParticularStoryWithUser])



    //Like

    const [allLikes, setAllLikes] = useState([])
    const [myLike, setMyLike] = useState([])
    const [likeCount, setLikeCount] = useState([])
    const activityID = JSON.parse(localStorage.getItem('userID'))
    const [likeColor, setLikeColor] = useState('')

    // Like

    const allStoryLikes = useCallback(  () => {
        fetch('http://localhost:5000/allStoryLikes?id=' + id)
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

    //BookMark

    const [myBookMark, setMyBookMark] = useState([])
    const [bookMarkUpdate, setBookMarkUpdate] = useState([])
    const [bookMarkColor, setBookMarkColor] = useState('')


    //BookMark

    //Get BookMark

    const idis = `${activityID},${id}`

    const getStorybookmarks = useCallback(  () => {
        fetch('http://localhost:5000/getStorybookmarks?id=' + idis, {
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


    // Follow

    const User = story.map(id => id.user_id)
    const userID = User.toString()

    const [followed, setFollowed] = useState([])
    const [follow, setFollowing] = useState('')

    const ids = `${userID},${activityID}`

    const disabledFollow = userID == activityID
    const getFollow = useCallback(  () => {


        fetch('http://localhost:5000/getFollow?id=' + ids, {
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


    const storyInfo = { preloaderVisibale, setPreloaderVisible, story, setStory, allStoryLikes, allLikes, setAllLikes, likeColor, setLikeColor, likeCount, setLikeCount, getStorybookmarks, myBookMark, setMyBookMark, bookMarkUpdate, setBookMarkUpdate, bookMarkColor, setBookMarkColor, getFollow, followed, setFollowed, follow, setFollowing, userID, disabledFollow, ParticularStoryWithUser, relatedStories }

    return (
        <StoryContext.Provider value={storyInfo}>
            {props.children}
        </StoryContext.Provider>
    )

}