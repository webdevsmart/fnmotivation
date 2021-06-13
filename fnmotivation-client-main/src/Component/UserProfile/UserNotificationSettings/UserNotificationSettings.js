/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationSettingsUI } from '../../../App';


const UserNotificationSettings = () => {

    const notify = () => {
        toast.warning('Saving Notifications', {
            position: toast.POSITION.TOP_LEFT,

        })
    }
    const userID = localStorage.getItem('userID')
    const [noti, setNoti] = useState([])
    const getNotiSettings = useCallback(  () => {
        fetch('/getNotiSettings?id=' + userID, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setNoti(data)
            })
    }, [])

    useEffect(() => {
        getNotiSettings()
    }, [getNotiSettings])

    const [notificationUI, setNotificationUI] = useContext(NotificationSettingsUI)

    const checkName = [
        { name: 'story_likes' }, { name: 'story_comments' }, { name: 'success_posts' },
        { name: 'article_likes' },
        { name: 'article_comments' }, { name: 'successful_articles' }, { name: 'followers' },
        { name: 'email_story_likes' }, { name: 'email_story_comments' }, { name: 'email_successful_posts' },
        { name: 'email_article_likes' }, { name: 'email_article_comments' }, { name: 'email_article_successfull' },
        { name: 'email_follower' }, { name: 'email_subscription' }, { name: 'email_following_alerts' },
    ]


    const handleCheck = (e) => {

        checkName.map(checkName => {
            if (e.target.name === checkName.name) {
                e.target.checked && localStorage.setItem(checkName.name, true)
                !e.target.checked && localStorage.setItem(checkName.name, false)
            }
            return checkName;
        })
        setNotificationUI({
            story_likes: JSON.parse(localStorage.getItem('story_likes')),
            story_comments: JSON.parse(localStorage.getItem('story_comments')),
            success_posts: JSON.parse(localStorage.getItem('success_posts')),
            article_likes: JSON.parse(localStorage.getItem('article_likes')),
            article_comments: JSON.parse(localStorage.getItem('article_comments')),
            successful_articles: JSON.parse(localStorage.getItem('successful_articles')),
            followers: JSON.parse(localStorage.getItem('followers')),
            email_story_likes: JSON.parse(localStorage.getItem('email_story_likes')),
            email_story_comments: JSON.parse(localStorage.getItem('email_story_comments')),
            email_successful_posts: JSON.parse(localStorage.getItem('email_successful_posts')),
            email_article_likes: JSON.parse(localStorage.getItem('email_article_likes')),
            email_article_comments: JSON.parse(localStorage.getItem('email_article_comments')),
            email_article_successfull: JSON.parse(localStorage.getItem('email_article_successfull')),
            email_follower: JSON.parse(localStorage.getItem('email_follower')),
            email_subscription: JSON.parse(localStorage.getItem('email_subscription')),
            email_following_alerts: JSON.parse(localStorage.getItem('email_following_alerts')),
        })
    }


    const { register, handleSubmit } = useForm();
    const token = localStorage.getItem('token')
    const [mssg, setMssg] = useState([])

    const onSubmit = (data) => {

        fetch('/notificationSettings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: token
            },
            body: JSON.stringify({...data, userID})
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setMssg(data.error)
                }
                notify()

            })
    }

    return (
        <div>
            <section className="profile-sec notification-settings">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 col-md-12">
                            <div className="section-title">
                                <h3>FNMotivation Notification Settings</h3>
                            </div>
                        </div>
                        <div className="offset-lg-1 col-lg-6 col-md-8 col-xl-5">

                            <form onSubmit={handleSubmit(onSubmit)}>


                                {<>
                                    <div className="section-sub-title">
                                        <h4 className="mt-5">Platform Notification Settings</h4>
                                    </div>
                                    <div className="notification-setting-switch">
                                        <ul className="mt-4 pl-3">
                                            <li className="form-group title">Story Post</li>
                                            <li className="form-group">Likes
                                            <label className="notification-switch">
                                                    <input type="checkbox" checked={notificationUI.story_likes} onChange={handleCheck} name="story_likes" className="default" ref={register} />
                                                    <span className="switch round"></span>
                                                </label>
                                            </li>
                                            <li className="form-group">Comments
                                            <label className="notification-switch">
                                                    <input type="checkbox" checked={notificationUI.story_comments} onChange={handleCheck} name="story_comments" className="default" ref={register} />
                                                    <span className="switch round"></span>
                                                </label>
                                            </li>
                                            <li className="form-group">Successful Post
                                            <label className="notification-switch">
                                                    <input type="checkbox" checked={notificationUI.success_posts} onChange={handleCheck} name="success_posts" className="default" ref={register} />
                                                    <span className="switch round"></span>
                                                </label>
                                            </li>
                                            <li className="form-group title">Article Likes</li>
                                            <li className="form-group">Likes
                                            <label className="notification-switch">
                                                    <input type="checkbox" checked={notificationUI.article_likes} onChange={handleCheck} name="article_likes" className="default" ref={register} />
                                                    <span className="switch round"></span>
                                                </label>
                                            </li>
                                            <li className="form-group">Comments
                                            <label className="notification-switch">
                                                    <input type="checkbox" checked={notificationUI.article_comments} onChange={handleCheck} name="article_comments" className="default" ref={register} />
                                                    <span className="switch round"></span>
                                                </label>
                                            </li>
                                            <li className="form-group">Successful Post
                                            <label className="notification-switch">
                                                    <input type="checkbox" checked={notificationUI.successful_articles} onChange={handleCheck} name="successful_articles" className="default" ref={register} />
                                                    <span className="switch round"></span>
                                                </label>
                                            </li>

                                            <li className="form-group title">New Follower
                                            <label className="notification-switch">
                                                    <input type="checkbox" checked={notificationUI.followers} onChange={handleCheck} name="followers" className="default" ref={register} />
                                                    <span className="switch round"></span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                    <hr className="notification-setting-divider mt-5 mb-5" />

                                    <div className="section-sub-title">
                                        <h4 className="mt-5">Email Notification Settings</h4>
                                    </div>
                                    <div className="notification-setting-switch">
                                        <ul className="mt-4 pl-3">
                                            <li className="form-group title">Story Post</li>
                                            <li className="form-group">Likes
                                            <label className="notification-switch">
                                                    <input type="checkbox" checked={notificationUI.email_story_likes} onChange={handleCheck} name="email_story_likes" className="default" ref={register} />
                                                    <span className="switch round"></span>
                                                </label>
                                            </li>
                                            <li className="form-group">Comments
                                            <label className="notification-switch">
                                                    <input type="checkbox" checked={notificationUI.email_story_comments} onChange={handleCheck} name="email_story_comments" className="default" ref={register} />
                                                    <span className="switch round"></span>
                                                </label>
                                            </li>
                                            <li className="form-group">Successful Post
                                            <label className="notification-switch">
                                                    <input type="checkbox" checked={notificationUI.email_successful_posts} onChange={handleCheck} name="email_successful_posts" className="default" ref={register} />
                                                    <span className="switch round"></span>
                                                </label>
                                            </li>
                                            <li className="form-group title">Article Likes</li>
                                            <li className="form-group">Likes
                                            <label className="notification-switch">
                                                    <input type="checkbox" checked={notificationUI.email_article_likes} onChange={handleCheck} name="email_article_likes" className="default" ref={register} />
                                                    <span className="switch round"></span>
                                                </label>
                                            </li>
                                            <li className="form-group">Comments
                                            <label className="notification-switch">
                                                    <input type="checkbox" checked={notificationUI.email_article_comments} onChange={handleCheck} name="email_article_comments" className="default" ref={register} />
                                                    <span className="switch round"></span>
                                                </label>
                                            </li>
                                            <li className="form-group">Successful Post
                                            <label className="notification-switch">
                                                    <input type="checkbox" checked={notificationUI.email_article_successfull} onChange={handleCheck} name="email_article_successfull" className="default" ref={register} />
                                                    <span className="switch round"></span>
                                                </label>
                                            </li>

                                            <li className="form-group title">New Follower
                                            <label className="notification-switch">
                                                    <input type="checkbox" checked={notificationUI.email_follower} onChange={handleCheck} name="email_follower" className="default" ref={register} />
                                                    <span className="switch round"></span>
                                                </label>
                                            </li>

                                            <li className="form-group title">Category Subscription Alerts
                                            <label className="notification-switch">
                                                    <input type="checkbox" checked={notificationUI.email_subscription} onChange={handleCheck} name="email_subscription" className="default" ref={register} />
                                                    <span className="switch round"></span>
                                                </label>
                                            </li>

                                            <li className="form-group title">Posts by Following Alerts
                                            <label className="notification-switch">
                                                    <input type="checkbox" checked={notificationUI.email_following_alerts} onChange={handleCheck} name="email_following_alerts" className="default" ref={register} />
                                                    <span className="switch round"></span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </>}
                                <div className="pt-md-4 pt-lg-5">
                                    <button className="theme-btn mt-5" type="submit">Save Settings</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserNotificationSettings;