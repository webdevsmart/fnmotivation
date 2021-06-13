import React, { useState, useContext, useEffect } from 'react';
import { NotificationSettingsUI } from '../../../App';


const UserNotificationSettingsUI = () => {

    const [notificationUI, setNotificationUI] = useContext(NotificationSettingsUI)

    const checkName = [
        { name: 'NFstoryLike' }, { name: 'NFstoryComment' }, { name: 'NFstorySuccess' },
        { name: 'NFFollwer' },
        { name: 'NFArticleLike' }, { name: 'NFArticleComment' }, { name: 'NFArticleSuccess' },
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
            NFstoryLike: JSON.parse(localStorage.getItem('NFstoryLike')),
            NFstoryComment: JSON.parse(localStorage.getItem('NFstoryComment')),
            NFstorySuccess: JSON.parse(localStorage.getItem('NFstorySuccess')),
            NFArticleLike: JSON.parse(localStorage.getItem('NFArticleLike')),
            NFArticleComment: JSON.parse(localStorage.getItem('NFArticleComment')),
            NFArticleSuccess: JSON.parse(localStorage.getItem('NFArticleSuccess')),
            NFFollwer: JSON.parse(localStorage.getItem('NFFollwer')),
        })
    }
    
    return (
        <div>

            <div className="notification-setting-switch">
                <ul className="mt-4 pl-3">
                    <li className="form-group title">Story Post</li>
                    <li className="form-group">Likes
                                            <label className="notification-switch">
                            <input onChange={handleCheck} type="checkbox" name="NFstoryLike" className="default" />
                            <span className="switch round"></span>
                        </label>
                    </li>
                    <li className="form-group">Comments
                                            <label className="notification-switch">
                            <input onChange={handleCheck} type="checkbox" name="NFstoryComment" className="default" />
                            <span className="switch round"></span>
                        </label>
                    </li>
                    <li className="form-group">Successful Post
                                            <label className="notification-switch">
                            <input onChange={handleCheck} type="checkbox" name="NFstorySuccess" className="default" />
                            <span className="switch round"></span>
                        </label>
                    </li>
                    <li className="form-group title">Article Likes</li>
                    <li className="form-group">Likes
                                            <label className="notification-switch">
                            <input onChange={handleCheck} type="checkbox" name="NFArticleLike" className="default" />
                            <span className="switch round"></span>
                        </label>
                    </li>
                    <li className="form-group">Comments
                                            <label className="notification-switch">
                            <input onChange={handleCheck} type="checkbox" name="NFArticleComment" className="default" />
                            <span className="switch round"></span>
                        </label>
                    </li>
                    <li className="form-group">Successful Post
                                            <label className="notification-switch">
                            <input onChange={handleCheck} type="checkbox" name="NFArticleSuccess" className="default" />
                            <span className="switch round"></span>
                        </label>
                    </li>

                    <li className="form-group title">New Follower
                                            <label className="notification-switch">
                            <input  onChange={handleCheck} type="checkbox" name="NFFollwer" className="default" />
                            <span className="switch round"></span>
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserNotificationSettingsUI;