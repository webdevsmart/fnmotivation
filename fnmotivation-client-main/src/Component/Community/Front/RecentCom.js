/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress } from '@material-ui/core';
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { scrollToTop } from '../../../App';

const RecentCom = ({ fetchFunc, fetchData }) => {
    const { communityID } = useParams()
    const [allStories, setAllStories] = useState([])
    const [loader, setloader] = useState(false)

    const AllStoryWithUser = useCallback(  () => {
        setloader(true)
        fetch(`http://68.183.178.196/api//getStoryByCommunity/${communityID}?visible=` + fetchData)
            .then(res => res.json())
            .then(data => {
                setAllStories([...allStories, ...data])
                setloader(false)
            })

    }, [fetchData]);

    useEffect(() => {
        AllStoryWithUser()
    }, [AllStoryWithUser])



    return (
        <div className="related-articles">
            <div className="row">
                {/* data-toggle="modal" data-target="#exampleModal" */}
                {allStories.map(story =>
                    <div key={story.story_id} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">
                        <Link to={"/post/" + story.story_id + "/" + story.title.replace(/\s/g, '-').substring(0, 60)} onClick={scrollToTop}>
                            <div className="related-articles-box">
                                <div className="image-holder">
                                {story.post_thumbnail ?
                                        <img src={`http://68.183.178.196/api//${story.post_thumbnail}`} alt="postImage" className="img-fluid content-image cropped" /> :
                                        <img src={require(`../../../images/com/${story.community_id}.png`).default} alt="postImage" className="img-fluid content-image" />}
                                </div>
                                <div className="text-box">
                                    <h4>{story.community_title}</h4>
                                    <span><strong>{story.username}</strong></span>
                                    <p>{story.short_story === 'null' ? story.title.substring(0, 60) : story.short_story.substring(0, 25)}</p>
                                </div>
                            </div>
                        </Link>
                    </div>)}
            </div>
            {loader ? <h4 className="text-warning text-center" style={{ cursor: 'pointer' }}><CircularProgress color="#fbc02d" /></h4> : <h4 className="text-warning text-center" style={{ cursor: 'pointer' }} onClick={fetchFunc}>Load More</h4>}
        </div>
    );
};

export default RecentCom;