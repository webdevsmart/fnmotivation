/* eslint-disable no-unused-vars */
import React,{useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { Communities, scrollToTop } from '../../App';
import OgData from '../OgData';

const Community = () => {
    const [category, setCategory] = useContext(Communities)
    return (
        <div className="appContent">
            <OgData url={'http://fnmotivation.com/community'} title={'Community - FNMotivation'} description={'This new social network is a unique platform that is centered around health and wellness. This platform will provide a central location for people to like-minded people to connect.'} image={'/fnmotivation-logo.png'} />
            <div className="wrapper">
                <div className="container">
                    <div className="pre-login-inner">
                        <div className="related-articles">
                            <h3>Communities</h3>
                            <div className="row">
                                {category.map((info, index) =>
                                    <div key={index} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">
                                        <Link to={"/community/" + info.id + "/" + info.community_title.replace(/\s/g, '-')} onClick={scrollToTop}>
                                            <div className="related-articles-box">
                                                <div className="image-holder">
                                                    <img src={require(`../../images/${info.community_title}.png`).default} alt="community" />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Community;