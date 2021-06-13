import React from 'react';

const UserNotificationSettingsEmail = () => {
    const handleChange = () => {

    }
    return (
        <div>
            <div className="notification-setting-switch">
                <ul className="mt-4 pl-3">
                    <li className="form-group title">Story Post</li>
                    <li className="form-group">Likes
                                            <label className="notification-switch">
                            <input type="checkbox"  className="default" onChange={handleChange} />
                            <span className="switch round"></span>
                        </label>
                    </li>
                    <li className="form-group">Comments
                                            <label className="notification-switch">
                            <input type="checkbox" className="default" onChange={handleChange} />
                            <span className="switch round"></span>
                        </label>
                    </li>
                    <li className="form-group">Successful Post
                                            <label className="notification-switch">
                            <input type="checkbox" className="default" onChange={handleChange} />
                            <span className="switch round"></span>
                        </label>
                    </li>
                    <li className="form-group title">Article Likes</li>
                    <li className="form-group">Likes
                                            <label className="notification-switch">
                            <input type="checkbox" className="default" onChange={handleChange} />
                            <span className="switch round"></span>
                        </label>
                    </li>
                    <li className="form-group">Comments
                                            <label className="notification-switch">
                            <input type="checkbox" className="default" onChange={handleChange} />
                            <span className="switch round"></span>
                        </label>
                    </li>
                    <li className="form-group">Successful Post
                                            <label className="notification-switch">
                            <input type="checkbox" className="default" onChange={handleChange} />
                            <span className="switch round"></span>
                        </label>
                    </li>

                    <li className="form-group title">New Follower
                                            <label className="notification-switch">
                            <input type="checkbox" className="default" onChange={handleChange} />
                            <span className="switch round"></span>
                        </label>
                    </li>

                    <li className="form-group title">Category Subscription Alerts
                                            <label className="notification-switch">
                            <input type="checkbox" className="default" onChange={handleChange} />
                            <span className="switch round"></span>
                        </label>
                    </li>

                    <li className="form-group title">Posts by Following Alerts
                                            <label className="notification-switch">
                            <input type="checkbox" className="default" onChange={handleChange} />
                            <span className="switch round"></span>
                        </label>
                    </li>
                </ul>
            </div>
            <div className="pt-md-4 pt-lg-5">
                <a className="theme-btn mt-5">Save Settings</a>
            </div>
        </div>
    );
};

export default UserNotificationSettingsEmail;