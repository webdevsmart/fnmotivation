import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PopularCom from './Front/PopularCom';
import RecentCom from './Front/RecentCom';

const CommunityDetailsLeft = ({ fetchFunc, fetchData }) => {
    let { communityTitle } = useParams()
    return (
        <div>
            <Link className="useButton" to="/register">Post Story</Link>
            <br></br>

            <h3>Community: {communityTitle.replace('-', ' ')}</h3>
            <div className="article-left">
                <div className="pre-login-inner mt-5">
                    <div className="pre-login-sort">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-recent" role="tab" aria-controls="pills-home" aria-selected="true">Most Recent</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-popular" role="tab" aria-controls="pills-profile" aria-selected="false">Popular</a>
                            </li>
                        </ul>
                    </div>

                    {/* Recent */}

                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-recent" role="tabpanel" aria-labelledby="pills-home-tab">
                            <RecentCom fetchData={fetchData} fetchFunc={fetchFunc} />
                        </div>

                        {/* Popular */}

                        <div className="tab-pane fade" id="pills-popular" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <PopularCom fetchData={fetchData} fetchFunc={fetchFunc} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};
export default CommunityDetailsLeft;