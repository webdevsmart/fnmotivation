import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { scrollToTop } from '../../App';

const UserFollowing = ({following,  fetchFunc, loading }) => {

    return (
        <div>
            <div className="profile-posts-inner">
                <div className="table-responsive">
                    <table >
                        <thead>
                            <tr>
                                <th>Profile Picture</th>
                                <th>Name</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            {following.map((user) =>
                                <tr key={user.user_id}>
                                    <td><img src={`http://localhost:5000/${user.avatar}`}  alt="avatar" className="img-fluid image-Short"/></td>
                                    <td><a href={"/" + user.user_id + "/" + user.username}  onClick={scrollToTop}>{user.fullname}</a></td>
                                    <td>@{user.username}</td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
            {loading ? <h4 className="text-warning text-center mt-5" style={{ cursor: 'pointer' }}><CircularProgress color="#fbc02d" /></h4> : <h4 className="text-warning text-center mt-5" style={{ cursor: 'pointer' }} onClick={fetchFunc}>Load More</h4>}

        </div>
    );
};

export default UserFollowing;