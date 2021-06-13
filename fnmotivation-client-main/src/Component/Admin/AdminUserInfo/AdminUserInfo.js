import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Preloader from '../../Preloader/Preloader';
import AdminUserArticles from './AdminUserArticles';
import AdminUserBookMarks from './AdminUserBookMarks';
import AdminUserFollower from './AdminUserFollower';
import AdminUserFollowing from './AdminUserFollowing';
import AdminUserStories from './AdminUserStories'

const AdminAllUserInfo = () => {

    let { u_id } = useParams()
    const [user, setUser] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const getUesrs = useCallback(async () => {
        await fetch(`/getParticularUser?id=` + u_id, {
            method: 'GET',
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('Colud not fetch data')
                }
                return res.json()
            })
            .then(data => {
                setUser(data)
                setIsLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setIsLoading(false)
            })
    }, [])

    useEffect(() => {
        getUesrs()
    }, [getUesrs])


    return (
        <>
            <div className="text-center nav-admin">
                <h3>Particular User Info</h3>
            </div>
            <section className="profile-sec">
                <div className="container-fluid">
                    {isLoading && <Preloader />}
                    <div className="row">
                        <div className="col-12">
                            {user.map(user =>
                                <div key={user.user_id} className="profile-inner">
                                    <div className="image-holder">
                                        <img src={`//${user.avatar}`} alt="user" className="img-fluid image-short-big" />
                                    </div>
                                    <div className="profile-right">
                                        <div className="text-box">
                                            <h3>{user.fullname}</h3>
                                            <h4>@{user.username}</h4>
                                            <h5>About Me</h5>
                                            <p>{user.about}</p>
                                        </div>
                                    </div>
                                </div>)}
                            <div className="profile-posts">
                                <div className="table-responsive">
                                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Story Posts</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Articles</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Favorites</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="pills-Followers-tab" data-toggle="pill" href="#pills-Followers" role="tab" aria-controls="pills-Followers" aria-selected="false">Followers</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="pills-Following-tab" data-toggle="pill" href="#pills-Following" role="tab" aria-controls="pills-Following" aria-selected="false">Following</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade active show" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                        <AdminUserStories />
                                    </div>
                                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                        <AdminUserArticles />
                                    </div>
                                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                        <AdminUserBookMarks />
                                    </div>
                                    <div className="tab-pane fade" id="pills-Followers" role="tabpanel" aria-labelledby="pills-Followers-tab">
                                        <AdminUserFollower />
                                    </div>
                                    <div className="tab-pane fade" id="pills-Following" role="tabpanel" aria-labelledby="pills-Following-tab">
                                        <AdminUserFollowing />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AdminAllUserInfo;