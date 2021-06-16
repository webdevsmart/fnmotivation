/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/User/userContext';
import OgData from '../OgData';
import Preloader from '../Preloader/Preloader';
import UserAllStory from './UserAllStory';
import UserArticle from './UserArticle';
import UserFavorites from './UserFavorites';
import UserFollower from './UserFollower';
import UserFollowing from './UserFollowing';

const UserProfile = () => {

    const userAllData = useContext(UserContext)

    const { follower } = useContext(UserContext)
    const { following  } = useContext(UserContext)

    const logOut = () =>{
        localStorage.removeItem('username')
        localStorage.removeItem('userID')
        localStorage.removeItem('avatar')
        localStorage.removeItem('token')
        localStorage.removeItem('fc')
        if (typeof window !== 'undefined') {
            // it's safe to use window now
            window.location = '/'
          }
    }


    return (
        <section className="profile-sec">
            <OgData url={'http://fnmotivation.com/'} title={'Profile - FNMotivation'} description={'This new social network is a unique platform that is centered around health and wellness. This platform will provide a central location for people to like-minded people to connect.'} image={'http://68.183.178.196/api//fnmotivation-logo.png'} />
            <div className="container-fluid">
                {userAllData.preloaderVisibale ? <Preloader />
                    :
                    <div className="row">
                        <div className="col-12">
                            {userAllData.loggedIn.map((user, index) =>
                                <div key={index} className="profile-inner">

                                    <div>
                                        <div className="image-holder">
                                            <img src={`http://68.183.178.196/api//${user.avatar}`} alt="user" className="img-fluid image-short-big" />
                                        </div>
                                        <div className="profile-right">
                                            <div className="text-box">
                                                <h3>{user.fullname}</h3>
                                                <h4>@{user.username}</h4>
                                                <h5>About Me</h5>
                                                <p>{user.about && user.about.replace(/\/+/g, "'")}</p>
                                                <ul className="mt-5">
                                                    <li><Link className="edit-btn" to={"/edit/" + user.username}>Edit</Link></li>
                                                    <li><a className="edit-btn" onClick={logOut} >Log Out</a></li>
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
                                            <a className="nav-link" id="pills-Followers-tab" data-toggle="pill" href="#pills-Followers" role="tab" aria-controls="pills-Followers" aria-selected="false"><span>{userAllData.followerCount}</span> Followers</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="pills-Following-tab" data-toggle="pill" href="#pills-Following" role="tab" aria-controls="pills-Following" aria-selected="false"><span>{userAllData.followingCount}</span>  Following</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade active show" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                        <UserAllStory userAllStory={userAllData.userAllStory} fetchData={userAllData.fetchData} fetchFunc={userAllData.fetchFunc} loading={userAllData.loading}/>
                                    </div>
                                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                        <UserArticle userAllArticle={userAllData.userAllArticle} fetchData={userAllData.fetchData} fetchFunc={userAllData.fetchFunc} loading={userAllData.loading}/>
                                    </div>
                                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                        <div className="profile-posts-inner">
                                            <UserFavorites userBookMark={userAllData.userBookMark}  fetchFunc={userAllData.fetchFunc} loading={userAllData.loading}/>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-Followers" role="tabpanel" aria-labelledby="pills-Followers-tab">
                                        <UserFollower follower={follower} fetchFunc={userAllData.fetchFunc}  loading={userAllData.loading}/>
                                    </div>
                                    <div className="tab-pane fade" id="pills-Following" role="tabpanel" aria-labelledby="pills-Following-tab">
                                        <UserFollowing following={following} fetchFunc={userAllData.fetchFunc}  loading={userAllData.loading}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>
        </section>
    );
};

export default UserProfile;