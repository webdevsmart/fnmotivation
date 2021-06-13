import React from 'react';

const AllArticleShow = () => {

    return (
        <div className="article-left">
            <div className="pre-login-inner">
                <div className="pre-login-sort">
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
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
                    <select className="form-control">
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

                {/* Recent */}

                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-recent" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div className="related-articles">
                            <div className="row">

                                <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">

                                    <div className="related-articles-box">
                                        <div className="image-holder">
                                            <img src={require(`../../images/avatar.jpg`).default} alt="articleImage" className="img-fluid" />
                                        </div>
                                        <div className="text-box">
                                            <h4>Name</h4>
                                            <span>Ttitle</span>
                                            <p>Text</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Popular */}

                    <div className="tab-pane fade" id="pills-popular" role="tabpanel" aria-labelledby="pills-profile-tab">
                        <div className="related-articles">
                            <div className="row">
                                <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">
                                    <div className="related-articles-box">
                                        <div className="image-holder">
                                            <img alt="articleImage" className="img-fluid" />
                                        </div>
                                        <div className="text-box">
                                            <h4>Demo Heroin Addiction</h4>
                                            <span>bellajhuskey</span>
                                            <p>I was diagnosed with depression, anxiety and OCD when i was 10.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllArticleShow;