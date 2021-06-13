/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { SpecificUserContext } from '../contexts/User/specificUserContext';
import { UserContext } from '../contexts/User/userContext';
import Preloader from '../Preloader/Preloader';
import SpecificUserArticle from './SpecificUserArticle';
import SpecificUserFavorites from './SpecificUserFavorites';
import SpecificUserFollowing from './SpecificUserFollowing';
import SpecificUserFollwer from './SpecificUserFollwer';
import SpecificUserStory from './SpecificUserStory';

const SpecificUser = ({ getNotifications }) => {

    const userAllData = useContext(SpecificUserContext)

    const { follower  } = useContext(SpecificUserContext)
    const { following } = useContext(SpecificUserContext)
    let {user} = useParams()
    //Follow

    const activityID = JSON.parse(localStorage.getItem('userID'))
    const token = localStorage.getItem('token')

    const [followed, setFollowed] = useState([])
    const [follow, setFollow] = useState('follow')

    const ids = `${user},${activityID}`

    const disabledFollow = user == activityID

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
                    setFollow('following')
                } else if (data.length === 0) {
                    setFollow('follow')
                }
            })

    }, [ids, followed])

    useEffect(() => {
        getFollow()
    }, [getFollow])



    const prssedFollow = () => {

        if (follow === 'follow') {
            setFollow('following')
        } else if (follow === 'following') {
            setFollow('follow')
        }


        fetch('http://localhost:5000/prssedFollow', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                authorization: token
            },
            body: JSON.stringify({ followerID: user, followeeID: activityID })
        })
            .then(res => res.json())
            .then(data => {
                if (data.affectedRows > 0) {
                    setFollowed(true)
                    getNotifications()
                }
            })
    }

    useEffect(() => {
        userAllData.getUserFollower()
    }, [follow])
    useEffect(() => {
        userAllData.getUserFollowing()
    }, [follow])

    const userData = useContext(UserContext)

    useEffect(() => {
        userData.getUserFollower()
    }, [follow])

    useEffect(() => {
        userData.getUserFollowing()
    }, [follow])




    return (
        <section className="profile-sec">
            <div className="container-fluid">

                <div className="row">
                    <div className="col-12">
                        {userAllData.loggedIn.length === 0 ? <Preloader />
                            :
                            userAllData.loggedIn.map((user, index) =>
                                <div key={index} className="profile-inner">

                                    <div>
                                        <div className="image-holder">
                                            <img className="img-fluid image-short-big" src={`http://localhost:5000/${user.avatar}`} alt="user" />
                                        </div>
                                        <div className="profile-right">
                                            <div className="text-box">
                                                <h3>{user.fullname}</h3>
                                                <h4>@{user.username}</h4>
                                                <h5>About Me</h5>
                                                <p>{user.about && user.about.replace(/\/+/g, "'")}</p>
                                                <ul className="mt-5">
                                                    {!disabledFollow && <li><a className="edit-btn" onClick={prssedFollow} >{follow}</a></li>}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>)}
                        <div className="profile-posts">
                            <div className="table-responsive">
                                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"><span>{userAllData.userAllStoryCount}</span> Story Posts</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false"><span>{userAllData.userAllArticleCount}</span> Articles</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false"><span>{userAllData.userBookMarkCount + userAllData.userBookMarkArticleCount}</span> Favorites</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="pills-Followers-tab" data-toggle="pill" href="#pills-Followers" role="tab" aria-controls="pills-Followers" aria-selected="false"><span>{userAllData.followingCount}</span> Following</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="pills-Following-tab" data-toggle="pill" href="#pills-Following" role="tab" aria-controls="pills-Following" aria-selected="false"><span>{userAllData.followerCount}</span> Followers</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade active show" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                    <div className="profile-posts-inner">
                                        <SpecificUserStory userAllStory={userAllData.userAllStory} fetchFunc={userAllData.fetchFunc} loading={userAllData.loading} />
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    <SpecificUserArticle userAllArticle={userAllData.userAllArticle} fetchFunc={userAllData.fetchFunc} loading={userAllData.loading} />
                                </div>
                                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                    <div className="profile-posts-inner">
                                        <SpecificUserFavorites userBookMark={userAllData.userBookMark} fetchFunc={userAllData.fetchFunc} loading={userAllData.loading} />
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-Followers" role="tabpanel" aria-labelledby="pills-Followers-tab">
                                    <SpecificUserFollwer follower={follower} fetchFunc={userAllData.fetchFunc} loading={userAllData.loading} />
                                </div>
                                <div className="tab-pane fade" id="pills-Following" role="tabpanel" aria-labelledby="pills-Following-tab">
                                    <SpecificUserFollowing following={following} fetchFunc={userAllData.fetchFunc} loading={userAllData.loading} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpecificUser;