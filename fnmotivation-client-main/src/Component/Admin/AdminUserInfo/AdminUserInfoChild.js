import React from 'react';
import AdminUserArticles from './AdminUserArticles';
import AdminUserBookMarks from './AdminUserBookMarks';
import AdminUserFollower from './AdminUserFollower';
import AdminUserFollowing from './AdminUserFollowing';
import AdminUserStories from './AdminUserStories'

const AdminUserInfoChild = () => {
    return (
        <div>
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
    );
};

export default AdminUserInfoChild;