import React, { useState } from 'react';
import CommunityArticle from './FrontArticle/CommunityArticle';
import FollowingArticle from './FrontArticle/FollowingArticle';
import PopularArticle from './FrontArticle/PopularArticle';
import RecentArticle from './FrontArticle/RecentArticle';

const ArticlePage = ({ fetchFunc, fetchData }) => {


    const [type, setType] = useState(null)


    return (
        <div>
            <div className="article-left">
                <div className="pre-login-inner">
                    <div className="pre-login-sort">
                        <div>
                            <select className="form-control" name="category" onChange={e => setType(e.target.value)}>
                                <option value="0">Select Community</option>
                                <option value="3">Eating Disorder</option>
                                <option value="4">Weight Issues</option>
                                <option value="5">Heart Diseases</option>
                                <option value="6">Anxiety</option>
                                <option value="7">Depression</option>
                                <option value="1">Drug Addiction</option>
                                <option value="8">Insecurity</option>
                                <option value="9">Mental Health</option>
                                <option value="10">Stress</option>
                                <option value="2" >Alchohol Addiction</option>
                                <option value="11" >Smoking</option>
                            </select>
                        </div>

                        <ul className="nav nav-pills mt-5" id="pills-tab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-recent" role="tab" aria-controls="pills-home" aria-selected="true">Most Recent</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-popular" role="tab" aria-controls="pills-profile" aria-selected="false">Popular</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-categories" role="tab" aria-controls="pills-profile" aria-selected="false">Subscribed</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-following" role="tab" aria-controls="pills-profile" aria-selected="false">Following</a>
                            </li>
                        </ul>

                    </div>

                    {/* Recent */}

                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-recent" role="tabpanel" aria-labelledby="pills-home-tab">
                            <RecentArticle fetchData={fetchData} type={type} fetchFunc={fetchFunc} />
                        </div>

                        {/* Popular */}

                        <div className="tab-pane fade" id="pills-popular" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <PopularArticle fetchData={fetchData} type={type} fetchFunc={fetchFunc} />
                        </div>

                        <div className="tab-pane fade" id="pills-categories" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <CommunityArticle fetchData={fetchData} type={type} fetchFunc={fetchFunc} />
                        </div>

                        <div className="tab-pane fade" id="pills-following" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <FollowingArticle fetchData={fetchData} type={type} fetchFunc={fetchFunc} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ArticlePage;